// Builds the product PDF and the free lead magnet PDF.
// Usage: node pdf-business/scripts/build.js
// Output: pdf-business/product/*.html and *.pdf, plus a copy of the free PDF in site/

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { recipes, weeks, proteinFoods } = require("./data");

const BRAND = "Prepwell";
const PRODUCT = "The Protein Prep Blueprint";
const SITE_URL = process.env.SITE_URL || "prepwell.example.com";

const root = path.join(__dirname, "..");
const out = (...p) => path.join(root, ...p);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const css = `
@page { size: Letter; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #1d2b27; font-size: 11pt; line-height: 1.5;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
:root { --g: #1f6f5c; --g2: #e7f2ee; --c: #ff7a59; --c2: #fff1ec; --ink: #1d2b27; --mute: #5d6e69; --line: #d7e3df; }
.page { width: 8.5in; height: 11in; padding: 0.7in 0.75in 0.8in; position: relative; overflow: hidden; page-break-after: always; break-after: page; }
.page:last-child { page-break-after: auto; break-after: auto; }
.foot { position: absolute; bottom: 0.4in; left: 0.75in; right: 0.75in; display: flex; justify-content: space-between; font-size: 8.5pt; color: var(--mute); border-top: 1px solid var(--line); padding-top: 6px; }
h1 { font-size: 30pt; line-height: 1.1; margin: 0 0 12px; color: var(--g); letter-spacing: -0.5px; }
h2 { font-size: 20pt; line-height: 1.2; margin: 0 0 14px; color: var(--g); }
h3 { font-size: 12.5pt; margin: 18px 0 6px; color: var(--ink); }
p { margin: 0 0 10px; }
.kicker { text-transform: uppercase; letter-spacing: 2px; font-size: 9pt; font-weight: 700; color: var(--c); margin-bottom: 6px; }
.lead { font-size: 13pt; color: var(--mute); }
.box { background: var(--g2); border-radius: 12px; padding: 14px 18px; margin: 12px 0; }
.box.c { background: var(--c2); }
.box h3 { margin-top: 0; }
table { width: 100%; border-collapse: collapse; font-size: 10pt; }
th, td { text-align: left; padding: 7px 8px; border-bottom: 1px solid var(--line); vertical-align: top; }
th { background: var(--g); color: #fff; font-weight: 600; }
tr:nth-child(even) td { background: #f6faf8; }
ul, ol { margin: 0 0 10px; padding-left: 20px; }
li { margin-bottom: 4px; }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.cols3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.macros { display: flex; gap: 10px; margin: 10px 0 16px; }
.m { flex: 1; background: var(--g2); border-radius: 10px; padding: 8px 10px; text-align: center; }
.m b { display: block; font-size: 17pt; color: var(--g); }
.m span { font-size: 8.5pt; color: var(--mute); text-transform: uppercase; letter-spacing: 1px; }
.m.p { background: var(--g); } .m.p b, .m.p span { color: #fff; }
.tag { display: inline-block; background: var(--c2); color: #b4472b; font-size: 8.5pt; font-weight: 700; border-radius: 99px; padding: 3px 10px; margin-right: 6px; }
.check li { list-style: none; margin-left: -20px; }
.check li::before { content: "\\2610  "; color: var(--g); }
.cover { background: linear-gradient(160deg, #1f6f5c 0%, #164f42 100%); color: #fff; padding: 1in 0.9in; }
.cover h1 { color: #fff; font-size: 46pt; margin-top: 1.3in; }
.cover .lead { color: #cfe7df; font-size: 15pt; max-width: 5.6in; }
.cover .stats { display: flex; gap: 14px; margin-top: 0.6in; }
.cover .stats div { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25); border-radius: 12px; padding: 12px 16px; flex: 1; }
.cover .stats b { display: block; font-size: 22pt; color: #ffd2c4; }
.cover .brand { position: absolute; bottom: 0.8in; left: 0.9in; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; font-size: 10pt; color: #cfe7df; }
.cover .pill { display: inline-block; background: var(--c); color: #fff; font-weight: 700; padding: 6px 14px; border-radius: 99px; font-size: 10pt; letter-spacing: 1px; text-transform: uppercase; }
.small { font-size: 9pt; color: var(--mute); }
.tracker td, .tracker th { text-align: center; height: 34px; }
.tracker td:first-child, .tracker th:first-child { text-align: left; }
.toc td:last-child { text-align: right; color: var(--mute); }
`;

let pageNo = 0;
const page = (inner, opts = {}) => {
  pageNo += 1;
  const foot = opts.noFoot
    ? ""
    : `<div class="foot"><span>${esc(PRODUCT)}</span><span>${pageNo}</span></div>`;
  return `<section class="page ${opts.cls || ""}">${inner}${foot}</section>`;
};

const macroBlock = (r) => `
  <div class="macros">
    <div class="m p"><b>${r.macros[0]} g</b><span>Protein</span></div>
    <div class="m"><b>${r.kcal}</b><span>kcal</span></div>
    <div class="m"><b>${r.macros[1]} g</b><span>Carbs</span></div>
    <div class="m"><b>${r.macros[2]} g</b><span>Fat</span></div>
  </div>`;

const recipeName = (id) => (id === "Flex" ? "Flex meal (eat out / leftovers)" : recipes[id].name);

function blueprintHtml() {
  pageNo = 0;
  const pages = [];
  const ids = Object.keys(recipes);

  // Cover
  pages.push(
    page(
      `<span class="pill">4-Week Meal Prep System</span>
       <h1>${esc(PRODUCT)}</h1>
       <p class="lead">Hit around 140 g of protein a day with two short prep sessions a week. No macro math, no bland chicken and rice for 28 days.</p>
       <div class="stats">
         <div><b>13</b>tested recipes</div>
         <div><b>4</b>weekly plans + grocery lists</div>
         <div><b>~60</b>minutes per Sunday</div>
       </div>
       <div class="brand">${BRAND}</div>`,
      { cls: "cover", noFoot: true }
    )
  );

  // Contents
  const toc = [
    ["Start here", "How this blueprint works"],
    ["Your protein target", "Find your number in 30 seconds"],
    ["The prep system", "Sunday + Wednesday rhythm, containers, food safety"],
    ["Recipe library", "13 recipes with macros per serving"],
    ["Weeks 1 to 4", "Daily plan, prep timeline and grocery list"],
    ["Swaps & fixes", "Vegetarian, dairy-free, budget, picky eaters"],
    ["30 g protein cheat sheet", "What 30 g of protein looks like"],
    ["Trackers", "Print and stick on the fridge"],
  ];
  pages.push(
    page(
      `<div class="kicker">Inside</div><h2>Contents</h2>
       <table class="toc">${toc
         .map(([a, b]) => `<tr><td><b>${a}</b></td><td>${b}</td></tr>`)
         .join("")}</table>
       <div class="box c" style="margin-top:28px"><h3>The promise</h3>
       <p>If you follow the plan for four weeks you will have cooked 13 high-protein meals until you know them by heart, learned a prep routine that takes about an hour, and stopped asking "what do I eat today?"</p></div>`
    )
  );

  // Start here
  pages.push(
    page(
      `<div class="kicker">Start here</div><h2>How this blueprint works</h2>
       <p class="lead">Most people do not fail at eating more protein because they lack willpower. They fail because at 7 pm there is nothing ready in the fridge.</p>
       <p>This blueprint fixes that with a simple system:</p>
       <ol>
         <li><b>Shop once</b> with the weekly grocery list (Saturday or Sunday).</li>
         <li><b>Prep on Sunday</b> (about 60 minutes): two mains and your breakfasts.</li>
         <li><b>Mini-prep on Wednesday</b> (20 to 30 minutes): one more main so nothing sits in the fridge longer than 4 days.</li>
         <li><b>Eat from the plan.</b> Every day already has breakfast, lunch, dinner and a snack.</li>
       </ol>
       <div class="box"><h3>Calories flex, protein stays</h3>
       <p>The core plan gives you roughly 140 to 150 g of protein and 1,350 to 1,900 kcal per day, depending on the week. That is a base, not a diet. Most adults need more energy than that, so add fruit, whole grain bread, rice, nuts, olive oil or an extra snack until you hit your own calorie needs. Trying to lose fat? Add less. Trying to build muscle? Add more.</p></div>
       <h3>What you need</h3>
       <ul>
         <li>10 to 14 meal prep containers (glass if you reheat a lot)</li>
         <li>2 sheet pans, 1 large pot, 1 large pan, 1 muffin tin</li>
         <li>A kitchen scale (optional, but it makes the macros real)</li>
       </ul>
       <p class="small">Macros are approximate per serving and based on standard nutrition database averages. Brands vary. See the note on the last page before you start.</p>`
    )
  );

  // Protein target
  const rows = [50, 60, 70, 80, 90, 100, 110]
    .map(
      (kg) =>
        `<tr><td>${kg} kg / ${Math.round(kg * 2.205)} lb</td><td>${Math.round(kg * 1.2)} g</td><td><b>${Math.round(kg * 1.6)} g</b></td><td>${Math.round(kg * 2.0)} g</td></tr>`
    )
    .join("");
  pages.push(
    page(
      `<div class="kicker">Step 1</div><h2>Your protein target</h2>
       <p>For healthy, active adults who want to build or keep muscle, sports nutrition research commonly points to <b>1.4 to 2.0 g of protein per kg of body weight per day</b> (International Society of Sports Nutrition position stand). The general minimum for adults is 0.8 g/kg. A simple, practical middle is <b>1.6 g per kg</b>.</p>
       <div class="box"><h3>The 30-second formula</h3>
       <p><b>Body weight in kg x 1.6</b> = your daily protein target in grams.<br>
       In pounds: <b>body weight in lb x 0.7</b>.<br>
       If you have a lot of weight to lose, use your goal weight instead of your current weight.</p></div>
       <table><tr><th>Body weight</th><th>Light (1.2 g/kg)</th><th>Target (1.6 g/kg)</th><th>High (2.0 g/kg)</th></tr>${rows}</table>
       <h3>Scaling this plan to your number</h3>
       <ul>
         <li><b>Target around 140 g:</b> follow the plan exactly.</li>
         <li><b>Target around 110 g:</b> skip the snack, or eat 3/4 portions of the mains.</li>
         <li><b>Target 170 g or more:</b> add a second snack (S1 or S2) or a 1.5x portion at dinner.</li>
       </ul>
       <h3>The plate rule for meals outside the plan</h3>
       <p>Palm-sized portion of protein (1 to 2 palms), fist of carbs, two fists of vegetables, thumb of fat. Protein goes on the plate first.</p>`
    )
  );

  // Prep system
  pages.push(
    page(
      `<div class="kicker">Step 2</div><h2>The prep system</h2>
       <div class="cols">
         <div>
           <h3>Sunday: the big prep (about 60 min)</h3>
           <ul>
             <li>Two mains, portioned into containers</li>
             <li>Breakfast for 4 days</li>
             <li>Snacks portioned</li>
           </ul>
           <h3>Wednesday: the mini prep (20 to 30 min)</h3>
           <ul>
             <li>One main for Thursday to Sunday</li>
             <li>Restock breakfast jars</li>
           </ul>
           <h3>Why two sessions?</h3>
           <p>Cooked food is safest eaten within 3 to 4 days in the fridge (USDA guidance). Two sessions keep everything fresh without cooking every night.</p>
         </div>
         <div>
           <h3>Food safety basics</h3>
           <ul>
             <li>Cool food within 2 hours of cooking, then refrigerate at 4 °C / 40 °F or below.</li>
             <li>Spread rice and grains on a tray to cool fast.</li>
             <li>Reheat until steaming hot, 74 °C / 165 °F.</li>
             <li>Label containers with the day you cooked them.</li>
             <li>Anything you will eat after day 4 goes in the freezer.</li>
           </ul>
           <h3>Freezer friendly</h3>
           <p>Turkey chili, egg muffins, sheet-pan chicken (without potatoes), beef and broccoli. Thaw overnight in the fridge.</p>
         </div>
       </div>
       <div class="box c"><h3>The flex meal</h3><p>Each week has one or two "Flex" slots. Eat out, eat leftovers, cook something fun. A plan you can live with beats a perfect plan you quit on day 9.</p></div>`
    )
  );

  // Recipe index
  pages.push(
    page(
      `<div class="kicker">Step 3</div><h2>Recipe library</h2>
       <p>All values per serving. Codes (B = breakfast, M = main, S = snack) are used in the weekly plans.</p>
       <table><tr><th>Code</th><th>Recipe</th><th>Serves</th><th>Protein</th><th>kcal</th></tr>
       ${ids
         .map((id) => {
           const r = recipes[id];
           return `<tr><td><b>${id}</b></td><td>${esc(r.name)}</td><td>${r.serves}</td><td><b>${r.macros[0]} g</b></td><td>${r.kcal}</td></tr>`;
         })
         .join("")}</table>`
    )
  );

  // Recipes
  for (const id of ids) {
    const r = recipes[id];
    pages.push(
      page(
        `<div class="kicker">${id} &middot; ${esc(r.type)}</div>
         <h2>${esc(r.name)}</h2>
         <div><span class="tag">Serves ${r.serves}${r.servingNote ? " (" + esc(r.servingNote) + ")" : ""}</span><span class="tag">${esc(r.time)}</span></div>
         ${macroBlock(r)}
         <div class="cols">
           <div><h3>Ingredients</h3><ul class="check">${r.ingredients.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>
           <div><h3>Method</h3><ol>${r.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></div>
         </div>
         <div class="box"><h3>Storage & prep tip</h3><p>${esc(r.storage)}</p></div>
         <p class="small">Macros per serving, approximate.</p>`
      )
    );
  }

  // Weeks
  weeks.forEach((w, i) => {
    const dayTotals = w.days.map((d) => {
      const meals = d.slice(1).filter((x) => x !== "Flex");
      return {
        p: meals.reduce((s, m) => s + recipes[m].macros[0], 0),
        k: meals.reduce((s, m) => s + recipes[m].kcal, 0),
        flex: d.includes("Flex"),
      };
    });
    pages.push(
      page(
        `<div class="kicker">Week ${i + 1}</div><h2>${esc(w.title)}</h2>
         <p class="lead">${esc(w.focus)}</p>
         <table><tr><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th><th>Snack</th><th>Protein</th></tr>
         ${w.days
           .map(
             (d, j) =>
               `<tr><td><b>${d[0]}</b></td>${d
                 .slice(1)
                 .map((m) => `<td>${m === "Flex" ? "<i>Flex</i>" : `<b>${m}</b> ${esc(recipes[m].name)}`}</td>`)
                 .join("")}<td><b>${dayTotals[j].p} g</b>${dayTotals[j].flex ? "+" : ""}</td></tr>`
           )
           .join("")}</table>
         <p class="small">"+" means a flex meal on top. Totals are from the plan only; add sides to reach your calorie needs.</p>
         <div class="cols">
           <div class="box"><h3>Sunday prep</h3><p>${w.sunday.map((m) => `<b>${m}</b> ${esc(recipes[m].name)}`).join("<br>")}</p></div>
           <div class="box c"><h3>Wednesday prep</h3><p>${w.wednesday.map((m) => `<b>${m}</b> ${esc(recipes[m].name)}`).join("<br>")}</p></div>
         </div>`
      )
    );
    pages.push(
      page(
        `<div class="kicker">Week ${i + 1}</div><h2>Prep timeline & grocery list</h2>
         <h3>Sunday, minute by minute</h3>
         <ul>${w.sundayPlan.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
         <div class="cols3" style="margin-top:14px">
           ${Object.entries(w.grocery)
             .map(([cat, items]) => `<div><h3>${esc(cat)}</h3><ul class="check">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`)
             .join("")}
         </div>
         <p class="small">Staples like salt, pepper, oil and spices are only listed the first time you need them. Check your cupboard before you shop.</p>`
      )
    );
  });

  // Swaps
  pages.push(
    page(
      `<div class="kicker">Make it yours</div><h2>Swaps & fixes</h2>
       <table><tr><th>If you...</th><th>Swap</th></tr>
       <tr><td>Are vegetarian</td><td>Chicken/turkey/beef → extra-firm tofu, tempeh or seitan. Tuna → chickpeas + extra Greek yogurt. Use plant protein in shakes.</td></tr>
       <tr><td>Avoid dairy</td><td>Greek yogurt → soy yogurt (higher protein than coconut). Cottage cheese → silken tofu with fruit or a shake. Milk → soy milk.</td></tr>
       <tr><td>Are on a budget</td><td>Chicken thighs instead of breast (more fat, still great). Frozen veg and berries. Lentils to stretch the chili. Buy turkey and beef in bulk and freeze.</td></tr>
       <tr><td>Hate eating the same thing twice</td><td>Change the sauce, not the recipe: same chicken with pesto, salsa, teriyaki or tzatziki.</td></tr>
       <tr><td>Do not like fish</td><td>M4 salmon → chicken thighs or shrimp. M7 tuna → shredded rotisserie chicken.</td></tr>
       <tr><td>Have no oven</td><td>Sheet-pan recipes work in an air fryer in batches, 180 to 200 °C for 15 to 18 minutes.</td></tr>
       </table>
       <h3>Troubleshooting</h3>
       <ul>
         <li><b>"I am always hungry."</b> You probably need more total food. Add carbs and fats at meals, not only snacks.</li>
         <li><b>"I miss prep days."</b> Keep a backup: tuna, Greek yogurt, eggs and a rotisserie chicken cover a full day.</li>
         <li><b>"My chicken is dry."</b> Pull it at 74 °C / 165 °F, rest 5 minutes, and do not reheat it twice.</li>
         <li><b>"Protein shakes upset my stomach."</b> Try a lactose-free whey isolate or a plant protein.</li>
       </ul>`
    )
  );

  // Cheat sheet
  pages.push(page(cheatSheetInner(false)));

  // Tracker
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  pages.push(
    page(
      `<div class="kicker">Print me</div><h2>Weekly protein tracker</h2>
       <p>My daily target: ________ g &nbsp;&nbsp; Week of: ______________</p>
       <table class="tracker"><tr><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th><th>Snack</th><th>Total g</th><th>Hit it?</th></tr>
       ${days.map((d) => `<tr><td><b>${d}</b></td><td></td><td></td><td></td><td></td><td></td><td>&#9744;</td></tr>`).join("")}
       </table>
       <h3 style="margin-top:22px">Prep checklist</h3>
       <ul class="check">
         <li>Groceries bought (list from this week's page)</li>
         <li>Containers clean and ready</li>
         <li>Sunday prep done and labelled</li>
         <li>Wednesday prep done</li>
         <li>Nothing in the fridge older than 4 days</li>
       </ul>
       <h3>Notes: favourite meals, what to change next week</h3>
       <div style="border:1px dashed var(--line); border-radius:10px; height:2.2in"></div>`
    )
  );

  // Disclaimer + next
  pages.push(
    page(
      `<div class="kicker">Before you start</div><h2>Important note</h2>
       <p>This blueprint is general nutrition education for healthy adults. It is not medical advice and does not replace advice from a doctor or registered dietitian. Talk to a healthcare professional before changing your diet if you are pregnant or breastfeeding, have kidney or liver disease, diabetes, food allergies, an eating disorder history, or any medical condition, or take medication.</p>
       <p>Nutrition values are estimates based on standard database averages and will vary with brands, portion sizes and cooking. Check labels for allergens (milk, eggs, fish, soy, peanuts, wheat, sesame appear in this plan). Pregnant people should follow local advice on fish and tuna intake.</p>
       <div class="box"><h3>You finished the 4 weeks. Now what?</h3>
       <ul>
         <li>Repeat your favourite week. Swap one recipe per week for something new.</li>
         <li>Keep using the tracker until hitting your number feels automatic.</li>
         <li>Share your prep on social media and tag ${BRAND}. We love seeing your containers.</li>
       </ul></div>
       <p class="small">&copy; ${new Date().getFullYear()} ${BRAND}. For personal use only. Please do not share or resell this file.</p>`
    )
  );

  return doc(PRODUCT, pages.join("\n"));
}

function cheatSheetInner(standalone) {
  return `<div class="kicker">${standalone ? "Free guide from " + BRAND : "Cheat sheet"}</div>
    <h2>What 30 g of protein looks like</h2>
    <p>Aim for 25 to 40 g of protein at each main meal. Here is roughly how much of each food gets you to 30 g. Values are approximate.</p>
    <table><tr><th>Food</th><th>Amount for ~30 g protein</th><th>Protein</th></tr>
    ${proteinFoods.map(([f, a, g]) => `<tr><td>${esc(f)}</td><td>${esc(a)}</td><td><b>${g} g</b></td></tr>`).join("")}
    </table>`;
}

function cheatSheetHtml() {
  pageNo = 0;
  const p1 = page(
    cheatSheetInner(true) +
      `<p class="small" style="margin-top:8px">General nutrition information, not medical advice.</p>`
  );
  const p2 = page(
    `<div class="kicker">3 quick wins</div><h2>Hit your protein goal without trying harder</h2>
     <h3>1. Fix breakfast first</h3>
     <p>Most people eat 10 to 15 g at breakfast. A Greek yogurt bowl or two egg muffins with a shake gets you to 30 g in under 3 minutes.</p>
     <h3>2. Cook protein in bulk, twice a week</h3>
     <p>One tray of chicken and one pot of chili on Sunday covers most lunches and dinners until Wednesday.</p>
     <h3>3. Keep a backup shelf</h3>
     <p>Canned tuna, Greek yogurt, eggs, cottage cheese and protein powder. When the plan breaks, you still hit your number.</p>
     <div class="box c" style="margin-top:24px"><h3>Want the whole system done for you?</h3>
     <p><b>${PRODUCT}</b>: 13 high-protein recipes, a 4-week plan, weekly grocery lists and a 60-minute Sunday prep timeline. About 140 g of protein a day, no macro math.</p>
     <p><b>Get it at ${esc(SITE_URL)}</b></p></div>`
  );
  return doc("30 g Protein Cheat Sheet", p1 + p2);
}

const doc = (title, body) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${css}</style></head><body>${body}</body></html>`;

async function main() {
  const files = [
    ["protein-prep-blueprint", blueprintHtml()],
    ["protein-cheat-sheet-free", cheatSheetHtml()],
  ];
  const browser = await chromium.launch();
  for (const [name, html] of files) {
    const htmlPath = out("product", `${name}.html`);
    fs.writeFileSync(htmlPath, html);
    const pg = await browser.newPage();
    await pg.goto("file://" + htmlPath);
    await pg.pdf({ path: out("product", `${name}.pdf`), format: "Letter", printBackground: true, preferCSSPageSize: true });
    await pg.close();
    console.log("built", name);
  }
  await browser.close();
  fs.copyFileSync(out("product", "protein-cheat-sheet-free.pdf"), out("site", "protein-cheat-sheet-free.pdf"));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

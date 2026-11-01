# Gumroad einrichten: Klick für Klick

Dauer: ca. 45 Minuten. Du brauchst: E-Mail, Bankkonto (IBAN), Ausweis, die Dateien aus diesem Ordner und die 2 PDFs.

Gumroad ändert seine Oberfläche ab und zu. Wenn ein Button anders heißt, such nach dem ähnlichsten Begriff. Gebühren und Steuerregeln prüfst du bitte selbst unter gumroad.com/pricing (Stand bei Erstellung: Gumroad tritt als *Merchant of Record* auf und führt die Umsatzsteuer für dich ab).

**Benötigte Dateien:**

| Datei | Wofür |
|---|---|
| `protein-prep-blueprint.pdf` (hab ich dir im Chat geschickt) | Bezahlprodukt |
| `protein-cheat-sheet-free.pdf` (Ordner `product/`) | Gratisprodukt |
| `blueprint-cover-1280x720.png`, `blueprint-thumb-600x600.png` | Bilder Bezahlprodukt |
| `cheatsheet-cover-1280x720.png`, `cheatsheet-thumb-600x600.png` | Bilder Gratisprodukt |

---

## Teil A: Konto anlegen (10 min)

1. Gehe auf **gumroad.com** -> **Start selling**.
2. Registriere dich mit E-Mail und Passwort. E-Mail bestätigen.
3. **Username** wählen: `prepwell` (oder `getprepwell`, falls vergeben). Er wird Teil deiner Links: `prepwell.gumroad.com`.
4. **Settings -> Profile:**
   - Name: `Prepwell`
   - Bio (einfügen): `High-protein meal prep for busy people. One hour on Sundays, about 140 g of protein a day.`
   - Profilbild: `blueprint-thumb-600x600.png`
5. **Settings -> Payments:** Land Österreich, IBAN, Name, Adresse, Geburtsdatum eintragen. Ggf. Ausweis hochladen (Gumroad verlangt das vor der ersten Auszahlung).
6. **Settings -> Advanced (oder Main):** Währung **USD**.

---

## Teil B: Bezahlprodukt anlegen (15 min)

1. Oben **Products -> New product**.
2. Typ: **Digital product**.
3. Name: `The Protein Prep Blueprint`
4. Preis: `19`
5. **Next: Customize**.

**Auf der Bearbeiten-Seite:**

- **Cover:** `blueprint-cover-1280x720.png` hochladen.
- **Thumbnail:** `blueprint-thumb-600x600.png`.
- **Description** (komplett einfügen):

```
Hit your protein goal without thinking about food all day.

The Protein Prep Blueprint is a 4-week high-protein meal prep system. Two short prep sessions a week (about 60 minutes on Sunday, 25 on Wednesday) and every breakfast, lunch, dinner and snack is decided. Around 140 g of protein a day. No macro math, no bland chicken and rice for 28 days.

WHAT'S INSIDE (31-page PDF)
✓ 13 high-protein recipes with metric and US units and macros per serving
✓ 4 weekly meal plans: breakfast, lunch, dinner and snack every day
✓ 4 grocery lists sorted into protein, produce and pantry
✓ Minute-by-minute Sunday prep timelines
✓ Protein target calculator: find your number in 30 seconds and scale the plan
✓ Swaps for vegetarian, dairy-free and budget eating
✓ The 30 g protein cheat sheet
✓ Printable weekly tracker and prep checklist

THE RECIPES
Sheet-Pan Lemon Herb Chicken (52 g) · Chicken Burrito Bowls (49 g) · Salmon, Quinoa & Lemon Yogurt (44 g) · Creamy Tuna Pasta Salad (42 g) · Overnight Protein Oats (37 g) · Crispy Tofu Peanut Stir-Fry (37 g) · Turkey & Bean Chili (36 g) · Beef & Broccoli Rice Bowls (36 g) · Classic Protein Shake (33 g) · Greek Yogurt Power Bowl (30 g) · Make-Ahead Egg Muffins (25 g) · Cottage Cheese & Pineapple (24 g) · Protein Snack Box (24 g)
Protein per serving, approximate.

PERFECT IF YOU
• Lift, run or train and want to support muscle
• Are losing weight and want to stay full
• Work full time and hate deciding what to eat

NOT FOR YOU IF YOU
• Need a medical or clinical diet
• Want a strict calorie-counted plan
• Are fully vegan

30-day money-back guarantee. If it doesn't help, email me for a full refund.

General nutrition education for healthy adults, not medical advice. Check with your doctor or a registered dietitian if you have a medical condition, are pregnant or take medication.
```

- **Summary / "You'll get..."** (falls es das Feld gibt): `31-page PDF · 13 recipes · 4 weekly plans · 4 grocery lists · tracker`
- **Additional details** (falls vorhanden, als Zeilen): `Format: PDF` / `Pages: 31` / `Recipes: 13`
- **Content / Product file:** Tab **Content** -> `protein-prep-blueprint.pdf` hochladen. Darunter als Text:

```
Thanks for grabbing The Protein Prep Blueprint!

Start on page 3, find your protein target on page 4, then shop with the Week 1 grocery list. Your first Sunday prep is on page 21.

Questions? Just reply to your receipt email.
```

- **Settings des Produkts:**
  - **Refund policy:** 30 days. Text: `30-day money-back guarantee. Email me within 30 days for a full refund.`
  - **Custom URL / Permalink:** `protein-prep-blueprint`
  - **Ask for email / Allow PPP discounts:** Purchasing Power Parity aktivieren (macht den Preis in ärmeren Ländern günstiger, bringt mehr Verkäufe weltweit).
- **Publish** klicken.

Dein Link: `https://prepwell.gumroad.com/l/protein-prep-blueprint` (bitte kopieren, den brauche ich).

### Optional, aber stark: Rabattcode für den Launch
**Checkout -> Discounts -> New discount:** Name `LAUNCH`, 25 % off, gültig 7 Tage, nur für dieses Produkt. Den Code nutzt du in E-Mail 4.

---

## Teil C: Gratisprodukt anlegen (10 min)

1. **Products -> New product -> Digital product**.
2. Name: `Free 30 g Protein Cheat Sheet`
3. Preis: `0` (Gumroad macht daraus "$0+", Käufer können freiwillig etwas zahlen. Das passt.)
4. **Cover:** `cheatsheet-cover-1280x720.png`, **Thumbnail:** `cheatsheet-thumb-600x600.png`
5. **Description:**

```
What does 30 g of protein actually look like?

This free 2-page cheat sheet shows you the amount of 16 everyday foods (chicken, Greek yogurt, eggs, tofu, lentils and more) that gets you to about 30 g of protein, plus 3 quick wins to eat more protein without trying harder.

Enter $0 to get it free. Instant download.

General nutrition information, not medical advice.
```

6. **Content:** `protein-cheat-sheet-free.pdf` hochladen. Text darunter:

```
Here's your cheat sheet. Save it to your phone or print it for the fridge.

Want the whole system done for you? The Protein Prep Blueprint has 13 high-protein recipes, a 4-week plan and weekly grocery lists:
https://prepwell.gumroad.com/l/protein-prep-blueprint
```

7. Permalink: `protein-cheat-sheet`
8. **Publish**.

Link: `https://prepwell.gumroad.com/l/protein-cheat-sheet` (kopieren).

---

## Teil D: Automatische E-Mails (10 min)

**Emails -> Workflows -> New workflow**
- Name: `Cheat sheet nurture`
- Trigger: **Purchase** of `Free 30 g Protein Cheat Sheet`
- (Falls möglich) ausschließen: Käufer von `The Protein Prep Blueprint`

Lege 4 E-Mails an (die Download-Mail verschickt Gumroad automatisch, daher startet die Sequenz bei Tag 1):

**E-Mail 1, Verzögerung 1 Tag**
Betreff: `Why you're hungry at 4 pm`
```
Hey,

quick one. Most people don't fall short on protein at dinner. They fall short at lunch, because at noon there's nothing ready.

The fix that works for me: cook protein in bulk twice a week. Sunday covers Monday to Wednesday, a 25-minute mini-prep on Wednesday covers the rest. Two sessions, because cooked food is best eaten within 3 to 4 days.

Tomorrow I'll send you my exact Sunday, minute by minute.

Prepwell
```

**E-Mail 2, Verzögerung 3 Tage**
Betreff: `My exact Sunday prep (minute by minute)`
```
Here's how I get 10 high-protein meals done in about an hour:

0:00 Oven on 220 °C / 425 °F. Potatoes on the tray.
0:05 Start the chili: brown the turkey.
0:10 Chop chicken and veg while the turkey browns.
0:20 Chicken tray in the oven. Chili ingredients in the pot.
0:40 Chicken out. Portion 4 containers.
0:50 Chili done. Portion 6 containers.
0:55 Yogurt jars and snack cups. Done.

That's 52 g of protein (lemon herb chicken) and 36 g (turkey chili) per meal, sorted until Wednesday.

This is week 1 of The Protein Prep Blueprint. All 4 weeks, 13 recipes and the grocery lists are here:
https://prepwell.gumroad.com/l/protein-prep-blueprint
```

**E-Mail 3, Verzögerung 5 Tage**
Betreff: `"Isn't this just chicken and rice?"`
```
Fair question. No.

Week 1: Lemon herb chicken, turkey chili, creamy tuna pasta salad
Week 2: Beef & broccoli bowls, chicken burrito bowls, egg muffins
Week 3: Crispy tofu peanut stir-fry, salmon with lemon yogurt
Week 4: Your greatest hits

13 recipes, around 140 g of protein a day, grocery list for every week.

For the next 7 days you get 25% off with code LAUNCH:
https://prepwell.gumroad.com/l/protein-prep-blueprint

30-day money-back guarantee, so there's no risk.
```

**E-Mail 4, Verzögerung 7 Tage**
Betreff: `Last note about the Blueprint`
```
Last email about this, promise.

The Protein Prep Blueprint is for you if you train or are losing weight, want to stay full, and hate deciding what to eat every day.

It's not for you if you need a medical diet or want a strict calorie plan.

$19 (or 25% off with LAUNCH this week), instant PDF, 30-day refund:
https://prepwell.gumroad.com/l/protein-prep-blueprint

From now on I'll just send you one high-protein tip or recipe per week.
```

Workflow **Publish** / aktivieren.

> Falls du den Rabattcode nicht angelegt hast: In E-Mail 3 und 4 den Satz mit LAUNCH löschen.

---

## Teil E: Testkauf (5 min)

1. Öffne den Link des Gratisprodukts im Inkognito-Fenster, gib 0 $ ein und deine zweite E-Mail-Adresse. Prüfe: Download klappt, PDF öffnet sich am Handy.
2. Bezahlprodukt: einmal echt kaufen, Download prüfen, dann unter **Sales** sofort erstatten (Refund).

---

## Danach: schick mir

```
Checkout-Link: https://...
Gratis-Link:  https://...
Impressum: Name, Adresse, E-Mail (und UID-Nummer, falls vorhanden)
Domain (falls gekauft): ...
```

Dann trage ich alles in die Website und die PDFs ein und stelle die Seite online.

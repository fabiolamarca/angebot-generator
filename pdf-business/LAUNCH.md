# Prepwell: Launch-Anleitung

Alles, was ich bauen konnte, ist fertig. Diese Schritte kann nur **du** machen (Konten, Geld, Recht). Plane dafür 2 bis 3 Stunden ein.

## Was fertig ist

| Datei | Was |
|---|---|
| `product/protein-prep-blueprint.pdf` | Das Produkt: 31 Seiten, 13 Rezepte, 4-Wochen-Plan, Einkaufslisten, Tracker |
| `product/protein-cheat-sheet-free.pdf` | Gratis Lead Magnet (2 Seiten), verweist auf das Produkt |
| `site/index.html` | Verkaufsseite (Desktop + Handy getestet) |
| `site/legal.html` | Impressum / Datenschutz / AGB mit Platzhaltern |
| `marketing/30-day-plan.md` | 30-Tage-Contentplan, Hooks, Skripte, Pinterest, E-Mails |
| `PIPELINE.md` | 10 nächste Produkte + Value Ladder |
| `scripts/` | Generator: Inhalte in `data.js` ändern, `node pdf-business/scripts/build.js` baut alles neu |

**Wichtig:** Dieses Repo ist öffentlich. Das bezahlte PDF und `scripts/data.js` (der komplette Produktinhalt) sind deshalb per `.gitignore` ausgeschlossen und wurden dir direkt im Chat geschickt. Lege für das Business ein **privates** Repo an und kopiere sie dort hinein, sonst kann jeder dein Produkt gratis herunterladen.

## Das Geschäftsmodell (nach dem Playbook aus dem Video)

```
Content (TikTok, Reels, Shorts, Pinterest)
   -> Gratis Cheat Sheet (E-Mail wird gesammelt)
      -> Blueprint $19
         -> später: Bundle $39 / Abo / weitere PDFs (siehe PIPELINE.md)
```

Ein PDF verkauft sich nicht von allein. **90 % der Arbeit ist Content.** Das Produkt ist der leichte Teil.

## Schritt 1: Name und Domain (15 min)

1. Prüfe, ob "Prepwell" frei ist: Instagram, TikTok, Domain (z. B. `getprepwell.com`), Markenregister (EUIPO, USPTO). Falls nicht frei: anderen Namen wählen und in `scripts/build.js` (`BRAND`), `site/index.html` und `site/legal.html` ersetzen.
2. Domain kaufen (Cloudflare, Namecheap, ca. 10 bis 12 USD/Jahr).

## Schritt 2: Verkaufsplattform: Gumroad (30 min)

Empfehlung: **Gumroad** (oder Lemon Squeezy / Payhip). Grund: Diese Anbieter sind *Merchant of Record*, sie berechnen und führen die Umsatzsteuer/VAT weltweit für dich ab und liefern die Datei automatisch aus. Mit reinem Stripe müsstest du EU-OSS, UK-VAT und US Sales Tax selbst abwickeln. Prüfe die aktuellen Gebühren und Bedingungen selbst.

1. Konto auf gumroad.com anlegen, Auszahlung (Bankkonto) hinterlegen.
2. **Produkt 1 (bezahlt):** "The Protein Prep Blueprint", Preis 19 USD, Datei `protein-prep-blueprint.pdf` hochladen. Beschreibung: Texte von der Verkaufsseite kopieren. Refund-Policy: 30 Tage.
3. **Produkt 2 (gratis):** "30 g Protein Cheat Sheet", Preis 0+ ("Pay what you want", Minimum 0). Datei `protein-cheat-sheet-free.pdf`. So sammelst du E-Mails.
4. In Gumroad unter *Workflows / Emails* die 5 E-Mails aus `marketing/30-day-plan.md` (Abschnitt "E-Mail-Sequenz") für Käufer des Gratis-Produkts anlegen.

## Schritt 3: Links eintragen (2 min)

In `site/index.html` ganz unten:

```js
var CHECKOUT_URL = "https://DEINNAME.gumroad.com/l/...";  // Produkt 1
var FREE_URL = "https://DEINNAME.gumroad.com/l/...";      // Produkt 2
```

Und die Domain im PDF: `SITE_URL=getprepwell.com node pdf-business/scripts/build.js` ausführen (oder mich bitten). Dann das neue Cheat-Sheet-PDF in Gumroad ersetzen.

## Schritt 4: Rechtliches (30 bis 60 min)

- `site/legal.html`: alle [Platzhalter] ausfüllen. In Österreich/Deutschland ist ein Impressum Pflicht. Generator nutzen (WKO bzw. e-recht24) oder kurz anwaltlich prüfen lassen.
- Gewerbe: In Österreich brauchst du für den Verkauf digitaler Produkte i. d. R. eine Gewerbeberechtigung (freies Gewerbe, z. B. "Handelsgewerbe" / "Verlag"). Mit deinem Steuerberater oder der WKO klären.
- Gesundheitsclaims: Keine Heilversprechen. Formulierungen wie "verlierst garantiert X kg" oder "heilt" niemals verwenden, weder auf der Seite noch im Content.

## Schritt 5: Online stellen auf Vercel (10 min)

1. Auf vercel.com: *Add New Project* -> dieses Repo wählen.
2. **Root Directory:** `pdf-business/site` (wichtig, sonst wird der Angebot-Generator deployed).
3. Deploy. Danach unter *Domains* deine Domain verbinden.
4. Besser langfristig: `pdf-business/` in ein eigenes Repo verschieben (das hier gehört eigentlich zum Angebot-Generator).

## Schritt 6: Testkauf (5 min)

Kaufe dein eigenes Produkt einmal (Gumroad erlaubt Testkäufe / sofort erstatten). Prüfe: Zahlung, Download-Mail, PDF öffnet sich am Handy.

## Schritt 7: Content starten

`marketing/30-day-plan.md` abarbeiten. Täglich 1 bis 3 Videos. Link in Bio = deine Domain.

## Realistische Erwartungen

- Ich kann dir kein "funktionierendes Business" garantieren. Ob es funktioniert, entscheidet sich am Content und an deiner Ausdauer, nicht am PDF.
- Typische Werte: Verkaufsseite konvertiert 1 bis 4 % der Besucher. Für 10 Verkäufe/Tag (190 USD) brauchst du also ca. 250 bis 1.000 Besucher/Tag.
- Die meisten Accounts brauchen 30 bis 90 Tage täglichen Content, bis ein Video durchstartet.
- **Kill-Kriterium:** Wenn nach 30 Tagen und 60+ Videos weniger als 50 Leute das Gratis-PDF geholt haben, ist der Winkel falsch. Dann Hook/Nische ändern (siehe PIPELINE.md), nicht aufgeben.

## Zahlen, die du wöchentlich trackst

| Kennzahl | Ziel Monat 1 |
|---|---|
| Videos gepostet | 60+ |
| Profilbesuche -> Link-Klicks | 5 bis 10 % |
| Besucher Verkaufsseite | 1.500+ |
| Gratis-Downloads | 150+ |
| Verkäufe | 15 bis 40 |
| Refund-Quote | unter 5 % |

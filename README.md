# Bus2u — website demo (Sýnidæmi)

A free, non-binding design proposal by Gardarvefur for Bus2u ehf. **Not deployed.**

## Run

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/index.html
npm run preview  # serve the build
```

## Netlify

`netlify.toml` sets build command `npm run build`, publish dir `dist`, an SPA fallback
(`/* → /index.html 200`) and an `X-Robots-Tag: noindex, nofollow` header. `index.html` also has
`<meta name="robots" content="noindex, nofollow">` and `public/robots.txt` disallows everything.

## Verified vs. demonstration content

| Content | Status | Where |
| --- | --- | --- |
| Bus2u ehf., Vogar, bus2u@simnet.is, tours & transport, Ferðamálastofa day-tour listing | Verified (client brief) | `src/data/company.ts` |
| Heiðargerði 25, 190 Vogar · 692 9080 | Found in Visit Reykjanes directory, **not shown** until confirmed | `unconfirmedContact` in `company.ts` |
| Hópferðir / Sérferðir / Akstursþjónusta | Proposal, "Tillaga" badge | `src/data/services.ts` |
| Tours (Suðurströndin, Gullni hringurinn, Reykjanesið) | Examples, "Dæmi um ferð" badge; duration/price/departures `null` | `src/data/tours.ts` |

No prices, availability, fleet details, reviews or certifications are invented.

## Booking inquiry

3 steps (service → details → review) with validation. There is **no backend**: the final step
is labelled "Sýnidæmi — ekkert sent" and offers a `mailto:` link that opens the visitor's own
email client. Nothing is sent or stored, and no payment details are requested. To go live,
replace `buildMailto` in `src/lib/inquiry.ts` with a tested endpoint (e.g. Netlify Forms or a
booking provider).

## Photography

Landscape only, from Wikimedia Commons (CC0 / CC BY 2.0 / CC BY 4.0 / CC BY-SA 4.0). Credits
and source links are in `src/data/images.ts` and in the site footer ("Myndir og leyfi"). No image
shows a vehicle. Each image ships at 800 px and 1600 px with `srcset`.

# The Harley Co. — Landing Page

A static landing page for The Harley Co. bakery (Saint Johns, FL). No build step, no server required — just HTML/CSS/JS.

## Running it locally

Open `index.html` directly in a browser, or serve the folder:

```
npx serve .
```

## Editing the weekly menu

Edit `js/menu-data.js`. Every item in the `WEEKLY_MENU` array automatically shows up in both the menu grid and the order form checkboxes — no HTML editing needed.

## Swapping in your real logo

Replace `images/logo.svg` with your actual logo file. If you use a PNG/JPG instead of SVG:
1. Save your logo as `images/logo.png`
2. In `index.html`, change every `images/logo.svg` reference to `images/logo.png` (there are 4: favicon, header, hero, footer)

## Order form

The order form currently opens a pre-filled email (`mailto:`) addressed to **colekouremetis2@gmail.com** — no backend needed, works anywhere. To change the destination email, edit `ORDER_EMAIL` at the top of `js/main.js`.

If you'd rather have orders submit silently (no email client popup) and land straight in your inbox, hook the form up to a free service like [Formspree](https://formspree.io) or [FormSubmit](https://formsubmit.co) later — that just means pointing the `<form>`'s `action` at their endpoint instead of using the JS mailto handler.

## Social links

Update the Instagram/Facebook URLs in the "Find Us" section of `index.html` to your real profiles.

## Deploying

This is a static site, so any static host works: [Netlify](https://netlify.com), [Vercel](https://vercel.com), [GitHub Pages](https://pages.github.com), or plain shared hosting — just upload the folder.

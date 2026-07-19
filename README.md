# Café con Kai

A minimal, static blog theme (plain HTML/CSS, no build tools, no server)
styled after 4gravitons.com — single centered column, quiet type, no sidebar
clutter.

## Files

- `index.html` — homepage, lists all posts newest-first (all categories mixed)
- `basel.html` — the flagship project: every café review in Basel, newest first
- `elsewhere.html` — café reviews from other cities, newest first
- `notes.html` — everything that isn't a review (brewing tips, explainers, musings), newest first
- `archive.html` — every post, one line each, links to all three category pages
- `about.html` — the "Who am I?" page
- `style.css` — all the styling, in one file
- `posts/template.html` — copy this for a **café review** (Basel or elsewhere)
- `posts/template-note.html` — copy this for a **general coffee post**

## Three categories

Posts are split into three kinds:

- **Basel** (`posts/template.html`, category line pointed at `basel.html`)
  — the main project: every café you review in Basel. `basel.html` also
  has a hand-updated count near the top ("X reviewed so far") — bump it
  each time you add one.
- **Elsewhere** (same `posts/template.html`, category line pointed at
  `elsewhere.html` instead) — café reviews from other cities/trips.
- **Coffee Notes** (`posts/template-note.html` → listed on `notes.html`) —
  no rating line, meant for brewing guides, explainers, general musings.

There's only one review template for both Basel and Elsewhere — inside it,
the post-meta block has two category lines with one commented out; keep
whichever city applies and delete/comment the other. All three categories
show up together on `index.html` and `archive.html`; the nav bar (Basel /
Elsewhere / Notes) lets visitors jump to just one kind.

## Adding a new post

1. Copy `posts/template.html` (any café review) or `posts/template-note.html`
   (everything else), and rename it, e.g. `posts/kaffeehaus-mueller.html`.
2. Open it and fill in: the `<title>`, the post title, the date, body
   paragraphs, and tags. For reviews: fill in or delete the rating line,
   and pick Basel or Elsewhere in the post-meta block (delete the other line).
3. Add a matching entry to `archive.html` (one line, newest at the top).
4. Add the same entry to `basel.html`, `elsewhere.html`, or `notes.html`,
   whichever fits. If it's a Basel review, bump the count in `basel.html`.
5. Add an excerpt block to `index.html` (copy one of the existing
   `<article class="post">` blocks, point the links at your new file, trim
   the text to a couple of sentences, keep the "Continue reading" link).
6. If you want a photo, drop the image file in `posts/images/` and
   uncomment the `<img>` line in your post.

Yes, that's four files to touch per post (post + archive + category page +
homepage excerpt). There's no CMS here — it's plain files, so this is the
tradeoff for not needing a build step or database.

## Adding photos

Drop image files in `posts/images/`, then use whichever pattern fits, all
already set up in `posts/template.html` as commented examples:

- A single photo, no caption: one `<img>` tag.
- A single photo with a caption: wrap it in `<figure>` /
  `<figcaption>`.
- Two or three photos side by side: wrap `<img>` tags in
  `<div class="photo-grid">`. It wraps to a single column automatically on
  narrow screens.

All images are responsive by default (full column width, or filling their
grid cell) — no manual resizing needed.

## Editing the site name, tagline, and about blurb

Site title and tagline live in the `<header class="site-header">` block —
it's repeated at the top of every page (`index.html`, `about.html`,
`archive.html`, `basel.html`, `elsewhere.html`, `notes.html`,
`posts/template.html`, `posts/template-note.html`), so update it
everywhere, or just do a find-and-replace for the placeholder text across
all files (VS Code: Cmd/Ctrl+Shift+F, expand the replace field, "Replace
All").

The about blurb is in `about.html`; the short version in the homepage
footer is in `index.html`.

## Hosting it

Any static host works. Two free, no-fuss options:

- **GitHub Pages**: create a repo, push these files, turn on Pages in repo
  settings pointing at the root of the `main` branch.
- **Netlify**: drag the whole folder onto netlify.com/drop.

You can also just open `index.html` directly in a browser to preview it
locally before publishing anything.

## Customizing the look

Everything's controlled from `style.css`. The color variables at the top
(`--page-bg`, `--link`, etc.) are the fastest way to change the palette;
`--max-width` controls the column width, and the two font stacks
(`--serif`, `--sans`) control the type.

## Espresso Log (log.html)

A quick-entry log for daily espresso shots — beans, temperature, grind
size, dose, extraction time, and a flavor note — filled out from your
phone via a Google Form, and shown automatically on `log.html` as a list
of mini posts. No backend, no database: `log.html` just reads a public
Google Sheet with a bit of JavaScript.

**One-time setup:**

1. Go to [forms.google.com](https://forms.google.com) and create a new
   form with these questions, **in this exact order**:
   - **Coffee Beans** — Multiple choice, with "Add other" turned on (so
     you can type a new bean on the fly; add it as a real option later
     if you use it often).
   - **Temperature (°C)** — Short answer. Under the ⋮ menu, turn on
     Response validation → Number, to keep it numeric.
   - **Grind Size** — Short answer, same number validation.
   - **Dose (g)** — Short answer, same number validation.
   - **Extraction Time (s)** — Short answer, same number validation.
   - **Flavor Notes** — Paragraph.
2. On the form's **Responses** tab, click the green Sheets icon to
   create a linked Google Sheet.
3. In that Sheet: **File → Share → General access → "Anyone with the
   link"**, set to Viewer. (You do *not* need "Publish to web".)
4. Copy the Sheet's ID from its URL — the long string between
   `/d/` and `/edit`:
   `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`
5. Open `log.html`, find the script near the bottom, and paste that ID
   into `SHEET_ID`. Leave `SHEET_NAME` as `"Form Responses 1"` unless you
   renamed the sheet tab.
6. Open the Form itself, hit Send, copy its link, and paste it over
   `YOUR_GOOGLE_FORM_LINK_HERE` near the top of `log.html` (the "Add
   today's shot" link).
7. On your phone, save the Form link to your home screen (Share → Add to
   Home Screen) so it opens like a mini app.

That's it — every submission shows up on `log.html` automatically,
newest first. There's a short delay (Google's CSV export caches for a
minute or two), so a brand-new entry might take a moment to appear.

**Adding a new coffee bean:** pick "Other" in the Form and type it in.
Once you've used a bean a few times, edit the Form and add it as a real
option so it's a single tap next time.

# Café con Kai

A minimal, static blog theme (plain HTML/CSS, no build tools, no server)
styled after 4gravitons.com — single centered column, quiet type, no sidebar
clutter.

## Files

- `index.html` — homepage, auto-built by `feed.js` from the 10 most
  recent entries across all three category pages (see below)
- `basel.html` — the flagship project: every café review in Basel, newest
  first. **This is a file you actually edit** when you add a Basel post.
- `elsewhere.html` — café reviews from other cities, newest first. **You
  edit this** for a non-Basel review.
- `notes.html` — everything that isn't a review (brewing tips, explainers,
  musings), newest first. **You edit this** for a general post.
- `archive.html` — every post, one line each, auto-built by `feed.js`
- `feed.js` — the script that reads basel/elsewhere/notes.html and builds
  the homepage and archive; you never need to edit this
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

Only **two** files to touch — the post itself, and its category page.
`index.html` and `archive.html` build themselves.

1. Copy `posts/template.html` (any café review) or `posts/template-note.html`
   (everything else), and rename it, e.g. `posts/kaffeehaus-mueller.html`.
2. Open it and fill in: the `<title>`, the post title, the date, body
   paragraphs, and tags. For reviews: fill in or delete the rating line,
   and pick Basel or Elsewhere in the post-meta block (delete the other line).
3. Open `basel.html`, `elsewhere.html`, or `notes.html` — whichever fits —
   and copy one `<article class="entry">` block to the **top** of the list
   (newest first). Update `data-date`, the link + title, the date shown,
   and write a 1-2 sentence excerpt. That's it.
4. If you want a photo, drop the image file in `posts/images/` and
   uncomment the `<img>` line in your post.

The Basel "X reviewed so far" count updates itself. The homepage (10 most
recent, mixed across all categories) and the archive page rebuild
themselves every time someone loads them, by fetching `basel.html`,
`elsewhere.html`, and `notes.html` and reading the `.entry` blocks — see
`feed.js`. Keep pasting new entries at the top; everything is sorted by
`data-date` anyway, so exact position doesn't matter, but newest-first
keeps the source readable.

**Heads up:** because the homepage and archive use `fetch()` to read the
other pages, this only works when the site is served over `http://` or
`https://` — GitHub Pages and Netlify both do this automatically. If you
want to preview locally before pushing, don't just double-click
`index.html`; instead run a tiny local server from this folder, e.g.
`python3 -m http.server`, then open `http://localhost:8000/`. Opening the
file directly (`file://...`) will leave the homepage stuck on "Loading
posts…".

To change the homepage cap, edit the `10` passed to `renderHomeFeed` in
the `<script>` tag at the bottom of `index.html`.

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
   - **Coffee Beans** — Short answer (plain text). A dropdown was
     tempting, but Google Forms' "Add other" answers never get promoted
     into the permanent choice list, so a dropdown would need manual
     upkeep for no real benefit — plain text is one tap either way.
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
4. Copy the Sheet's ID from its URL — the long string between `/d/` and
   `/edit`, plus the number after `gid=` at the very end (usually `0`):
   `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit#gid=`**`0`**
5. Open `log.html`, find the script near the bottom, and paste the ID
   into `SHEET_ID` and the gid number into `SHEET_GID` (it defaults to
   `0`, which is correct for the first/only sheet tab in almost every
   case — no need to touch it unless your sheet has multiple tabs).
6. Open the Form itself, hit Send, and copy its link. The link is kept
   off the public site on purpose (so random visitors can't submit
   entries) — just save it for yourself in step 7.
7. On your phone, save the Form link to your home screen (Share → Add to
   Home Screen) so it opens like a mini app.

That's it — every submission shows up on `log.html` automatically,
newest first. There's a short delay (Google's CSV export caches for a
minute or two), so a brand-new entry might take a moment to appear.

**Adding a new coffee bean:** just type it into the Coffee Beans field —
no form editing needed, ever.

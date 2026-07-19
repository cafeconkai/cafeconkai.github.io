# Café con Kai

A minimal, static blog theme (plain HTML/CSS, no build tools, no server) — single centered column, quiet type, no sidebar clutter.

## Files

- `index.html` — homepage, lists all posts newest-first (all categories mixed)
- `basel.html` — main project: every café review in Basel, newest first
- `elsewhere.html` — café reviews from other cities, newest first
- `notes.html` — everything that isn't a review, newest first
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

Any static host works.

- **GitHub Pages**: create a repo, push these files, turn on Pages in repo
  settings pointing at the root of the `main` branch.

You can also just open `index.html` directly in a browser to preview it
locally before publishing anything.

## Customizing the look

Everything's controlled from `style.css`. The color variables at the top
(`--page-bg`, `--link`, etc.) are the fastest way to change the palette;
`--max-width` controls the column width, and the two font stacks
(`--serif`, `--sans`) control the type.

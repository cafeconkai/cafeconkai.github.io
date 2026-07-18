# Coffee Notes

A minimal, static blog theme (plain HTML/CSS, no build tools, no server)
styled after 4gravitons.com — single centered column, quiet type, no sidebar
clutter.

## Files

- `index.html` — homepage, lists posts newest-first
- `about.html` — the "Who am I?" page
- `archive.html` — a plain chronological list of every post
- `style.css` — all the styling, in one file
- `posts/template.html` — copy this for every new post

## Adding a new post

1. Duplicate `posts/template.html` and rename it, e.g. `posts/blue-bottle-hayes-valley.html`.
2. Open it and fill in: the `<title>`, the post title, the date, category,
   optional rating line, body paragraphs, and tags. Delete the parts you
   don't want (like the rating line).
3. Add a matching entry to `archive.html` (one line, newest at the top).
4. Add an excerpt block to `index.html` (copy the existing `<article
   class="post">` block, point the links at your new file, trim the text to
   a couple of sentences, keep the "Continue reading" link).
5. If you want a photo, drop the image file in `posts/images/` and
   uncomment the `<img>` line in your post.

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
`archive.html`, `posts/template.html`), so update it everywhere, or just do
a find-and-replace for the placeholder text across all files.

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

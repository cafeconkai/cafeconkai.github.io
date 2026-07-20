/* ---------------------------------------------------------------
   feed.js — builds the homepage and archive.html automatically by
   reading the .entry blocks already on basel.html, elsewhere.html, and
   notes.html. Those three category pages are the single source of
   truth: add a post there once, and it shows up everywhere.

   NOTE: this uses fetch() on local pages, which only works when the
   site is served over http(s) — GitHub Pages, Netlify, or a local
   server (e.g. `python3 -m http.server` in this folder, then visit
   http://localhost:8000/). Double-clicking index.html and opening it
   as a file:// URL will NOT work; browsers block that kind of fetch.
------------------------------------------------------------------ */

const FEED_SOURCES = [
  { file: "basel.html", label: "Basel", href: "basel.html" },
  { file: "elsewhere.html", label: "Elsewhere", href: "elsewhere.html" },
  { file: "notes.html", label: "Coffee Notes", href: "notes.html" },
];

async function fetchEntries() {
  const all = [];
  for (const src of FEED_SOURCES) {
    let res;
    try {
      res = await fetch(src.file);
    } catch (err) {
      continue; // skip a source that fails to load rather than breaking the whole feed
    }
    if (!res.ok) continue;
    const doc = new DOMParser().parseFromString(await res.text(), "text/html");
    doc.querySelectorAll(".entry").forEach((el) => {
      const titleLink = el.querySelector(".entry-title a");
      const excerptEl = el.querySelector(".entry-excerpt");
      const timeEl = el.querySelector(".entry-meta time");
      if (!titleLink) return;
      all.push({
        date: el.getAttribute("data-date") || "",
        dateText: timeEl ? timeEl.textContent : "",
        datetime: timeEl ? timeEl.getAttribute("datetime") || "" : "",
        title: titleLink.textContent,
        href: titleLink.getAttribute("href") || "#",
        excerpt: excerptEl ? excerptEl.textContent : "",
        category: src.label,
        categoryHref: src.href,
      });
    });
  }
  all.sort((a, b) => b.date.localeCompare(a.date));
  return all;
}

function renderHomeFeed(entries, limit = 10) {
  const container = document.getElementById("home-feed");
  if (!container) return;
  if (!entries.length) {
    container.innerHTML = `<p>No posts yet — add one via basel.html, elsewhere.html, or notes.html.</p>`;
    return;
  }
  container.innerHTML = entries
    .slice(0, limit)
    .map(
      (e) => `
    <article class="post">
      <h2 class="post-title"><a href="${e.href}">${e.title}</a></h2>
      <p class="post-meta">Posted on <time datetime="${e.datetime}">${e.dateText}</time> in <a href="${e.categoryHref}">${e.category}</a></p>
      <div class="post-excerpt"><p>${e.excerpt}</p></div>
      <p class="read-more"><a href="${e.href}">Continue reading &rarr;</a></p>
    </article>`
    )
    .join("");
}

function renderArchive(entries) {
  const container = document.getElementById("archive-list");
  if (!container) return;
  if (!entries.length) {
    container.innerHTML = `<p>No posts yet.</p>`;
    return;
  }
  container.innerHTML = entries
    .map(
      (e) => `
    <p><time datetime="${e.datetime}">${e.dateText}</time> — <a href="${e.href}">${e.title}</a> <span class="post-tags">(${e.category})</span></p>`
    )
    .join("");
}

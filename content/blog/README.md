# Blog posts

One Markdown file per post: `content/blog/<slug>.md`. The post goes live at
`/blog/<slug>` and appears on `/blog`, on the homepage strip (latest 3) and in the sitemap
on the next deploy. Nothing else to edit.

## Front matter

```yaml
---
title: "Roof Repair vs. Roof Replacement: How to Decide"      # required. The H1 and card title.
seoTitle: "Roof Repair vs. Replacement: How to Decide in West Georgia"  # optional, 70 max. Full <title>, used as-is.
                                                               # Without it the title gets " | McKinley Roofing" added.
slug: "roof-repair-vs-replacement"                             # required. Lowercase-hyphens; must equal the file name.
category: "Roofing Tips"                                       # required. Red tag on the card and hero.
metaDescription: "Repair or replace your roof? ..."            # required, 50-170 characters.
excerpt: "..."                                                 # optional. Card text; defaults to metaDescription.
datePublished: "2026-10-21"                                    # required, YYYY-MM-DD. Newest first everywhere.
dateModified: "2026-11-02"                                     # optional, YYYY-MM-DD.
image: "/blog_repair_vs_replacement.webp"                      # required. A file in /public (see below).
imageAlt: "McKinley Roofing truck parked at a two-story home"  # required. Describe what is in the photo.
imagePosition: "top"                                           # optional: top, center (default) or bottom. Which part
                                                               # of the photo the wide article hero keeps.
faqs:                                                          # optional. FAQ cards + FAQPage schema.
  - question: "Is it cheaper to repair or replace a roof?"
    answer: "A repair costs less up front, every time. ..."
editorial:                                                     # optional. Reviewer notes; never rendered.
  status: "..."
---
```

Any other field, a missing required field, a bad date or a missing image stops the build
with a message naming the file.

## Body

- Plain Markdown: `## ` and `### ` headings, paragraphs, `**bold**`, `*italic*`, `- ` bullet
  lists (red check marks), `1. ` numbered lists, links, `> ` quotes, tables.
- No `# ` heading (the title is the H1) and no raw HTML: both fail the build.
- The first paragraph is shown as the bordered lead paragraph.
- A paragraph that is entirely italic is shown as a small grey note (use it for the
  "general information, not legal or insurance advice" line).
- Links: site pages as paths, e.g. `[roof repair](/roof-repair-douglasville-ga)`. A link to a
  page that does not exist fails the build. Phone: `[(678) 983-4455](tel:6789834455)`.
  Outside sites: full `https://` address (opens in a new tab).
- Closing call to action: if the LAST `## ` section contains a phone link, it becomes the dark
  CTA box at the bottom of the page (after the FAQs), with the phone and Contact buttons.
- `[CONFIRM ...]` editor's notes show as a yellow "needs confirmation" box on previews and
  local builds. A production build fails while one is left in a post.

## Hero image

Real McKinley photos only (no AI or stock). Landscape, 1920x1080 WebP, under about 300 KB,
subject in the middle (the hero crops to a wide band; the cards crop to 16:10). Put it in
`public/` as `blog_<topic>.webp`.

## The two older posts

`/blog/how-roofing-insurance-claims-work-in-georgia` and
`/blog/protect-your-home-with-expert-roofing-services` are hand-built pages
(`app/blog/<slug>/page.tsx`), listed in `LEGACY_POSTS` in `lib/blog-posts.ts`. Don't add
new posts that way.

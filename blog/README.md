# grandimam.com

Personal site of Fauzan Baig, built with Jekyll and deployed to GitHub Pages on push to `main`.

## Writing

```bash
make serve                                   # preview at http://localhost:4000
make drafts                                  # preview including drafts and future-dated posts

make draft title="Why free-threading matters"   # _drafts/, no date yet
make publish file=_drafts/why-free-threading-matters.md   # move to _posts/, dated today
make post  title="..." topic=python          # essay, dated today
make note  title="..." topic=agentic         # short note, dated today
```

A post only needs:

```yaml
---
title: "..."
topic: python        # python | agentic | careers | islam  (see _config.yml)
---
```

Optional front matter:

| Field | Effect |
|---|---|
| `excerpt` | Summary for listings, RSS, and link previews (defaults to the first paragraph) |
| `series` | Groups posts into a series with "Part N of M" navigation |
| `updated: 2026-10-10` | Shows an "Updated" date |
| `toc: true` / `false` | Force the table of contents on/off (automatic above 1200 words) |
| `slug` | Override the URL. Defaults to the filename. Don't change it on published posts |
| `date` | Set a future date to schedule a post. It goes live on the first build after that date |

Reading time is computed automatically.

## Where things live

| Path | What |
|---|---|
| `_posts/` | Essays → `/posts/<name>/` |
| `notes/_posts/` | Notes → `/notes/<name>/` |
| `_drafts/` | Unpublished drafts |
| `assets/posts/<name>/` | Images for a post |
| `_data/projects.yml` | The projects on the home page |
| `about.md` | The `/about/` page. Update its "Now" section every few months |
| `_config.yml` | Topics, site description, social links |
| `assets/css/site.css` | Styles (colour variables at the top, dark mode included) |
| `assets/css/syntax.css` | Code highlighting (generated with `rougify style github.light/.dark`) |

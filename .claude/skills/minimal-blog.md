# Minimal Blog Design System

A clean, minimalist Jekyll blog design inspired by technical writing blogs. Pure black and white, no frameworks, inline CSS, maximum readability.

## Design Philosophy

- **Minimalist**: No clutter, generous whitespace
- **Typography-first**: System fonts, optimal line heights
- **No dependencies**: Inline CSS, no frameworks
- **Mobile-responsive**: Graceful degradation
- **Fast**: Zero external requests for styling

## Color Palette

```
Primary text:     #111 (near-black)
Secondary text:   #666 (dark gray)
Tertiary text:    #999 (medium gray)
Subtle text:      #bbb (light gray)
Background:       #fff (white)
Borders:          #eee (very light gray)
Code background:  #f6f8fa (GitHub-style light gray)
Code border:      #e1e4e8
```

## Typography

```
Font stack:       -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif
Monospace:        "JetBrains Mono", monospace (via Google Fonts)
Base size:        16px
Line height:      1.6 (index), 1.7-1.8 (articles)
```

## Layout ASCII Examples

### Index Page Layout (Desktop)

```
+----------------------------------------------------------+
|                        80px padding                       |
|  +----------------------------------------------------+  |
|  |  Site Title (18px, weight 600)                     |  |
|  |  Site description (15px, #666)                     |  |
|  +----------------------------------------------------+  |
|                        64px gap                           |
|  +----------------------------------------------------+  |
|  |  2025                          (year header, 14px) |  |
|  |                                                    |  |
|  |  Mar 28  Post Title Here              5 min       |  |
|  |  Mar 27  Another Post Title           3 min       |  |
|  |                                                    |  |
|  |  2024                                              |  |
|  |                                                    |  |
|  |  Dec 15  Older Post Title             8 min       |  |
|  +----------------------------------------------------+  |
|                        80px gap                           |
|  +----------------------------------------------------+  |
|  |  ─────────────────────────────────── (1px #eee)   |  |
|  |  Twitter  GitHub  LinkedIn  Email  RSS  (14px)    |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
            max-width: 640px, centered
```

### Post Item Structure

```
+----------------------------------------------------------+
|  [date]     [title]                          [read time] |
|  52px       flex: 1                          flex-shrink |
|  #999       #111                             #bbb        |
|  14px       15px                             13px        |
+----------------------------------------------------------+
```

### Article Page Layout (Desktop)

```
+------------------------------------------------------------------------+
|                              80px padding                               |
|  +------------------------------------------------------------------+  |
|  |  ← Site Title (back link, 14px, #666)                            |  |
|  +------------------------------------------------------------------+  |
|                              48px gap                                   |
|  +------------------+     +----------------------------------------+   |
|  |  ON THIS PAGE    |     |  Post Title (28px, weight 600)         |   |
|  |  (sticky TOC)    |     |  March 27, 2025 · 5 min read           |   |
|  |                  |     |                                        |   |
|  |  │ Section 1     |     |  Article content here with 1.8         |   |
|  |  │ Section 2     |     |  line height for optimal reading.      |   |
|  |    └ Subsection  |     |                                        |   |
|  |  │ Section 3     |     |  ## Heading 2 (20px)                   |   |
|  |                  |     |                                        |   |
|  |  200px width     |     |  More content...                       |   |
|  |  sticky top:80px |     |                                        |   |
|  +------------------+     |  ### Heading 3 (17px)                  |   |
|                           |                                        |   |
|        64px gap           |  max-width: 640px                      |   |
|                           +----------------------------------------+   |
|                                                                        |
+------------------------------------------------------------------------+
                        max-width: 1100px, centered
```

### Mobile Layout (< 900px for article, < 480px for index)

```
Article Mobile:
+--------------------------------+
|  ← Site Title                  |
|                                |
|  +---------------------------+ |
|  | ON THIS PAGE (collapsed)  | |
|  | Section 1 | Section 2 ... | |
|  +---------------------------+ |
|  (background: #f9f9f9)         |
|                                |
|  Post Title                    |
|  Date · Read time              |
|                                |
|  Content flows full width...   |
+--------------------------------+

Index Mobile:
+--------------------------------+
|  Site Title                    |
|  Description                   |
|                                |
|  2025                          |
|                                |
|  Mar 28  Post Title            |
|          5 min                 |
|                                |
|  Mar 27  Another Post          |
|          3 min                 |
+--------------------------------+
(post-reading-time wraps below)
```

## CSS Reset

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #111;
  background: #fff;
  -webkit-font-smoothing: antialiased;
}
```

## Component Styles

### Links

```css
a {
  color: #111;
  text-decoration: none;
  transition: opacity 0.15s ease;
}

a:hover {
  opacity: 0.6;
}
```

### Container

```css
/* Index page */
.container {
  max-width: 640px;
  margin: 0 auto;
  padding: 80px 24px;
}

/* Article page - wider for TOC */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 24px;
}
```

### Header (Index)

```css
.header {
  margin-bottom: 64px;
}

.header h1 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.header p {
  font-size: 15px;
  color: #666;
}
```

### Post List

```css
.year {
  font-size: 14px;
  font-weight: 600;
  color: #111;
  margin-top: 40px;
  margin-bottom: 16px;
}

.year:first-of-type {
  margin-top: 0;
}

.post-item {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 8px 0;
}

.post-date {
  font-size: 14px;
  color: #999;
  flex-shrink: 0;
  width: 52px;
}

.post-title {
  font-size: 15px;
  color: #111;
  flex: 1;
}

.post-reading-time {
  font-size: 13px;
  color: #bbb;
  flex-shrink: 0;
}
```

### Footer

```css
.footer {
  margin-top: 80px;
  padding-top: 32px;
  border-top: 1px solid #eee;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-links a {
  font-size: 14px;
  color: #666;
}

.footer-links a:hover {
  color: #111;
  opacity: 1;
}
```

### Article Layout

```css
.post-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 64px;
}

.post-article {
  max-width: 640px;
}
```

### Table of Contents

```css
.toc {
  position: sticky;
  top: 80px;
  align-self: start;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
}

.toc-title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #999;
  margin-bottom: 16px;
}

.toc-list {
  list-style: none;
}

.toc-list a {
  display: block;
  font-size: 13px;
  color: #666;
  text-decoration: none;
  padding: 6px 0;
  border-left: 2px solid transparent;
  padding-left: 12px;
  margin-left: -12px;
}

.toc-list a.active {
  color: #111;
  border-left-color: #111;
}

.toc-list .toc-h3 a {
  padding-left: 24px;
  font-size: 12px;
  color: #888;
}
```

### Article Header

```css
.post-header {
  margin-bottom: 48px;
}

.post-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 12px;
}

.post-meta {
  font-size: 14px;
  color: #999;
}

.post-meta span {
  margin-right: 16px;
}
```

### Article Content

```css
.post-content {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.post-content h2 {
  font-size: 20px;
  font-weight: 600;
  margin-top: 48px;
  margin-bottom: 16px;
  color: #111;
}

.post-content h3 {
  font-size: 17px;
  font-weight: 600;
  margin-top: 32px;
  margin-bottom: 12px;
  color: #111;
}

.post-content p {
  margin-bottom: 24px;
}

.post-content ul,
.post-content ol {
  margin-bottom: 24px;
  padding-left: 24px;
}

.post-content li {
  margin-bottom: 8px;
}

.post-content blockquote {
  border-left: 2px solid #ddd;
  padding-left: 20px;
  margin: 32px 0;
  color: #666;
  font-style: italic;
}

.post-content a {
  text-decoration: underline;
  text-underline-offset: 2px;
}
```

### Code Blocks

```css
.post-content code {
  font-family: "JetBrains Mono", monospace;
  font-size: 14px;
  background: #f6f8fa;
  padding: 2px 6px;
  border-radius: 4px;
  color: #24292e;
}

.post-content pre {
  background: #f6f8fa;
  border: 1px solid #e1e4e8;
  padding: 16px 20px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 32px 0;
  font-size: 14px;
  line-height: 1.6;
}

.post-content pre code {
  background: none;
  padding: 0;
  border: none;
}
```

### Syntax Highlighting (GitHub Light)

```css
.highlight .k, .highlight .kd, .highlight .kn, .highlight .kp,
.highlight .kr, .highlight .kt { color: #d73a49; }  /* keywords */

.highlight .s, .highlight .s1, .highlight .s2, .highlight .sb,
.highlight .sc, .highlight .sd, .highlight .se, .highlight .sh,
.highlight .sx { color: #032f62; }  /* strings */

.highlight .c, .highlight .c1, .highlight .cm, .highlight .cp,
.highlight .cs { color: #6a737d; font-style: italic; }  /* comments */

.highlight .na, .highlight .nb, .highlight .nc, .highlight .no,
.highlight .nd, .highlight .ni, .highlight .ne, .highlight .nf,
.highlight .nl, .highlight .nn, .highlight .nt { color: #6f42c1; }  /* names */

.highlight .nv, .highlight .vc, .highlight .vg, .highlight .vi { color: #e36209; }  /* variables */

.highlight .m, .highlight .mi, .highlight .mf, .highlight .mh,
.highlight .mo { color: #005cc5; }  /* numbers */

.highlight .o, .highlight .ow { color: #d73a49; }  /* operators */
```

## Mobile Responsive

```css
/* Index mobile (< 480px) */
@media (max-width: 480px) {
  .container {
    padding: 48px 20px;
  }

  .header {
    margin-bottom: 48px;
  }

  .post-item {
    flex-wrap: wrap;
    gap: 4px 16px;
    padding: 12px 0;
  }

  .post-reading-time {
    width: 100%;
    margin-left: 68px;
    margin-top: -4px;
  }

  .footer {
    margin-top: 48px;
  }
}

/* Article mobile (< 900px) */
@media (max-width: 900px) {
  .container {
    padding: 48px 20px;
  }

  .post-layout {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .toc {
    position: relative;
    top: 0;
    margin-bottom: 32px;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 6px;
    max-height: none;
  }

  .toc-list a {
    padding-left: 0;
    margin-left: 0;
    border-left: none;
  }

  .post-title {
    font-size: 24px;
  }
}
```

## TOC JavaScript

Auto-generates table of contents from h2/h3 headings with scroll-spy:

```javascript
(function() {
  const content = document.getElementById('post-content');
  const toc = document.getElementById('toc');
  const headings = content.querySelectorAll('h2, h3');

  if (headings.length < 2) {
    toc.style.display = 'none';
    return;
  }

  let html = '<div class="toc-title">On this page</div><ul class="toc-list">';

  headings.forEach((heading, i) => {
    const id = heading.textContent.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    heading.id = id;
    const level = heading.tagName.toLowerCase();
    html += '<li class="toc-' + level + '"><a href="#' + id + '">' +
            heading.textContent + '</a></li>';
  });

  html += '</ul>';
  toc.innerHTML = html;

  // Scroll spy
  const tocLinks = toc.querySelectorAll('a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => link.classList.remove('active'));
        const activeLink = toc.querySelector('a[href="#' + entry.target.id + '"]');
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: '-80px 0px -80% 0px' });

  headings.forEach(heading => observer.observe(heading));
})();
```

## Jekyll Structure

```
blog/
├── _config.yml
├── _layouts/
│   ├── default.html    # Index page layout
│   └── post.html       # Article layout
├── _posts/
│   └── YYYY-MM-DD-slug.md
├── index.html
├── feed.xml
├── CNAME
└── Gemfile
```

## Post Frontmatter

```yaml
---
layout: post
title: "Post Title Here"
date: 2025-03-27
reading_time: 5
slug: post-slug
excerpt: "Brief description for SEO and previews."
---
```

## Config Structure

```yaml
title: Site Title
description: Site tagline
baseurl: ""
url: "https://yourdomain.com"

author:
  name: Your Name

social:
  twitter: username
  github: username

markdown: kramdown
highlighter: rouge
permalink: /posts/:slug/

plugins:
  - jekyll-paginate
  - jekyll-seo-tag
  - jekyll-sitemap
```

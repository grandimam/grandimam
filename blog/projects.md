---
title: Projects
permalink: /projects/
description: "Things I've built and am building, with their status."
---
{%- assign groups = "active|Active,experiment|Experiments,archived|Archived" | split: "," -%}
<header class="listing-header">
  <h1 class="section-heading">Projects</h1>
  <p class="subtitle">Things I’ve built because I wished they existed. Most begin as experiments to understand something properly.</p>
</header>

{% for g in groups %}
  {%- assign parts = g | split: "|" -%}
  {%- assign items = site.data.projects | where: "status", parts[0] -%}
  {% if items.size > 0 %}
  <section class="project-group" aria-labelledby="projects-{{ parts[0] }}">
    <h2 class="year-heading" id="projects-{{ parts[0] }}">{{ parts[1] }}</h2>
    <ul class="project-list">
      {% for p in items %}
        <li class="project">
          <div class="project-head">
            <a class="project-name" href="{% if p.url %}{{ p.url }}{% else %}https://github.com/{{ p.repo }}{% endif %}">{{ p.name }}</a>
            <span class="project-lang">{{ p.language }}</span>
          </div>
          <p class="project-summary">{{ p.summary }}</p>
          <p class="project-links">
            <a href="https://github.com/{{ p.repo }}">Source</a>
            {% for slug in p.posts %}
              {%- assign linked = site.posts | where: "slug", slug | first -%}
              {% if linked %}<a href="{{ linked.url | relative_url }}">{{ linked.title }}</a>{% endif %}
            {% endfor %}
          </p>
        </li>
      {% endfor %}
    </ul>
  </section>
  {% endif %}
{% endfor %}

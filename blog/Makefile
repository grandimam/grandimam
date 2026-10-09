# Writing workflow. Run `make help`.
.PHONY: help serve drafts post note draft publish build

TODAY := $(shell date +%Y-%m-%d)
SLUG = $(shell echo "$(title)" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$$//g')
topic ?= python

help:
	@echo "make serve                                 Preview the site at http://localhost:4000"
	@echo "make drafts                                Preview including _drafts/ and future-dated posts"
	@echo "make draft  title=\"...\" [topic=python]     New draft in _drafts/ (no date yet)"
	@echo "make post   title=\"...\" [topic=python]     New essay in _posts/, dated today"
	@echo "make note   title=\"...\" [topic=python]     New note in notes/_posts/, dated today"
	@echo "make publish file=_drafts/<name>.md        Move a draft into _posts/, dated today"
	@echo "make build                                 Production build into _site/"
	@echo "Topics: python, agentic, careers, islam (see _config.yml)"

serve:
	bundle exec jekyll serve --livereload

drafts:
	bundle exec jekyll serve --livereload --drafts --future

define FRONT_MATTER
---
title: "$(title)"
topic: $(topic)
---

endef
export FRONT_MATTER

new-file = @test -n "$(title)" || (echo 'usage: make $@ title="My title"' && exit 1); \
	test ! -e "$(1)" || (echo "$(1) already exists" && exit 1); \
	mkdir -p "$(dir $(1))"; printf '%s\n' "$$FRONT_MATTER" > "$(1)"; echo "created $(1)"

draft:
	$(call new-file,_drafts/$(SLUG).md)

post:
	$(call new-file,_posts/$(TODAY)-$(SLUG).md)

note:
	$(call new-file,notes/_posts/$(TODAY)-$(SLUG).md)

publish:
	@test -f "$(file)" || (echo 'usage: make publish file=_drafts/name.md' && exit 1)
	@dest="_posts/$(TODAY)-$$(basename $(file))"; git mv "$(file)" "$$dest" 2>/dev/null || mv "$(file)" "$$dest"; echo "published $$dest"

build:
	JEKYLL_ENV=production bundle exec jekyll build

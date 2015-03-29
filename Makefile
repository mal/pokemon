# vars

PATH := $(shell npm bin):$(PATH)
FORMAT := $(basename $(notdir $(wildcard src/node/format/*.js)))

# args
ifdef msg
  message = -m '$(subst $(shell echo \'),'\'',$(msg))'
endif

# default

all: $(FORMAT)
force:

# aliases

$(FORMAT): %: pages/data/anime.%

# tasks

clean: reset
	rm -r pages/data

reset:
	rm -r tmp

update: all
	cd pages && \
	  git commit $(message) data && \
	  git push

# targets

node_modules: package.json
	npm install --production
	touch $@

pages:
	git clone -b gh-pages git@github.com:mal/pokemon.git pages

pages/data/%: tmp/raw.json force pages
	node src/node/index.js $(suffix $@) > $@

tmp:
	mkdir $@

tmp/raw.json: node_modules tmp
	xvfb-run atom-shell src/atom/index.js $@
	
.PHONY: clean force reset

# vars

PATH := $(shell npm bin):$(PATH)
FORMAT := $(basename $(notdir $(wildcard src/node/format/*.js)))

# default

default: json
force:

# aliases

$(FORMAT): %: out/anime.%

# tasks

clean: reset
	rm -r out

reset:
	rm data/raw.json

# targets

data/raw.json: node_modules
	xvfb-run atom-shell src/atom/index.js

node_modules: package.json
	npm install --production
	touch $@

out:
	mkdir out

out/%: data/raw.json force out
	node src/node/index.js $(suffix $@) > $@
	
.PHONY: clean force reset

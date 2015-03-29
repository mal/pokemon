# vars

PATH := $(shell npm bin):$(PATH)
FORMAT := $(basename $(notdir $(wildcard src/node/format/*.js)))

# default

default: $(FORMAT)
force:

# aliases

$(FORMAT): %: output/anime.%

# tasks

clean: reset
	rm -r output

reset:
	rm data/raw.json

# targets

node_modules: package.json
	npm install --production
	touch $@

output tmp:
	mkdir $@

output/%: tmp/raw.json force output
	node src/node/index.js $(suffix $@) > $@

tmp/raw.json: node_modules tmp
	xvfb-run atom-shell src/atom/index.js $@
	
.PHONY: clean force reset

# env

PATH := $(shell npm bin):$(PATH)

# default

default: out/anime.json

# tasks

clean:
	git clean -dnx

reset:
	rm data/raw.json

# targets

data/raw.json: node_modules
	xvfb-run atom-shell src/atom/index.js

node_modules:
	npm install --production

out:
	mkdir out

out/%: out data/raw.json
	node src/node/index.js $(suffix $@) > $@
	
.PHONY: clean reset

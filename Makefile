# vars

PATH := $(shell npm bin):$(PATH)
FORMAT := $(basename $(notdir $(wildcard src/node/format/*.js)))

MESSAGE = 'Update from source material' -e

# args
ifdef msg
  MESSAGE = '$(subst $(shell echo \'),'\'',$(msg))'
endif

# default

all: $(FORMAT)
force:

# aliases

$(FORMAT): %: pages/data/anime.%

# tasks

clean: reset
	rm -r node_modules

reset:
	rm -r tmp

serve:
	docker run -it -p 4000:4000 -v "$$PWD/pages":/srv/jekyll jekyll/pages jekyll serve

update: all
	cd pages && \
	  git commit -m $(MESSAGE) data && \
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
	DISPLAY=:0 electron src/atom/index.js $@
	
.PHONY: clean force reset serve update

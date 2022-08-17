SHELL := /bin/bash
# .PHONY: install install-and-serve
default: install-and-serve

h help:
	@egrep '^\S|^$$' Makefile

clean:
	rm -rf _site/ src/_site/ output/

install: clean
	sudo apt-get install ruby ruby-all-dev gem -yq >/dev/null 
	sudo gem install bundler >/dev/null
	sudo gem update >/dev/null
	bundle config
	bundle install >/dev/null 

install-and-serve: serve

build: clean
	act --container-architecture "linux/amd64" --secret-file ".secrets.local" --env-file ".env.local" --reuse -j build

test:
	# act -P ubuntu-latest=nektos/act-environments-ubuntu:18.04
	act --container-architecture "linux/amd64" --secret-file ".secrets.local" --env-file ".env.local" --reuse -j lint

s serve: clean
	# JEKYLL_ENV=development 
	bundle exec jekyll serve --incremental --verbose --trace

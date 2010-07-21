# Javascript/CSS Compressor Makefile - By Benjamin "balupton" Lupton (MIT Licenced)

MAKEFLAGS = --no-print-directory --always-make
MAKE = make $(MAKEFLAGS)

BUILDDIR = ./.build

CLOSUREURL = http://closure-compiler.googlecode.com/files/compiler-latest.zip
CLOSUREDIR = $(BUILDDIR)/closure
CLOSUREFILE = $(CLOSUREDIR)/compiler.jar
YUIURL = http://yuilibrary.com/downloads/yuicompressor/yuicompressor-2.4.2.zip
YUIDIR = $(BUILDDIR)/yui
YUIFILE = $(YUIDIR)/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar


all:
	$(MAKE) build;
	$(MAKE) add;


demo:
	open ./demo/index.html

add:
	git add .gitignore CHECKLIST.txt COPYING.txt demo Makefile README.txt scripts

push:
	git push --all ; git push --tags ;
	
edithooks:
	mate .git/hooks/pre-commit


refresh:
	wget -q http://github.com/balupton/jquery-sparkle/raw/master/scripts/resources/core.console.js -O scripts/resources/core.console.js ;


pack:
	cat \
		./scripts/resources/core.console.js \
		./scripts/resources/jquery.history.js \
		> ./scripts/jquery.history.js;

compress:
	java -jar $(CLOSUREFILE) --create_source_map ./scripts/closure.map --js_output_file=./scripts/jquery.history.min.js --js=./scripts/jquery.history.js;
	#java -jar $(YUIFILE) ./styles/jquery.history.css -o ./styles/jquery.history.min.css

build:
	$(MAKE) pack;
	$(MAKE) compress;
	
build-update:
	$(MAKE) clean;
	mkdir $(BUILDDIR) $(CLOSUREDIR) $(YUIDIR);
	cd $(CLOSUREDIR); wget -q $(CLOSUREURL) -O file.zip; tar -xf file.zip;
	cd $(YUIDIR); wget -q $(YUIURL) -O file.zip; tar -xf file.zip;
	
clean:
	rm -Rf $(BUILDDIR);
	
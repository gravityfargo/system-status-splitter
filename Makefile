# Basic Makefile
UUID = system-status-splitter@rmrfforewardslashstar
BASE_MODULES = convenience.js extension.js LICENSE menuItems.js metadata.json prefs.js README.md stylesheet.css 
INSTALLBASE = ~/.local/share/gnome-shell/extensions
INSTALLNAME = system-status-splitter@rmrfforewardslashstar

all: extension

clean:
	rm -f ./schemas/gschemas.compiled

extension: ./schemas/gschemas.compiled

./schemas/gschemas.compiled: ./schemas/org.gnome.shell.extensions.extend-panel-menu.gschema.xml
	glib-compile-schemas ./schemas/

install: install-local

install-local: build
	rm -rf $(INSTALLBASE)/$(INSTALLNAME)
	mkdir -p $(INSTALLBASE)/$(INSTALLNAME)
	cp -r ./_build/* $(INSTALLBASE)/$(INSTALLNAME)/
	-rm -fR _build
	echo done

build: all
	-rm -fR ./_build
	mkdir -p _build
	cp $(BASE_MODULES) _build
	mkdir -p _build/schemas
	cp schemas/*.xml _build/schemas/
	cp schemas/gschemas.compiled _build/schemas/
	mkdir -p _build/locale
	cp -r locale/* _build/locale/
	mkdir -p _build/icons
	cp -r icons/* _build/icons
	mkdir -p _build/indicators
	cp -r indicators/* _build/indicators

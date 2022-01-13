const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const { GObject, Gio, St, GLib, Clutter } = imports.gi;
const Util = imports.misc.util;
const Gettext = imports.gettext.domain("extend-panel-menu");
const _ = Gettext.gettext;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Mpris = imports.ui.mpris;
const Convenience = Me.imports.convenience;
const Shell = imports.gi.Shell;
const Vol = imports.ui.status.volume;

var VolumeIndicator = GObject.registerClass(
    class VolumeIndicator extends PanelMenu.Button {


        _init() {
            super._init(0.0, 'VolumeIndicator', false);
            this._settings = Convenience.getSettings();

            this.box = new St.BoxLayout({ style_class: 'panel-status-indicators-box' });
            this.add_child(this.box);

            //find, import, and show the stock volume icons.
            this._volume = new Vol.Indicator();
            this.box.add(this._volume);
            this.menu.addMenuItem(this._volume.menu);

            //seperator
            this.menu.addMenuItem( new PopupMenu.PopupSeparatorMenuItem() );

            //find, import and show the media copntrol section
            this._mediaSection = new Mpris.MediaSection();
            this._mediaSection.add_style_class_name("music-box");
            this.menu.box.add(this._mediaSection);

            // settings button
            let pmItem = new PopupMenu.PopupMenuItem(_('Sound Settings'));
            this.menu.addMenuItem(pmItem)
            pmItem.connect('activate', () => {
                log('clicked');
                Util.trySpawnCommandLine('gnome-control-center sound');
            });
        }
    }
);
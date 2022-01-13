const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const { GObject, Gio, St, GLib, Clutter } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

var NightLightIndicator = GObject.registerClass(
    class NightLightIndicator extends PanelMenu.Button {

        
        _init() {
            super._init(0.0, 'NightLightIndicator', false);
            let icon = new St.Icon({
                gicon: new Gio.ThemedIcon({name: 'weather-clear-night'}),
                style_class: 'system-status-icon'
            });
            this.add_child(icon);
        }

        destroy() {
            super.destroy();
        }
    }
);

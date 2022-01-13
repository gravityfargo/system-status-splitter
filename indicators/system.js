const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const { GObject, Gio, St, GLib, Clutter } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

var SystemIndicator = GObject.registerClass(
    class VolumeIndicator extends PanelMenu.Button {

        
        _init() {
            super._init(0.0, 'SystemIndicator', false);
            // panelButton = new St.Bin({
            //     style_class : "panel-button",
            // });
            let panelButtonText = new St.Label({
                text : "Username",
                y_align: Clutter.ActorAlign.CENTER,
            });
            this.add_child(panelButtonText);


            // let icon = new St.Icon({
            //     gicon: new Gio.ThemedIcon({name: 'user-available-symbolic'}),
            //     style_class: 'system-status-icon'
            // });
            // this.add_child(icon);
        }

        destroy() {
            super.destroy();
        }
    }
);

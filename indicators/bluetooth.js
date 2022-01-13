const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const { GObject, Gio, St, GLib, Clutter, GnomeBluetooth } = imports.gi;
const Main = imports.ui.main;
const Config = imports.misc.config;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Panel = imports.ui.panel;


var BluetoothIndicator = GObject.registerClass(
  class BluetoothIndicator extends PanelMenu.Button {
    _init() {
      super._init(0.0, C_("Bluetooth menu in the top bar", "System"), false);
      this.menu.actor.add_style_class_name('aggregate-menu');

      this._center = false;
      this.box = new St.BoxLayout({
          vertical: false,
          style_class: "panel-status-menu-box"
      });;
      this.add_child(this.box);      

      this._arrowIcon = new St.Icon({
        icon_name: "bluetooth-active-symbolic",
        style_class: "system-status-icon"
    });
    this.box.add_child(this._arrowIcon);


    this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
    let network = new PopupMenu.PopupMenuItem(_("Network Settings"));
    network.connect("activate", () => this._openApp("gnome-network-panel.desktop"));
    this.menu.addMenuItem(network);





    }

    destroy() {
      super.destroy();
    }
  }
);

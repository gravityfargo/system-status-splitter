const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const { GObject, Gio, St, GLib, Clutter } = imports.gi;
const Main = imports.ui.main;
const DateMenu = imports.ui.dateMenu;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Calendar = imports.ui.calendar;
const Mpris = imports.ui.mpris;



var NotificationIndicator = GObject.registerClass(
  class NotificationIndicator extends PanelMenu.Button {
    _init() {
      super._init(0.5, "NotificationIndicator", false);

      let hbox;
      this._indicator = new DateMenu.MessagesIndicator();

        const indicatorPad = new St.Widget();
        this._indicator.bind_property('visible',
            indicatorPad, 'visible',
            GObject.BindingFlags.SYNC_CREATE);
        indicatorPad.add_constraint(new Clutter.BindConstraint({
            source: this._indicator,
            coordinate: Clutter.BindCoordinate.SIZE,
        }));


        this.box = new St.BoxLayout({ style_class: 'clock-display-box' });
        this.box.add_actor(indicatorPad);
        this.box.add_actor(this._indicator);
        
        this.add_child(this.box);

        let layout = new DateMenu.FreezableBinLayout();
        let bin = new St.Widget({ layout_manager: layout });
        // For some minimal compatibility with PopupMenuItem
        bin._delegate = this;
        this.menu.box.add_child(bin)

        hbox = new St.BoxLayout({ name: 'calendarArea' });
        bin.add_actor(hbox);


        this._messageList = new Calendar.CalendarMessageList();
        this._messageList._sectionList.remove_actor(this._messageList._mediaSection);
        this._messageList._sectionList.remove_actor(this._messageList._mediaSection);
        //this._mediaSection = new Mpris.MediaSection();
        //this._mediaSectionParent = this._messageList._mediaSection.get_parent();
        this._messageList.remove_actor(this._messageList._placeholder)
        let icon = new St.Icon({
          gicon: new Gio.ThemedIcon({name: 'message-indicator-symbolic'}),
          style_class: 'system-status-icon'
      });
      this.box.add_child(icon);

        hbox.add_child(this._messageList);
    }
    

    destroy() {
      super.destroy();
    }
  }
);

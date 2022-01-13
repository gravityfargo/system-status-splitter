const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const { GObject, St, Clutter, GnomeDesktop, Pango } =
  imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const DateMenu = imports.ui.dateMenu;
const Calendar = imports.ui.calendar;
const Extension = imports.misc.extensionUtils.getCurrentExtension();
const System = imports.system;

var CalendarIndicator = GObject.registerClass(
  class CalendarIndicator extends PanelMenu.Button {
    _init() {
      super._init(0.5, "CalendarIndicator", false);
      let vbox;
      let boxLayout;

      //setup the label shown on the panel "Sun Jan 1 12:00"
      this._clockDisplay = new St.Label({ style_class: "clock" });
      this._clockDisplay.clutter_text.y_align = Clutter.ActorAlign.CENTER;
      this._clockDisplay.clutter_text.ellipsize = Pango.EllipsizeMode.NONE;

      this.label_actor = this._clockDisplay;
      this.add_style_class_name("clock-display");

      this.box = new St.BoxLayout({
        style_class: "panel-status-indicators-box",
      });
      this.add_actor(this._clockDisplay);

      let layout = new DateMenu.FreezableBinLayout();

      this._calendar = new Calendar.Calendar();
      this._calendar.connect("selected-date-changed", (_calendar, datetime) => {
        let date = DateMenu._gDateTimeToDate(datetime);
        layout.frozen = !DateMenu._isToday(date);
        this._eventsItem.setDate(date);
      });

      this._date = new DateMenu.TodayButton(this._calendar);
      this.menu.connect("open-state-changed", (menu, isOpen) => {
        // Whenever the menu is opened, select today
        //this updates the text above the calendar
        if (isOpen) {
          let now = new Date();
          this._calendar.setDate(now);
          this._date.setDate(now);
          this._eventsItem.setDate(now);
        }
      });

      boxLayout = new DateMenu.CalendarColumnLayout([
        this._calendar,
        this._date,
      ]);
      vbox = new St.Widget({
        style_class: "datemenu-calendar-column",
        layout_manager: boxLayout,
      });
      boxLayout.hookup_style(vbox);

      this._displaysSection = new St.ScrollView({
        style_class: "datemenu-displays-section vfade",
        x_expand: true,
        overlay_scrollbars: true,
      });
      this._displaysSection.set_policy(
        St.PolicyType.NEVER,
        St.PolicyType.EXTERNAL
      );

      let displaysBox = new St.BoxLayout({
        vertical: true,
        x_expand: true,
        style_class: "datemenu-displays-box",
      });

      vbox.add_actor(this._date);
      vbox.add_actor(this._calendar);

      this._eventsItem = new DateMenu.EventsSection();
      displaysBox.add(this._eventsItem);

      this._clocksItem = new DateMenu.WorldClocksSection();
      displaysBox.add(this._clocksItem);

      this._weatherItem = new DateMenu.WeatherSection();
      displaysBox.add(this._weatherItem);

      this._displaysSection.add_actor(displaysBox);
      vbox.add_actor(this._displaysSection);
      this.menu.box.add(vbox);

      //Syncs the panel label with system time
      this._clock = new GnomeDesktop.WallClock();
      this._clock.bind_property(
        "clock",
        this._clockDisplay,
        "text",
        GObject.BindingFlags.SYNC_CREATE
      );
      this._clock.connect("notify::timezone", this._updateTimeZone.bind(this));

      Main.sessionMode.connect("updated", this._sessionUpdated.bind(this));
      this._sessionUpdated();
    }

    _updateTimeZone() {
      System.clearDateCaches();
      this._calendar.updateTimeZone();
    }

    _getEventSource() {
      return new Calendar.DBusEventSource();
    }

    _sessionUpdated() {
      let eventSource;
      let showEvents = Main.sessionMode.showCalendarEvents;
      if (showEvents) eventSource = this._getEventSource();
      else eventSource = new Calendar.EmptyEventSource();

      this._setEventSource(eventSource);
      this._displaysSection.visible = Main.sessionMode.allowSettings;
    }

    _setEventSource(eventSource) {
      if (this._eventSource) this._eventSource.destroy();

      this._calendar.setEventSource(eventSource);
      this._eventsItem.setEventSource(eventSource);

      this._eventSource = eventSource;
    }
  }
);

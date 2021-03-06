//version gnomemajor.gnomeminor.extensionmajor.extensionminor
//version 3.38.1.1
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const { GObject, Gio, St, GLib, Clutter } = imports.gi;


const VolumeIndicator = Me.imports.indicators.volume.VolumeIndicator;
const SystemIndicator = Me.imports.indicators.system.SystemIndicator;
const PowerIndicator = Me.imports.indicators.power.PowerIndicator;
const NotificationIndicator = Me.imports.indicators.notification.NotificationIndicator;
const NightLightIndicator = Me.imports.indicators.nightlight.NightLightIndicator;
const NetworkIndicator = Me.imports.indicators.network.NetworkIndicator;
const CalendarIndicator = Me.imports.indicators.calendar.CalendarIndicator;
const BluetoothIndicator = Me.imports.indicators.bluetooth.BluetoothIndicator;

function init() {


}

var volume = null;
var system = null;
var power = null;
var notifications = null;
var nightlight = null;
var network = null;
var calendar = null;
var bluetooth = null;

function enable() {
        log("[System Status Splitter] Enabling");

        //Main.panel.statusArea['dateMenu'].container.hide();
        //Main.panel.statusArea.dateMenu.container.hide();
        //Main.panel._centerBox.remove_child(Main.panel.statusArea.dateMenu.container);

        volume = new VolumeIndicator();
        //system = new SystemIndicator();
        //power  = new PowerIndicator();
        notifications = new NotificationIndicator();
        //nightlight = new NightLightIndicator();
        network = new NetworkIndicator();
        bluetooth = new BluetoothIndicator();
        calendar = new CalendarIndicator();

        Main.panel.addToStatusArea("VolumeIndicator", volume, 0, 0);
        //Main.panel.addToStatusArea("SystemIndicator", system);
        //Main.panel.addToStatusArea("PowerIndicator", power);
        Main.panel.addToStatusArea("NotificationIndicator", notifications);
        //Main.panel.addToStatusArea("NightLightIndicator", nightlight);
        Main.panel.addToStatusArea("NetworkIndicator", network);
        Main.panel.addToStatusArea("BluetoothIndicator", bluetooth);
        Main.panel.addToStatusArea("CalendarIndicator", calendar);
        

}



function disable() {
    log("[System Status Splitter] Disabling");

    this.volume.destroy();
    // this.volume = null;
    // this.system.destroy();
    // this.system = null;
    // this.power.destroy();
    // this.power = null;
    this.notifications.destroy();
    // this.notifications = null;
    // this.nightlight.destroy();
    // this.nightlight = null;
    this.network.destroy();
    // this.network = null;
    this.bluetooth.destroy();
    this.calendar.destroy();
    //this.calendar = null;
}
















/* const Lang = imports.lang;


const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
const MenuItems = Me.imports.menuItems.MenuItems;
const CustomButton = Me.imports.indicators.button.CustomButton;
const PowerIndicator = Me.imports.indicators.power.PowerIndicator;
//const CalendarIndicator = Me.imports.indicators.calendar.CalendarIndicator;
//const NetworkIndicator = Me.imports.indicators.network.NetworkIndicator;
//const NightLightIndicator = Me.imports.indicators.nightlight.NightLightIndicator;
//const NotificationIndicator = Me.imports.indicators.notification.NotificationIndicator;
//const UserIndicator = Me.imports.indicators.system.UserIndicator;
//const VolumeIndicator = Me.imports.indicators.volume.VolumeIndicator;



let settings;
let menuItems;
let indicators;
let settingsChanged;
let power;
//let nightlight;
//let volume;
//let network;
//let calendar;
//let user;
//let notification;

const CENTER_BOX = Main.panel._centerBox;
const RIGHT_BOX = Main.panel._rightBox;


function init() {
    //lol translations are a low prioirity
    //Convenience.initTranslations("extend-panel-menu");
}

function enable() {
    //Main.panel.statusArea.aggregateMenu.container.hide();
    //Main.panel.statusArea.dateMenu.container.hide();
    //Main.panel._centerBox.remove_child(Main.panel.statusArea.dateMenu.container);
    
    power = new PowerIndicator();
    //network = new NetworkIndicator();
    //volume = new VolumeIndicator();
    //calendar = new CalendarIndicator();
    //notification = new NotificationIndicator();
    //user = new UserIndicator();
    //nightlight = new NightLightIndicator();

    Main.panel.addToStatusArea(power.name, power, 0, "right");
    //Main.panel.addToStatusArea(notification.name, notification, 0, "right");
    //Main.panel.addToStatusArea(user.name, user, 0, "right");
    //Main.panel.addToStatusArea(calendar.name, calendar, 0, "right");
    //Main.panel.addToStatusArea(network.name, network, 0, "right");
    //Main.panel.addToStatusArea(volume.name, volume, 0, "right");\
    //Main.panel.addToStatusArea(nightlight.name, nightlight, 0, "right");

    //Load Settings
    settings = Convenience.getSettings();
    menuItems = new MenuItems(settings);
    settingsChanged = new Array();
    let i = 0;
    settingsChanged[i++] = settings.connect("changed::items", applySettings);
    settingsChanged[i++] = settings.connect("changed::tray-offset", applySettings);
    settingsChanged[i++] = settings.connect("changed::spacing", changeSpacing);
    settingsChanged[i++] = settings.connect("changed::autohide-on-full-power", changeFullPowerHide);
    settingsChanged[i++] = settings.connect("changed::autohide-on-percent", changePowerHide);
    settingsChanged[i++] = settings.connect("changed::autohide-when-percent", changePowerHide);
    settingsChanged[i++] = settings.connect("changed::autohide-power-icon-label", changePowerHide);
    //settingsChanged[i++] = settings.connect("changed::username-text", changeUsername);
    //settingsChanged[i++] = settings.connect("changed::user-icon", changeUsericon);
    //settingsChanged[i++] = settings.connect("changed::date-format", changeDateformat);
    //settingsChanged[i++] = settings.connect("changed::autohide-notification", changeAutohide);
    //settingsChanged[i++] = settings.connect("changed::always-show-nightlight", changeNightLight);

    applySettings();
    changeSpacing();
    changeFullPowerHide();
    changePowerHide();
    //changeUsername();
    //changeUsericon();
    //changeDateformat();
    //changeAutohide();
    //changeNightLight();
}

function applySettings() {
    let enabled = menuItems.getEnableItems();
    let center = menuItems.getCenterItems();
    indicators = new Array(enabled.length);

    removeAll();
    setup(enabled, center, indicators, "power", power);
    //setup(enabled, center, indicators, "user", user);
    //setup(enabled, center, indicators, "volume", volume);
    //setup(enabled, center, indicators, "network", network);
    //setup(enabled, center, indicators, "notification", notification);
    //setup(enabled, center, indicators, "calendar", calendar);
    //setup(enabled, center, indicators, "nightlight", nightlight);

    let rightchildren = RIGHT_BOX.get_children().length;
    let centerchildren = CENTER_BOX.get_children().length;

    let spacing = settings.get_int("spacing");
    let offset = settings.get_int("tray-offset");

    indicators.reverse().forEach(function (item) {
        item.set_spacing(spacing);
        if (item._center) {
            CENTER_BOX.insert_child_at_index(item.container, centerchildren);
        } else {
            RIGHT_BOX.insert_child_at_index(item.container, rightchildren - offset);
        }
    });

}

function changeSpacing() {
    let spacing = settings.get_int("spacing");
    indicators.forEach(function (item) {
        item.set_spacing(spacing);
    });
}

function changeFullPowerHide() {
    let hideOnFull = settings.get_boolean("autohide-on-full-power");
    power.setHideOnFull(hideOnFull);
}

function changePowerHide() {
    let hideOnPercent = settings.get_boolean("autohide-on-percent");
    let hideWhenPercent = settings.get_int("autohide-when-percent");
    let hideElements = settings.get_int("autohide-power-icon-label");
    power.setHideOnPercent(hideOnPercent, hideWhenPercent, hideElements);
}

function changeUsername() {
    let username = settings.get_string("username-text");
    user.changeLabel(username);
}

function changeUsericon() {
    let enableUserIcon = settings.get_boolean("user-icon");
    user.changeIcon(enableUserIcon);
}

function changeDateformat() {
    let dateformat = settings.get_string("date-format");
    calendar.override(dateformat);
}

function changeAutohide() {
    let autoHideNotification = settings.get_boolean("autohide-notification");
    notification.setHide(autoHideNotification);
}

function changeNightLight() {
    let status = settings.get_boolean("always-show-nightlight");
    nightlight._alwaysShow(status);
}

function removeAll() {
    removeContainer(power);
    //removeContainer(volume);
    //removeContainer(network);
    //removeContainer(user);
    //removeContainer(calendar);
    //removeContainer(notification);
    //removeContainer(nightlight);
}

function setup(enabledItems, centerItems, arrayIndicators, name, indicator) {
    let index = enabledItems.indexOf(name);
    let valid = index != -1;
    if (valid) {
        arrayIndicators[index] = indicator;
        arrayIndicators[index]._center = centerItems.indexOf(name) != -1;
    }
}

function removeContainer(item) {
    if (item._center) {
        CENTER_BOX.remove_child(item.container)
    } else {
        RIGHT_BOX.remove_child(item.container);
    }
    item._center = false;
}

function disable() {
    settingsChanged.forEach(function (item) {
        settings.disconnect(item);
    });
    settingsChanged = null;
    settings = null;


    power.destroy();
    //volume.destroy();
    //network.destroy();
    //user.destroy();
    //calendar.destroy();
    //notification.destroy();
    //nightlight.destroy();

    //Main.panel.statusArea.aggregateMenu.container.show();
    //Main.panel.statusArea.dateMenu.container.show();
    //Main.panel._centerBox.add_child(Main.panel.statusArea.dateMenu.container);
} */
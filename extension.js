// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

const Clutter = imports.gi.Clutter;
const St = imports.gi.St;
const Main = imports.ui.main;

let button;
let extension_icon;
let mute;
let muteLevels = [0.8, 1.0, 0.0];
let i; // index into muteLevels

function _cycleMuteLevel() {
    mute.set_factor(muteLevels[i]);
    i = (i+1) % muteLevels.length;

    // Reapply
    if (Main.uiGroup.has_effects(mute)) {
        Main.uiGroup.remove_effect(mute);
    }
    Main.uiGroup.add_effect(mute);
}


function init() {
    //Creation of button
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    extension_icon = new St.Icon({ icon_name: 'applications-graphics-symbolic',
                                   style_class: 'system-status-icon' });
    button.set_child(extension_icon);

    //Creation of effect
    mute = new Clutter.DesaturateEffect();
    i = 0;
    mute.set_factor(muteLevels[i]);

    //Signal connection
    button.connect('button-press-event', _cycleMuteLevel);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}

import { COLOR_LIGHT, COLOR_PRIMARY, COLOR_DARK } from './Const.js';
import CreateItemsBox from './CreateItemsBox.js';

var CreateColumnPanel = function (scene, title, itemCount) {
    var panel = scene.rexUI.add.dialog({
        width: 120,

        space: { left: 10, right: 10, top: 10, bottom: 10 },

        background: scene.rexUI.add.roundRectangle({
            strokeColor: COLOR_DARK,
        }),

        title: CreateTitle(scene, title),
        content: CreateItemsBox(scene, itemCount),

        proportion: {
            content: 1
        }
    })

    SetDraggable(panel);

    return panel;
}

var CreateTitle = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            color: COLOR_LIGHT
        }),

        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),

        align: 'left',
        space: {
            left: 5, right: 5, top: 5, bottom: 5,
        },

    })
}

var SetDraggable = function (panel) {
    // Drag panel by title element
    panel
        .setDraggable('title', panel)

        // Change appearance of panel
        .on('sizer.dragstart', OnPanelDragStart, panel)
        .on('sizer.dragend', OnPanelDragEnd, panel)
}

var OnPanelDragStart = function () {
    this.setDepth(1);
    this.getElement('background').setStrokeStyle(3, 0xff0000);
}

var OnPanelDragEnd = function () {
    this.setDepth(0);
    this.getElement('background').setStrokeStyle(2, COLOR_DARK);
}

export default CreateColumnPanel;
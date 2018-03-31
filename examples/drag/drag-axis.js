'use strict'

import DragPlugin from './../../plugins/drag-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

        this.img;
        this.text;
    }

    preload() {
        this.load.image('arrow', 'assets/images/arrow.png');
    }

    create() {
        this.img = this.add.image(400, 300, 'arrow');
        this.img.drag = new DragPlugin(this.img, {
            //enable: true,
            axis: 1,
            rotation: Phaser.Math.DegToRad(45)
        });

        this.text = this.add.text(100, 100, '');
    }

    update() {
        this.text.setText(this.img.drag.isDragging? 'Dragging':'--');
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);
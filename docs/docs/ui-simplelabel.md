## Introduction

Using json style to create [label](ui-label.md) composed of [round-rectangle](shape-roundrectangle.md) background, [image](image.md) icon, [BBCodeText](bbcodetext.md) text, [image](image.md) action.

- Author: Rex
- Game object

## Live demos

- [Style](https://codepen.io/rexrainbow/pen/vYaPwwq)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-simplelabel)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add label object
    ```javascript
    var label = scene.rexUI.add.simpleLabel(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add label object
    ```javascript
    var label = scene.rexUI.add.simpleLabel(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { SimpleLabel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add label object
    ```javascript    
    var label = new SimpleLabel(scene, config);
    scene.add.existing(label);
    ```

### Add label object

```javascript
var label = scene.rexUI.add.simpleLabel({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,

    orientation: 0,
    // rtl: false,

    background: {
        radius: 0,
        // radius: {tl: {x,y}, tr: {x,y}, bl: {x,y}, br: {x,y}}
    
        color: undefined,
        alpha: undefined,
        strokeColor: undefined,
        strokeAlpha: undefined,
        strokeWidth: undefined,
    },
    
    // iconMask: false,
    // squareFitIcon: false,
    // iconSize: undefined, iconWidth: undefined, iconHeight: undefined,

    text: {
        fontFamily: 'Courier',
        fontSize: '16px',
        fontStyle: '',
        backgroundColor: null,
        color: '#fff',
        stroke: '#fff',
        strokeThickness: 0,
        shadow: {
            offsetX: 0,
            offsetY: 0,
            color: '#000',
            blur: 0,
            stroke: false,
            fill: false
        },                  
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        // more text styles
    },

    // actionMask: false,
    // squareFitAction: false,
    // actionSize: undefined, actionWidth: undefined, actionHeight: undefined,

    space: {
        left: 0, right: 0, top: 0, bottom:0, 
        icon: 0, text: 0
    }

    align: undefined,

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
});
```

### Reset display content

```javascript
label.resetDisplayContent({
    text: '',

    icon: undefined, iconFrame: undefined,
    iconSize: undefined,

    action: undefined, actionFrame: undefined,
    actionSize: undefined,

});
```

- `text` : Set text string.
- `icon`, `iconFrame` : Set texture of icon game object.
    - `undefined`, or `null` : Hide icon game object.
- `iconSize` : Set display size of icon game object.
- `action`, `actionFrame` : Set texture of action game object.
    - `undefined`, or `null` : Hide action game object.
- `actionSize` : Set display size of action game object.

### Layout children

Arrange position of all elements.

```javascript
label.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

### Other properties

See [label](ui-label.md), [sizer object](ui-sizer.md), [base sizer object](ui-basesizer.md), [container-lite](containerlite.md).
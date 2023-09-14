/* 
Sample JigsawPiece, draw to FrameManager
*/

import DrawPieceMask from './DrawPieceMask.js';

class JigsawPiece extends Phaser.GameObjects.RenderTexture {
    constructor(scene, {
        width, height,
        edgeWidth, edgeHeight,
        key,
    }) {
        super(scene, 0, 0, width, height);

        this.setBaseKey(key);

        if (edgeWidth === undefined) {
            edgeWidth = width / 7;
        }
        this.edgeWidth = edgeWidth;
        if (edgeHeight === undefined) {
            edgeHeight = height / 7;
        }
        this.edgeHeight = edgeHeight;

        var maskGraphics = scene.make.graphics({ add: false });
        this.setMask(maskGraphics.createGeometryMask());
        this.maskGraphics = maskGraphics;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);

        this.maskGraphics.destroy();
        this.maskGraphics = undefined;

    }

    setBaseKey(key) {
        this.baseKey = key;
        return this;
    }

    drawPiece({
        scrollX, scrollY,
        edgeMode,
        drawMaskCallback = DrawPieceMask
    }) {
        // Convert string to plain object
        if (typeof (edgeMode) === 'string') {
            edgeMode = edgeMode.split('').map(function (x) { return parseInt(x) });
            edgeMode = {
                right: edgeMode[0],
                bottom: edgeMode[1],
                left: edgeMode[2],
                top: edgeMode[3]
            }
        }

        this.clear().fill(0x333333);

        this.camera.setScroll(scrollX, scrollY);

        this.stamp(this.baseKey, undefined, 0, 0, {
            originX: 0, originY: 0,
        });

        this.camera.setScroll(0, 0);

        drawMaskCallback(this.maskGraphics, this.width, this.height, this.edgeWidth, this.edgeHeight, edgeMode);

        return this;
    }
}

export default JigsawPiece;
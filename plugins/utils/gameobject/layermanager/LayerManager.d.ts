import GOManager from '../gomanager/GOManager';

export default LayerManager;

declare namespace LayerManager {
    interface IConfig {
        layers?: string[];

        createGameObject?: GOManager.CreateGameObjectCallbackType,
    }
}

declare class LayerManager extends GOManager {
    constructor(
        scene: Phaser.Scene,
        config?: LayerManager.IConfig
    )
    constructor(
        scene: Phaser.Scene,
        config?: string[]
    )

    getLayer(name: string): Phaser.GameObjects.Layer;

    getLayers(out?: Phaser.GameObjects.GameObject[]): Phaser.GameObjects.Layer[];

    addToLayer(
        name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    removeFromLayer(
        name: string,
        gameObject: Phaser.GameObjects.GameObject,
        addToScene?: boolean
    ): this;

    clearLayer(
        name: string,
        destroyChildren?: boolean
    ): this;
}
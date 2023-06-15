import { EventEmitter } from 'eventemitter3';

export default EventSheetManager;

declare namespace EventSheetManager {
    interface IConfig {
        commandExecutor?: Object,
        parallel?: boolean,
    }
}

declare class EventSheetManager extends EventEmitter {
    constructor(config?: EventSheetManager.IConfig);

    readonly memory: { [key: string]: any };

    setTaskHandlers(commandExecutor?: Object): this;

    addEventSheet(
        content?: string,
        config?: any,
        groupName?: string
    ): this;

    clearAllEventSheets(groupName?: string): this;

    getEventSheetTitleList(groupName?: string): string[];

    removeEventSheet(title: string, groupName?: string): this;

    dumpTrees(groupName?: string): Object[];

    loadTrees(data: Object[], groupName?: string): this;

    setData(key: string, value: any): this;

    hasData(key: string): this;

    toggleData(key: string): this;

    getData(key: string): any;

    dumpState(includeTree?: boolean, groupName?: string): Object;

    loadState(state: Object, groupName?: string): this;

    evalExpression(expression: any): any;

    renderString(template: string): string;

    start(groupName?: string): this;

    stop(groupName?: string): this;
}
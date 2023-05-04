import EventSheetTrees from '../eventsheettrees/EventSheetTrees.js';
import Marked2Tree from './methods/Marked2Tree.js';

class MarkedEventSheets extends EventSheetTrees {
    constructor({
        taskHandlers
    } = {}) {
        super({ taskHandlers });
    }

    addEventSheet(markedString, {
        lineReturn = '\\'
    } = {}) {

        var tree = Marked2Tree(markedString, { lineReturn });
        this.addTree(tree);
        return this;
    }
}

export default MarkedEventSheets;
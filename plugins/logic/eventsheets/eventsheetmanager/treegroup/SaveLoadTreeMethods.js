import CustomNodeMapping from '../nodes/CustomNodeMapping.js';
import { BehaviorTree, RUNNING } from '../../../behaviortree/index.js';
import DeepClone from '../../../../utils/object/DeepClone.js';

export default {
    dumpTrees() {
        return this.trees.map(function (tree) {
            return tree.dump()
        })
    },

    loadTrees(data) {
        data.forEach(function (treeData) {
            var tree = new BehaviorTree({
                id: treeData.id,
                title: treeData.title,
                properties: DeepClone(treeData.properties),
            });
            tree.load(treeData, CustomNodeMapping);
            this.trees.push(tree);
        }, this);
        return this;
    },
}
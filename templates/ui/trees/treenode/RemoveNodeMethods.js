export default {
    removeNode(gameObject, destroyChild) {
        if (!gameObject) {
            return this;
        }

        var treeParent = this.getTreePatent(gameObject);
        if (!treeParent) {
            return this;
        }

        gameObject.rexSizer.treeParent = null;

        var childrenSizer = treeParent.childrenMap.child;
        childrenSizer.remove(gameObject, destroyChild);
        return this;
    },

    removeAllNodes(destroyChild) {
        var childrenSizer = this.childrenMap.child;

        var nodes = childrenSizer.childrenMap.items;
        for (var i = 0, cnt = nodes.length; i < cnt; i++) {
            nodes[i].rexSizer.treeParent = null;
        }

        childrenSizer.removeAll(destroyChild);
        return this;
    }
}
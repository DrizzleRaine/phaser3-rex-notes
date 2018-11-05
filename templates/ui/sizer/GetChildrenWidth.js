var GetChildrenWidth = function () {
    if (!this.visible) {
        return 0;
    }

    var result = 0;
    var children = this.sizerChildren;
    var child, padding, childWidth;
    if (this.orientation === 0) { // x
        // Get summation of minimum width
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            // Skip invisible child
            if (!child.visible) {
                continue;
            }

            if (child.rexSizer.proportion === 0) {
                childWidth = (child.isRexSizer) ? child.childrenWidth : child.width;
            } else {
                childWidth = 0;
            }
            padding = child.rexSizer.padding;
            childWidth += (padding.left + padding.right);
            result += childWidth;
        }
    } else {
        // Get maximun width
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (!child.hasOwnProperty('rexSizer')) {
                continue;
            }
            // Skip invisible child
            if (!child.visible) {
                continue;
            }

            childWidth = (child.isRexSizer) ? child.childrenWidth : child.width;
            padding = child.rexSizer.padding;
            childWidth += (padding.left + padding.right);
            result = Math.max(childWidth, result);
        }
    }
    result = Math.max(result, this.minWidth);
    return result;
}

export default GetChildrenWidth;
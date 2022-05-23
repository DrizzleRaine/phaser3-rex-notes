import MergeStyle from './utils/MergeStyle.js';
import Label from '../../label/Label.js';
import CreateChild from './utils/CreateChild.js';

var CreateLabel = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', view, styles, customBuilders);
    CreateChild(scene, data, 'icon', view, styles, customBuilders);
    CreateChild(scene, data, 'text', view, styles, customBuilders);
    CreateChild(scene, data, 'action', view, styles, customBuilders);

    var gameObject = new Label(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateLabel;
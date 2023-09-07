import InputFiledBase from './InputFieldBase.js';
import CreateInputTextArea from '../../../utils/build/CreateInputTextArea.js';

class TextAreaInput extends InputFiledBase {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        super(scene);
        this.type = 'rexTweaker.TextAreaInput';

        var inputTextAreaConfig = config.inputTextArea;
        if (inputTextAreaConfig === undefined) {
            inputTextAreaConfig = {};
        }
        if (!inputTextAreaConfig.hasOwnProperty('text')) {
            inputTextAreaConfig.text = config.inputText;
        }
        if (!inputTextAreaConfig.hasOwnProperty('slider')) {
            inputTextAreaConfig.slider = config.slider;
        }

        var inputText = CreateInputTextArea(scene, inputTextAreaConfig);

        this.add(
            inputText,
            { proportion: 1, expand: true }
        )

        this.addChildrenMap('inputText', inputText);

        inputText.on('close', function () {
            this.setValue(inputText.value);
        }, this);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }
        if (!this.validate(value)) {
            value = this._value;  // Back to previous value
        }

        var text = (this.textFormatCallback) ? this.textFormatCallback(value) : value;
        this.childrenMap.inputText.setText(text);
        super.value = value;  // Fire 'valuechange' event
    }

    setInputTextReadOnly(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.childrenMap.inputText.setReadOnly(enable);
        return this;
    }
}

export default TextAreaInput;
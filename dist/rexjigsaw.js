(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexjigsaw = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var GameClass = Phaser.Game;
  var IsGame = function IsGame(object) {
    return object instanceof GameClass;
  };

  var SceneClass = Phaser.Scene;
  var IsSceneObject = function IsSceneObject(object) {
    return object instanceof SceneClass;
  };

  var GetGame = function GetGame(object) {
    if (object == null || _typeof(object) !== 'object') {
      return null;
    } else if (IsGame(object)) {
      return object;
    } else if (IsGame(object.game)) {
      return object.game;
    } else if (IsSceneObject(object)) {
      // object = scene object
      return object.sys.game;
    } else if (IsSceneObject(object.scene)) {
      // object = game object
      return object.scene.sys.game;
    }
  };

  var GetWhiteFrame = function GetWhiteFrame(game) {
    return GetGame(game).textures.getFrame('__WHITE');
  };

  var DynamicTextureClearRectangle = function DynamicTextureClearRectangle(texture, x, y, width, height) {
    if (WhiteFrameWidth === undefined) {
      var whiteFrame = GetWhiteFrame(texture.manager.game);
      WhiteFrameWidth = whiteFrame.cutWidth;
      WhiteFrameHeight = whiteFrame.cutHeight;
    }
    texture.stamp('__WHITE', undefined, x, y, {
      scaleX: width / WhiteFrameWidth,
      scaleY: height / WhiteFrameHeight,
      originX: 0,
      originY: 0,
      erase: true
    });
    return texture;
  };
  var WhiteFrameWidth;
  var WhiteFrameHeight;

  var Draw = function Draw(frameName, callback, scope) {
    var index = this.getFrameIndex(frameName);
    if (index === -1) {
      index = this.getFrameIndex(undefined);
    }
    if (index === -1) {
      console.warn('Does not have free space.');
      return this;
    }
    var tl = this.getTopLeftPosition(index),
      x = tl.x,
      y = tl.y;
    var frameSize = {
      width: this.cellWidth,
      height: this.cellHeight
    };
    var drawCallback = this.useDynamicTexture ? DrawDynamicTexture : DrawCanvasTexture;
    drawCallback.call(this, x, y, frameSize, callback, scope);
    // frameSize might be changed

    this.texture.add(frameName, 0, x, y, frameSize.width, frameSize.height);
    this.addFrameName(index, frameName);
    return this;
  };
  var DrawCanvasTexture = function DrawCanvasTexture(x, y, frameSize, callback, scope) {
    var context = this.context;
    context.save();
    context.translate(x, y);

    // Clear cell
    context.clearRect(0, 0, frameSize.width, frameSize.height);

    // Draw cell
    if (scope) {
      callback.call(scope, this.canvas, context, frameSize);
    } else {
      callback(this.canvas, context, frameSize);
    }
    // frameSize might be changed

    context.restore();
  };
  var DrawDynamicTexture = function DrawDynamicTexture(x, y, frameSize, callback, scope) {
    var texture = this.texture;

    // Clear cell
    DynamicTextureClearRectangle(texture, x, y, frameSize.width, frameSize.height);

    // Draw cell
    texture.camera.setScroll(-x, -y);
    if (scope) {
      callback.call(scope, texture, frameSize);
    } else {
      callback(texture, frameSize);
    }
    texture.camera.setScroll(0, 0);
    // frameSize might be changed
  };

  var GetDisplayWidth = function GetDisplayWidth(gameObject) {
    if (gameObject.displayWidth !== undefined) {
      return gameObject.displayWidth;
    } else {
      return gameObject.width;
    }
  };
  var GetDisplayHeight = function GetDisplayHeight(gameObject) {
    if (gameObject.displayHeight !== undefined) {
      return gameObject.displayHeight;
    } else {
      return gameObject.height;
    }
  };

  var Paste = function Paste(frameName, gameObject) {
    var drawCallback;
    if (this.useDynamicTexture) {
      var srcWidth = GetDisplayWidth(gameObject),
        srcHeight = GetDisplayHeight(gameObject);
      var scale;
      if (srcWidth <= this.cellWidth && srcHeight <= this.cellHeight) {
        scale = 1;
      } else {
        // Scale down and keep ratio
        scale = Math.max(srcWidth / this.cellWidth, srcHeight / this.cellHeight);
      }
      drawCallback = function drawCallback(texture, frameSize) {
        var originXSave = gameObject.originX,
          originYSave = gameObject.originY;
        var scaleXSave = gameObject.scaleX,
          scaleYSave = gameObject.scaleY;
        gameObject.setOrigin(0, 0).setScale(scale, scale);
        texture.draw(gameObject);
        gameObject.setOrigin(originXSave, originYSave).setScale(scaleXSave, scaleYSave);
        frameSize.width = srcWidth / scale;
        frameSize.height = srcHeight / scale;
      };
    } else {
      var srcCanvas = gameObject.canvas;
      if (!srcCanvas) {
        console.warn("Can't get canvas of game object.");
        return this;
      }
      var srcWidth = srcCanvas.width,
        srcHeight = srcCanvas.height;
      var dWidth, dHeight;
      if (srcWidth <= this.cellWidth && srcHeight <= this.cellHeight) {
        dWidth = srcWidth;
        dHeight = srcHeight;
      } else {
        // Scale down and keep ratio
        var scale = Math.max(srcWidth / this.cellWidth, srcHeight / this.cellHeight);
        dWidth = srcWidth / scale;
        dHeight = srcHeight / scale;
      }
      drawCallback = function drawCallback(canvas, context, frameSize) {
        context.drawImage(srcCanvas, 0, 0, dWidth, dHeight);
        frameSize.width = dWidth;
        frameSize.height = dHeight;
      };
    }
    this.draw(frameName, drawCallback);
    return this;
  };

  var AddEmptyFrame = function AddEmptyFrame(frameName, width, height) {
    if (width === undefined) {
      width = this.cellWidth;
    }
    if (height === undefined) {
      height = this.cellHeight;
    }
    var drawCallback;
    if (this.useDynamicTexture) {
      drawCallback = function drawCallback(texture, frameSize) {
        frameSize.width = width;
        frameSize.height = height;
      };
    } else {
      drawCallback = function drawCallback(canvas, context, frameSize) {
        frameSize.width = width;
        frameSize.height = height;
      };
    }
    this.draw(frameName, drawCallback);
    return this;
  };

  var RemoveMethods = {
    // Remove a frame
    remove: function remove(frameName) {
      var index = this.getFrameIndex(frameName);
      if (index === -1) {
        return this;
      }
      this.addFrameName(index, undefined);
      this.texture.remove(frameName);

      // Don't clear canvas

      return this;
    },
    // Remove all frames
    clear: function clear() {
      for (var i, cnt = this.frameNames.length; i < cnt; i++) {
        var frameName = this.frameNames[i];
        if (frameName !== undefined) {
          this.addFrameName(index, undefined);
          this.texture.remove(frameName);
        }
      }
      return this;
    }
  };

  var AddToBitmapFont = function AddToBitmapFont() {
    var textureKey = this.texture.key;
    // Don't add a new font data, reuse current font data
    var cacheData = this.bitmapFontCache.get(textureKey);
    if (!cacheData) {
      cacheData = {
        data: {
          retroFont: true,
          font: textureKey,
          size: this.cellWidth,
          lineHeight: this.cellHeight,
          chars: {}
        },
        texture: textureKey,
        frame: null
      };
      this.bitmapFontCache.add(textureKey, cacheData);
    }
    var charData = cacheData.data.chars;
    var letters = this.frameNames;
    for (var i = 0, cnt = letters.length; i < cnt; i++) {
      var _char = letters[i];
      if (_char === undefined) {
        continue;
      }
      var frame = this.texture.get(_char);
      var x = frame.cutX,
        y = frame.cutY,
        width = frame.cutWidth,
        height = frame.cutHeight;
      charData[_char.charCodeAt(0)] = {
        x: x,
        y: y,
        width: width,
        height: height,
        centerX: x + width / 2,
        centerY: y + height / 2,
        xOffset: 0,
        yOffset: 0,
        xAdvance: width,
        data: {},
        kerning: {},
        u0: frame.u0,
        v0: frame.v0,
        u1: frame.u1,
        v1: frame.v1
      };
    }
    return this;
  };

  var methods = {
    draw: Draw,
    paste: Paste,
    addEmptyFrame: AddEmptyFrame,
    addToBitmapFont: AddToBitmapFont
  };
  Object.assign(methods, RemoveMethods);

  var CreateTexture = function CreateTexture(game, key, width, height, useDynamicTexture) {
    game = GetGame(game);
    if (useDynamicTexture === undefined) {
      useDynamicTexture = false;
    }
    var textureManager = game.textures;
    if (textureManager.exists(key)) {
      textureManager.remove(key);
    }
    return textureManager[useDynamicTexture ? 'addDynamicTexture' : 'createCanvas'](key, width, height);
  };

  var IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  var GetValue = Phaser.Utils.Objects.GetValue;
  var FrameManager = /*#__PURE__*/function () {
    function FrameManager(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture) {
      _classCallCheck(this, FrameManager);
      if (IsPlainObject(key)) {
        var config = key;
        key = GetValue(config, 'key');
        width = GetValue(config, 'width');
        height = GetValue(config, 'height');
        cellWidth = GetValue(config, 'cellWidth');
        cellHeight = GetValue(config, 'cellHeight');
        fillColor = GetValue(config, 'fillColor');
        useDynamicTexture = GetValue(config, 'useDynamicTexture');
      } else {
        if (typeof fillColor === 'boolean') {
          useDynamicTexture = fillColor;
          fillColor = undefined;
        }
      }
      if (width === undefined) {
        width = 4096;
      }
      if (height === undefined) {
        height = 4096;
      }
      if (cellWidth === undefined) {
        cellWidth = 64;
      }
      if (cellHeight === undefined) {
        cellHeight = 64;
      }
      if (useDynamicTexture === undefined) {
        useDynamicTexture = false;
      }
      var game = GetGame(scene);
      this.useDynamicTexture = useDynamicTexture;
      this.texture = CreateTexture(game, key, width, height, useDynamicTexture);
      this.canvas = useDynamicTexture ? undefined : this.texture.getCanvas();
      this.context = useDynamicTexture ? undefined : this.texture.getContext();
      this.bitmapFontCache = game.cache.bitmapFont;
      if (fillColor !== undefined) {
        if (useDynamicTexture) {
          this.texture.fill(fillColor);
        } else {
          var context = this.context;
          context.fillStyle = fillColor;
          context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
      this.key = key;
      this.width = width;
      this.height = height;
      this.cellWidth = cellWidth;
      this.cellHeight = cellHeight;
      this.columnCount = Math.floor(width / cellWidth);
      this.rowCount = Math.floor(height / cellHeight);
      this.totalCount = this.columnCount * this.rowCount;
      this.frameNames = Array(this.totalCount);
      for (var i = 0, cnt = this.frameNames.length; i < cnt; i++) {
        this.frameNames[i] = undefined;
      }
    }
    _createClass(FrameManager, [{
      key: "destroy",
      value: function destroy() {
        this.texture = undefined;
        this.canvas = undefined;
        this.context = undefined;
        this.frameNames = undefined;
        this.bitmapFontCache = undefined;
      }
    }, {
      key: "getFrameIndex",
      value: function getFrameIndex(frameName) {
        return this.frameNames.indexOf(frameName);
      }
    }, {
      key: "contains",
      value: function contains(frameName) {
        return this.getFrameIndex(frameName) !== -1;
      }
    }, {
      key: "addFrameName",
      value: function addFrameName(index, frameName) {
        this.frameNames[index] = frameName;
        return this;
      }
    }, {
      key: "isFull",
      get: function get() {
        return this.getFrameIndex(undefined) === -1;
      }
    }, {
      key: "getTopLeftPosition",
      value: function getTopLeftPosition(frameIndex, out) {
        if (out === undefined) {
          out = {};
        }
        var columnIndex = frameIndex % this.columnCount;
        var rowIndex = Math.floor(frameIndex / this.columnCount);
        out.x = columnIndex * this.cellWidth;
        out.y = rowIndex * this.cellHeight;
        return out;
      }
    }, {
      key: "updateTexture",
      value: function updateTexture() {
        if (this.useDynamicTexture) ; else {
          this.texture.refresh();
        }
        return this;
      }
    }]);
    return FrameManager;
  }();
  Object.assign(FrameManager.prototype, methods);

  var RandomPieceEdges = function RandomPieceEdges(columns, rows) {
    var edges = [];
    for (var c = 0; c < columns; c++) {
      edges.push(new Array(rows));
    }
    var left, right, top, bottom;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < columns; c++) {
        // left
        if (c === 0) {
          left = 0;
        } else {
          var neighborEdge = edges[c - 1][r].right;
          left = neighborEdge === 1 ? 2 : 1;
        }

        // top
        if (r === 0) {
          top = 0;
        } else {
          var neighborEdge = edges[c][r - 1].bottom;
          top = neighborEdge === 1 ? 2 : 1;
        }

        // right
        if (c === columns - 1) {
          right = 0;
        } else {
          right = Math.random() > 0.5 ? 2 : 1;
        }

        // bottom
        if (r === rows - 1) {
          bottom = 0;
        } else {
          bottom = Math.random() > 0.5 ? 2 : 1;
        }
        edges[c][r] = {
          left: left,
          right: right,
          top: top,
          bottom: bottom
        };
      }
    }
    return edges;
  };

  var DegToRad = Phaser.Math.DegToRad;
  var RAD0 = DegToRad(0);
  var RAD90 = DegToRad(90);
  var RAD180 = DegToRad(180);
  var RAD270 = DegToRad(270);
  var RAD360 = DegToRad(360);
  var DrawPieceMask = function DrawPieceMask(graphics, width, height, indent, edgeMode) {
    var centerX = width / 2,
      centerY = height / 2;
    graphics.clear();
    graphics.beginPath();
    graphics.moveTo(indent, indent);
    switch (edgeMode.top) {
      case 1:
        graphics.lineTo(centerX - indent, indent);
        graphics.arc(centerX, indent, indent, RAD180, RAD360, false);
        break;
      case 2:
        graphics.lineTo(centerX - indent, indent);
        graphics.arc(centerX, indent, indent, RAD180, RAD360, true);
        break;
    }
    graphics.lineTo(width - indent, indent);
    switch (edgeMode.right) {
      case 1:
        graphics.arc(width - indent, centerY, indent, RAD270, RAD90, false);
        break;
      case 2:
        graphics.arc(width - indent, centerY, indent, RAD270, RAD90, true);
        break;
    }
    graphics.lineTo(width - indent, height - indent);
    switch (edgeMode.bottom) {
      case 1:
        graphics.arc(centerX, height - indent, indent, RAD0, RAD180, false);
        break;
      case 2:
        graphics.arc(centerX, height - indent, indent, RAD0, RAD180, true);
        break;
    }
    graphics.lineTo(indent, height - indent);
    switch (edgeMode.left) {
      case 1:
        graphics.arc(indent, centerY, indent, RAD90, RAD270, false);
        break;
      case 2:
        graphics.arc(indent, centerY, indent, RAD90, RAD270, true);
        break;
    }
    graphics.lineTo(indent, indent);
    graphics.closePath();
    graphics.fillPath();
  };

  var JigsawPiece = /*#__PURE__*/function (_Phaser$GameObjects$R) {
    _inherits(JigsawPiece, _Phaser$GameObjects$R);
    var _super = _createSuper(JigsawPiece);
    function JigsawPiece(scene, _ref) {
      var _this;
      var width = _ref.width,
        height = _ref.height,
        indent = _ref.indent,
        key = _ref.key;
      _classCallCheck(this, JigsawPiece);
      _this = _super.call(this, scene, 0, 0, width, height);
      _this.setBaseKey(key);
      if (indent === undefined) {
        indent = Math.min(width, height) / 7;
      }
      _this.indent = indent;
      var maskGraphics = scene.make.graphics({
        add: false
      });
      _this.setMask(maskGraphics.createGeometryMask());
      _this.maskGraphics = maskGraphics;
      return _this;
    }
    _createClass(JigsawPiece, [{
      key: "destroy",
      value: function destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
          return;
        }
        _get(_getPrototypeOf(JigsawPiece.prototype), "destroy", this).call(this, fromScene);
        this.maskGraphics.destroy();
        this.maskGraphics = undefined;
      }
    }, {
      key: "setBaseKey",
      value: function setBaseKey(key) {
        this.baseKey = key;
        return this;
      }
    }, {
      key: "drawPiece",
      value: function drawPiece(_ref2) {
        var scrollX = _ref2.scrollX,
          scrollY = _ref2.scrollY,
          edgeMode = _ref2.edgeMode,
          _ref2$drawMaskCallbac = _ref2.drawMaskCallback,
          drawMaskCallback = _ref2$drawMaskCallbac === void 0 ? DrawPieceMask : _ref2$drawMaskCallbac;
        // Convert string to plain object
        if (typeof edgeMode === 'string') {
          edgeMode = edgeMode.split('').map(function (x) {
            return parseInt(x);
          });
          edgeMode = {
            right: edgeMode[0],
            bottom: edgeMode[1],
            left: edgeMode[2],
            top: edgeMode[3]
          };
        }
        this.clear().fill(0x333333);
        this.camera.setScroll(scrollX, scrollY);
        this.stamp(this.baseKey, undefined, 0, 0, {
          originX: 0,
          originY: 0
        });
        this.camera.setScroll(0, 0);
        drawMaskCallback(this.maskGraphics, this.width, this.height, this.indent, edgeMode);
        return this;
      }
    }]);
    return JigsawPiece;
  }(Phaser.GameObjects.RenderTexture);

  var DefaultGetFrameNameCallback = function DefaultGetFrameNameCallback(c, r) {
    return "".concat(c, ",").concat(r);
  };
  var GenerateFrames = function GenerateFrames(scene, _ref) {
    var baseKey = _ref.baseKey,
      targetKey = _ref.targetKey,
      columns = _ref.columns,
      rows = _ref.rows,
      overlap = _ref.overlap,
      edges = _ref.edges,
      drawMaskCallback = _ref.drawMaskCallback,
      _ref$getFrameNameCall = _ref.getFrameNameCallback,
      getFrameNameCallback = _ref$getFrameNameCall === void 0 ? DefaultGetFrameNameCallback : _ref$getFrameNameCall;
    var textureManager = scene.sys.textures;
    var baseFrame = textureManager.getFrame(baseKey, '__BASE');
    var baseFrameWidth = baseFrame.cutWidth,
      baseFrameHeight = baseFrame.height;
    if (overlap === undefined) {
      overlap = Math.min(baseFrameWidth / columns, baseFrameHeight / rows) / 7;
    }
    if (edges === undefined) {
      edges = RandomPieceEdges(columns, rows);
    }
    var frameWidth = (baseFrameWidth + (columns - 1) * overlap) / columns;
    var frameHeight = (baseFrameHeight + (rows - 1) * overlap) / rows;
    var frameManager = new FrameManager(scene, {
      key: targetKey,
      width: frameWidth * columns,
      height: frameHeight * rows,
      cellWidth: frameWidth,
      cellHeight: frameHeight,
      useDynamicTexture: true,
      fillColor: 0x888888
    });
    var sample = new JigsawPiece(scene, {
      width: frameWidth,
      height: frameHeight,
      indent: overlap,
      key: baseKey
    });
    var startX = -overlap,
      startY = -overlap;
    var scrollX = startX,
      scrollY = startY;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < columns; c++) {
        sample.drawPiece({
          scrollX: scrollX,
          scrollY: scrollY,
          edgeMode: edges[c][r],
          drawMaskCallback: drawMaskCallback
        });
        frameManager.paste(getFrameNameCallback(c, r), sample);
        scrollX += frameWidth - overlap;
      }
      scrollX = startX;
      scrollY += frameHeight - overlap;
    }
    sample.destroy();
    frameManager.destroy();
    return {
      baseKey: baseKey,
      targetKey: targetKey,
      columns: columns,
      rows: rows,
      frameWidth: frameWidth,
      frameHeight: frameHeight,
      overlap: overlap,
      getFrameNameCallback: getFrameNameCallback
    };
  };

  var index$1 = {
    GenerateFrames: GenerateFrames
  };

  return index$1;

}));
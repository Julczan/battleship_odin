/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 354:
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 474:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `// extracted by mini-css-extract-plugin
export {};`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;QACS,CAAA","sourcesContent":["// extracted by mini-css-extract-plugin\nexport {};"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/styles.css
var styles = __webpack_require__(474);
;// ./src/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.A, options);




       /* harmony default export */ const src_styles = (styles/* default */.A && styles/* default */.A.locals ? styles/* default */.A.locals : undefined);

;// ./src/components/rednerGameboard.js
function addCells(board, type) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    board.appendChild(cell);
    const number = i / 10;
    const rowNum = String(number).charAt(0);
    let columnNum = String(number).charAt(2);
    if (columnNum === "") {
      columnNum = 0;
    }
    cell.dataset.row = rowNum;
    cell.dataset.column = columnNum;
    if (type === "playerBoard") {
      cell.dataset.name = "player";
    }
    if (type === "computerBoard") {
      cell.dataset.name = "computer";
    }
  }
}

function markAsShip([x, y], player) {
  const cell = document.querySelector(
    `[data-row="${x}"][data-column="${y}"][data-name=${player}]`
  );
  cell.className = "hasShip";
}

function markAsMissed([x, y], player) {
  const cell = document.querySelector(
    `[data-row="${x}"][data-column="${y}"][data-name=${player}]`
  );
  cell.className = "missed";
}

function markAsHit([x, y], player) {
  const cell = document.querySelector(
    `[data-row="${x}"][data-column="${y}"][data-name=${player}]`
  );
  cell.className = "hit";
}

function markAsSunk([x, y], player) {
  const cell = document.querySelector(
    `[data-row="${x}"][data-column="${y}"][data-name=${player}]`
  );
  cell.className = "sunk";
}

function rednerGameboard(missedAttacks, hitAttacks, sunkShips, player) {
  if (missedAttacks) {
    missedAttacks.forEach((coord) => {
      markAsMissed(coord, player);
    });
  }

  if (hitAttacks) {
    hitAttacks.forEach((coord) => {
      markAsHit(coord, player);
    });
  }

  if (sunkShips) {
    sunkShips.forEach((coord) => {
      markAsSunk(coord, player);
    });
  }
}

function renderShips(playerCoords, player) {
  playerCoords.forEach((coord) => {
    markAsShip(coord, player);
  });
}



;// ./src/components/ship.js
class Ship {
  constructor(type) {
    this.strike = 0;
    this.getLength(type);
  }
  size() {
    return this.length;
  }

  hit() {
    this.strike++;
    return this.strike;
  }

  getLength(type) {
    switch (type) {
      case "carrier":
        this.length = 5;
        break;
      case "battleship":
        this.length = 4;
        break;
      case "destroyer":
        this.length = 3;
        break;
      case "submarine":
        this.length = 3;
        break;
      case "patrol-boat":
        this.length = 2;
        break;
    }
  }

  isSunk() {
    if (this.strike < this.length) {
      return false;
    } else {
      return true;
    }
  }
}

class ShipTypes {
  constructor() {
    this.type = "carrier";
  }

  getType() {
    return this.type;
  }

  nextType() {
    switch (this.type) {
      case "carrier":
        this.type = "battleship";
        break;
      case "battleship":
        this.type = "destroyer";
        break;
      case "destroyer":
        this.type = "submarine";
        break;
      case "submarine":
        this.type = "patrol-boat";
        break;
      case "patrol-boat":
        this.type = "none";
        break;
    }
  }
}

class ShipDirection {
  constructor() {
    this.direction = "hor";
  }

  getDirection() {
    return this.direction;
  }

  changeDirection() {
    if (this.direction === "hor") {
      this.direction = "ver";
    } else {
      this.direction = "hor";
    }
  }
}



;// ./src/components/gameboard.js


class Gameboard {
  constructor() {
    this.sunkCount = 0;
    this.shipCount = 0;
    this.board = [];

    for (let i = 0; i < 10; i++) {
      this.board.push([]);
      for (let j = 0; j < 10; j++) {
        this.board[i].push([{ hasShip: false }]);
      }
    }
  }

  place(x, y, direction, type) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return "illegal position";
    }
    const ship = new Ship(type);

    if (direction === "hor") {
      const endPoint = y + ship.size() - 1;
      const isLegal = this.checkPositionHor(x, y, endPoint);

      if (isLegal) {
        this.pushHorizontal(x, y, endPoint, ship);
        this.shipCount++;
      } else {
        return "illegal position";
      }
    }

    if (direction === "ver") {
      const endPoint = x + ship.size() - 1;
      const isLegal = this.checkPositionVer(x, y, endPoint);

      if (isLegal) {
        this.pushVertical(x, y, endPoint, ship);
        this.shipCount++;
      } else {
        return "illegal position";
      }
    }
  }

  pushHorizontal(x, y, endPoint, ship) {
    for (let i = endPoint; i >= y; i--) {
      this.board[x][i][0].hasShip = true;
      this.board[x][i].push(ship);
    }
  }

  pushVertical(x, y, endPoint, ship) {
    for (let i = endPoint; i >= x; i--) {
      this.board[i][y][0].hasShip = true;
      this.board[i][y].push(ship);
    }
  }

  checkPositionHor(x, y, endPoint) {
    if (endPoint > 9) {
      return false;
    }

    for (let i = endPoint; i >= y; i--) {
      if (this.board[x][i][0].hasShip) {
        return false;
      }
    }
    return true;
  }

  checkPositionVer(x, y, endPoint) {
    if (endPoint > 9) {
      return false;
    }

    for (let i = endPoint; i >= x; i--) {
      if (this.board[i][y][0].hasShip) {
        return false;
      }
    }
    return true;
  }

  receiveAttack(x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return "illegal attack";
    }

    if (
      this.board[x][y].includes("hit") ||
      this.board[x][y].includes("missed")
    ) {
      return "already attacked";
    }

    if (!this.board[x][y][0].hasShip) {
      this.board[x][y].push("missed");
      return "attack missed";
    }

    this.board[x][y].push("hit");
    this.board[x][y][1].hit();

    if (this.board[x][y][1].isSunk()) {
      this.sunkCount++;
    }

    return "ship hit";
  }

  gameOver() {
    if (this.shipCount === this.sunkCount) {
      return true;
    } else {
      return false;
    }
  }

  getShipsCoords() {
    const coords = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j][0].hasShip) {
          coords.push([i, j]);
        }
      }
    }

    return coords;
  }

  getHitCoords() {
    const coords = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j][0].hasShip) {
          if (this.board[i][j][2] === "hit") {
            coords.push([i, j]);
          }
        }
      }
    }
    return coords;
  }

  getMissedCoords() {
    const coords = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j][1] === "missed") {
          coords.push([i, j]);
        }
      }
    }
    return coords;
  }

  getSunkCoords() {
    const coords = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j][0].hasShip) {
          if (this.board[i][j][1].isSunk()) {
            coords.push([i, j]);
          }
        }
      }
    }
    return coords;
  }
}

/* harmony default export */ const gameboard = (Gameboard);

;// ./src/components/player.js


class Player {
  constructor(type) {
    this.type = type;
    this.board = new gameboard();
  }
}

/* harmony default export */ const player = (Player);

;// ./src/components/gameDrive.js
class Turns {
  constructor(player) {
    this.turn = player;
  }

  getCurrTurn() {
    return this.turn;
  }

  changeTurn(newPlayer) {
    this.turn = newPlayer;
  }
}

function gameCourse(message, player, turn) {
  if (message === "gameover") {
    if (player === "player") {
      return displayWinner("Player");
    }
    if (player === "computer") {
      return displayWinner("Computer");
    }
  }

  if (message === "attack missed" && player === "player") {
    turn.changeTurn("computer");
  }
  if (message === "attack missed" && player === "computer") {
    turn.changeTurn("player");
  }
}

function displayWinner(player) {
  const message = `Game over! ${player} won!`;

  return message;
}



;// ./src/components/computer.js
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function getRandomCoords() {
  const firstCoord = getRandomInt(0, 10);
  const secondCoord = getRandomInt(0, 10);

  return [firstCoord, secondCoord];
}

function getRandomNum() {
  const num = getRandomInt(0, 2);
  return num;
}



;// ./src/components/actionsDOM.js






const messageDiv = document.querySelector(".message");
const dirBtn = document.createElement("button");
dirBtn.className = "dir-btn";
dirBtn.textContent = "Rotate";

const startBtn = document.createElement("button");
startBtn.classList = "dir-btn";
startBtn.textContent = "Start Game";

messageDiv.appendChild(dirBtn);

const display = document.querySelector(".display");

const playerBoard = document.createElement("div");
playerBoard.className = "board-player";

const computerBoard = document.createElement("div");
computerBoard.className = "board-computer";

const actionsDOM_player = new player("player");
const computer = new player("computer");
const shipTypes = new ShipTypes();
const computerTypes = new ShipTypes();
const shipDir = new ShipDirection();
const turn = new Turns();

messageDiv.textContent = `Place your ${shipTypes.getType()}`;
messageDiv.appendChild(dirBtn);

dirBtn.addEventListener("click", function () {
  shipDir.changeDirection();
});

addCells(playerBoard, "playerBoard");
display.appendChild(playerBoard);

const playerCells = playerBoard.childNodes;
const computerCells = computerBoard.childNodes;

for (const cell of playerCells) {
  cell.addEventListener("click", placeShipPlayer);
}

function stopPlacement() {
  for (const cell of playerCells) {
    cell.removeEventListener("click", placeShipPlayer);
  }
}

addCells(computerBoard, "computerBoard");
placeShipComputer();

function startGame() {
  stopPlacement();
  display.textContent = "";
  messageDiv.textContent = "";
  display.appendChild(playerBoard);
  display.appendChild(computerBoard);
}

function placeShipComputer() {
  if (computerTypes.getType() === "none") {
    return;
  }

  const coords = getRandomCoords();
  const num = getRandomNum();

  let direction = "";

  if (num === 0) {
    direction = "hor";
  }
  if (num === 1) {
    direction = "ver";
  }

  const message = computer.board.place(
    coords[0],
    coords[1],
    direction,
    computerTypes.getType()
  );

  if (message === "illegal position") {
    placeShipComputer();
  } else {
    computerTypes.nextType();
    placeShipComputer();
  }
}

function placeShipPlayer() {
  const message = actionsDOM_player.board.place(
    +this.dataset.row,
    +this.dataset.column,
    shipDir.getDirection(),
    shipTypes.getType()
  );
  if (message === "illegal position") {
    messageDiv.textContent = "Illegal position! Choose again";
    messageDiv.appendChild(dirBtn);
    return;
  }

  const playerShipsCoords = actionsDOM_player.board.getShipsCoords();

  renderShips(playerShipsCoords, "player");
  shipTypes.nextType();

  if (shipTypes.getType() === "none") {
    showMessage("start");
    return "all ships placed";
  } else {
    showMessage("placement");
  }
}

function showMessage(stage) {
  if (stage === "placement") {
    messageDiv.textContent = `Place your ${shipTypes.getType()}`;
    messageDiv.appendChild(dirBtn);
  }
  if (stage === "start") {
    messageDiv.textContent = "Start the game";
    messageDiv.appendChild(startBtn);
    startBtn.addEventListener("click", () => {
      startGame();
    });
  }
}

function attackPlayer() {
  const coords = getRandomCoords();
  const message = actionsDOM_player.board.receiveAttack(coords[0], coords[1]);
  const missedAttacks = actionsDOM_player.board.getMissedCoords();
  const hitAttacks = actionsDOM_player.board.getHitCoords();
  const sunkShips = actionsDOM_player.board.getSunkCoords();
  const gameover = actionsDOM_player.board.gameOver();

  if (gameover) {
    const winner = gameCourse("gameover", "computer");
    messageDiv.textContent = winner;
    stopGame();
  }

  rednerGameboard(missedAttacks, hitAttacks, sunkShips, "player");

  if (message === "already attacked" || message === "ship hit") {
    attackPlayer();
  }

  gameCourse(message, "computer", turn);
}

function attackComputer() {
  const message = computer.board.receiveAttack(
    +this.dataset.row,
    +this.dataset.column
  );
  const missedAttacks = computer.board.getMissedCoords();
  const hitAttacks = computer.board.getHitCoords();
  const sunkShips = computer.board.getSunkCoords();
  const gameover = computer.board.gameOver();

  rednerGameboard(missedAttacks, hitAttacks, sunkShips, "computer");

  if (gameover) {
    const winner = gameCourse("gameover", "player");
    messageDiv.textContent = winner;
    stopGame();
  }

  gameCourse(message, "player", turn);

  if (turn.getCurrTurn() === "computer") {
    attackPlayer();
  }
}

for (const cell of computerCells) {
  cell.addEventListener("click", attackComputer);
}

function stopGame() {
  for (const cell of computerCells) {
    cell.removeEventListener("click", attackComputer);
  }
}



;// ./src/index.js





/******/ })()
;
//# sourceMappingURL=app.bundle.js.map
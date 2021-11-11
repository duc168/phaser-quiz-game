var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import require$$0, { useEffect } from "react";
import { Scene, Game } from "phaser";
const AUDIO = {
  TICK: "tick",
  TIMEOUT: "timeout"
};
var config = {
  DEFAULT_FONT: "CentraNo2",
  AUDIO
};
const CLICK_CHOICE_EVENT = "click-choice-event";
const ADD_NEW_QUESTION_EVENT = "add-new-question-event";
const NEXT_QUESTION_EVENT = "next-question-event";
const END_ALL_QUESTIONS_EVENT = "end-all-questions-event";
var quizGameEvents = {
  CLICK_CHOICE_EVENT,
  ADD_NEW_QUESTION_EVENT,
  NEXT_QUESTION_EVENT,
  END_ALL_QUESTIONS_EVENT
};
const getViewportDimensions = () => {
  let width = 0;
  let height = 0;
  if (typeof window.innerWidth != "undefined") {
    width = window.innerWidth;
    height = window.innerHeight;
  } else if (typeof document.documentElement !== "undefined" && typeof document.documentElement.clientWidth !== "undefined" && document.documentElement.clientWidth !== 0) {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
  } else {
    const body = document.getElementsByTagName("body")[0];
    width = body.clientWidth;
    height = body.clientHeight;
  }
  return {
    width,
    height
  };
};
const getMobileData = (WIDTH, HEIGHT) => {
  const CHOICE_STYLE = {
    align: "center",
    padding: {
      x: WIDTH / 10,
      y: HEIGHT / 20
    },
    wordWrap: {
      width: WIDTH / 4,
      useAdvancedWrap: true
    },
    fixedWidth: WIDTH / 2.3,
    fontSize: WIDTH / 600 + "rem"
  };
  const QUESTION_POINT = {
    x: 0,
    y: HEIGHT / 2 - HEIGHT / 4
  };
  const QUESTION_STYLE = {
    fontSize: WIDTH / 300 + "rem",
    align: "center",
    wordWrap: {
      width: WIDTH
    },
    fixedWidth: WIDTH
  };
  const CHOICE_1_POINT = {
    x: WIDTH / 32,
    y: HEIGHT / 2 + HEIGHT / 16
  };
  const CHOICE_2_POINT = {
    x: WIDTH / 2 + WIDTH / 32,
    y: HEIGHT / 2 + HEIGHT / 16
  };
  const CHOICE_3_POINT = {
    x: WIDTH / 32,
    y: HEIGHT / 2 + HEIGHT / 4
  };
  const CHOICE_4_POINT = {
    x: WIDTH / 2 + WIDTH / 32,
    y: HEIGHT / 2 + HEIGHT / 4
  };
  const TIMER_POINT = {
    x: 0,
    y: 0
  };
  const TIMER_STYLE = {
    fontSize: WIDTH / 500 + "rem",
    padding: {
      x: WIDTH / 64,
      y: HEIGHT / 32
    },
    fixedWidth: WIDTH / 12
  };
  const START_BUTTON_POINT = {
    x: WIDTH / 2 - WIDTH / 16,
    y: HEIGHT / 2 - HEIGHT / 16
  };
  const START_BUTTON_STYLE = {
    fontSize: WIDTH / 300 + "rem"
  };
  const NUMERIC_ORDER_POINT = {
    x: WIDTH - WIDTH / 10,
    y: 0
  };
  const NUMERIC_ORDER_STYLE = {
    fontSize: WIDTH / 500 + "rem",
    padding: {
      x: WIDTH / 64,
      y: HEIGHT / 32
    },
    fixedWidth: WIDTH / 12,
    fontFamily: config.DEFAULT_FONT
  };
  return {
    QUESTION: {
      STYLE: QUESTION_STYLE,
      POINT: QUESTION_POINT
    },
    CHOICE: {
      STYLE: CHOICE_STYLE,
      POINTS: {
        A: CHOICE_1_POINT,
        B: CHOICE_2_POINT,
        C: CHOICE_3_POINT,
        D: CHOICE_4_POINT
      }
    },
    TIMER: {
      STYLE: TIMER_STYLE,
      POINT: TIMER_POINT
    },
    START_BUTTON: {
      STYLE: START_BUTTON_STYLE,
      POINT: START_BUTTON_POINT
    },
    NUMERIC_ORDER: {
      STYLE: NUMERIC_ORDER_STYLE,
      POINT: NUMERIC_ORDER_POINT
    }
  };
};
const getResponsiveData = () => {
  const {
    width,
    height
  } = getViewportDimensions();
  return getMobileData(width, height);
};
const getFullPath = (input) => {
  return "/" + input;
};
class CustomEventEmitter {
  constructor() {
    __publicField(this, "events");
    this.events = {};
  }
  addEvent(eventName, callback) {
    this.events[eventName] = callback;
  }
  removeEvent(eventName) {
    delete this.events[eventName];
  }
  emit(eventName, data) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName](data);
  }
}
const myCustomEventEmitter = new CustomEventEmitter();
const getCustomEventEmitter = () => {
  return myCustomEventEmitter;
};
var utils = {
  getViewportDimensions,
  getResponsiveData,
  getFullPath,
  getCustomEventEmitter
};
class AnswerHandler {
  constructor(scene) {
    __publicField(this, "scene");
    __publicField(this, "answer");
    this.scene = scene;
  }
  setAnswer(newAnswer) {
    this.answer = newAnswer;
  }
  getAnswer() {
    return this.answer;
  }
}
class ChoicesHandler {
  constructor(scene) {
    __publicField(this, "SETTING", utils.getResponsiveData());
    __publicField(this, "choices", []);
    __publicField(this, "scene");
    this.scene = scene;
  }
  addHoverEffect(textObj) {
    if (textObj) {
      textObj.on("pointerover", () => {
        textObj.setAlpha(0.5);
      });
      textObj.on("pointerout", () => {
        textObj.setAlpha(1);
      });
    }
  }
  addOnClickHandler(textObj) {
    if (textObj) {
      textObj.on("pointerdown", () => {
        this.scene.game.events.emit(quizGameEvents.CLICK_CHOICE_EVENT, textObj);
      });
    }
  }
  getRectangleStyle() {
    return __spreadProps(__spreadValues({}, this.SETTING.CHOICE.STYLE), {
      backgroundColor: "#ffffff",
      color: "#000000",
      align: "center",
      fontFamily: config.DEFAULT_FONT
    });
  }
  init(choices) {
    if (this.choices.length === 4) {
      this.remove();
    }
    if (choices.length === 4) {
      this.choices.push(this.scene.add.text(this.SETTING.CHOICE.POINTS.A.x, this.SETTING.CHOICE.POINTS.A.y, choices[0], this.getRectangleStyle()));
      this.choices.push(this.scene.add.text(this.SETTING.CHOICE.POINTS.B.x, this.SETTING.CHOICE.POINTS.B.y, choices[1], this.getRectangleStyle()));
      this.choices.push(this.scene.add.text(this.SETTING.CHOICE.POINTS.C.x, this.SETTING.CHOICE.POINTS.C.y, choices[2], this.getRectangleStyle()));
      this.choices.push(this.scene.add.text(this.SETTING.CHOICE.POINTS.D.x, this.SETTING.CHOICE.POINTS.D.y, choices[3], this.getRectangleStyle()));
      this.choices.forEach((choice) => choice.setInteractive({
        cursor: "pointer"
      }));
      this.choices.forEach((choice) => this.addHoverEffect(choice));
      this.choices.forEach((choice) => this.addOnClickHandler(choice));
    }
  }
  remove() {
    this.choices.forEach((choice) => {
      choice.removeFromDisplayList();
      choice.removeFromUpdateList();
      choice.removedFromScene();
      choice.removeAllListeners();
      choice.removeInteractive();
    });
    this.choices = [];
  }
}
class NumericOrderHandler {
  constructor(scene) {
    __publicField(this, "SETTING", utils.getResponsiveData());
    __publicField(this, "scene");
    __publicField(this, "text");
    this.scene = scene;
  }
  hideText() {
    var _a;
    (_a = this.text) == null ? void 0 : _a.setVisible(false);
  }
  showText() {
    var _a;
    (_a = this.text) == null ? void 0 : _a.setVisible(true);
  }
  setText(newText) {
    var _a;
    (_a = this.text) == null ? void 0 : _a.setText(newText);
  }
  init() {
    this.text = this.scene.add.text(this.SETTING.NUMERIC_ORDER.POINT.x, this.SETTING.NUMERIC_ORDER.POINT.y, "1/1", this.SETTING.NUMERIC_ORDER.STYLE);
    this.hideText();
  }
}
class QuestionHandler {
  constructor(scene) {
    __publicField(this, "SETTING", utils.getResponsiveData());
    __publicField(this, "scene");
    __publicField(this, "question");
    this.scene = scene;
  }
  init(question) {
    if (this.question) {
      this.question.setText(question);
      return;
    }
    this.question = this.scene.add.text(this.SETTING.QUESTION.POINT.x, this.SETTING.QUESTION.POINT.y, question, __spreadProps(__spreadValues({}, this.SETTING.QUESTION.STYLE), {
      fontFamily: config.DEFAULT_FONT
    }));
  }
  remove() {
    var _a, _b, _c;
    (_a = this.question) == null ? void 0 : _a.removeFromDisplayList();
    (_b = this.question) == null ? void 0 : _b.removeFromUpdateList();
    (_c = this.question) == null ? void 0 : _c.removedFromScene();
    this.question = void 0;
  }
}
class StartButtonHandler {
  constructor(scene) {
    __publicField(this, "SETTING", utils.getResponsiveData());
    __publicField(this, "scene");
    __publicField(this, "text");
    this.scene = scene;
  }
  hideText() {
    var _a, _b;
    (_a = this.text) == null ? void 0 : _a.setVisible(false);
    (_b = this.text) == null ? void 0 : _b.disableInteractive();
  }
  showText() {
    var _a, _b;
    (_a = this.text) == null ? void 0 : _a.setVisible(true);
    (_b = this.text) == null ? void 0 : _b.setInteractive();
  }
  init(onStart) {
    this.text = this.scene.add.text(this.SETTING.START_BUTTON.POINT.x, this.SETTING.START_BUTTON.POINT.y, "Start", __spreadProps(__spreadValues({}, this.SETTING.START_BUTTON.STYLE), {
      fontFamily: config.DEFAULT_FONT
    }));
    if (!this.text)
      return;
    this.text.setInteractive({
      cursor: "pointer"
    });
    this.text.on("pointerover", () => {
      var _a;
      (_a = this.text) == null ? void 0 : _a.setAlpha(0.5);
    });
    this.text.on("pointerout", () => {
      var _a;
      (_a = this.text) == null ? void 0 : _a.setAlpha(1);
    });
    this.text.on("pointerdown", () => {
      onStart();
    });
  }
}
class TimerHandler {
  constructor(scene) {
    __publicField(this, "SETTING", utils.getResponsiveData());
    __publicField(this, "scene");
    __publicField(this, "text");
    __publicField(this, "timerValue", 0);
    __publicField(this, "timerDefaultValue", 0);
    __publicField(this, "timerIntervalId");
    __publicField(this, "audioTick");
    __publicField(this, "audioTimeout");
    this.scene = scene;
  }
  showText() {
    var _a;
    (_a = this.text) == null ? void 0 : _a.setVisible(true);
  }
  hideText() {
    var _a;
    (_a = this.text) == null ? void 0 : _a.setVisible(false);
  }
  initAudio() {
    try {
      this.audioTick = this.scene.sound.add(config.AUDIO.TICK);
      this.audioTimeout = this.scene.sound.add(config.AUDIO.TIMEOUT);
    } catch (error) {
      console.log("Error initAudio ", error);
    }
  }
  reset() {
    clearInterval(this.timerIntervalId);
    this.timerValue = this.timerDefaultValue;
    this.setText(this.timerValue + "");
  }
  init(startSeconds = 0) {
    this.initAudio();
    this.timerDefaultValue = startSeconds;
    this.timerValue = startSeconds;
    this.text = this.scene.add.text(this.SETTING.TIMER.POINT.x, this.SETTING.TIMER.POINT.y, startSeconds + "", __spreadProps(__spreadValues({}, this.SETTING.TIMER.STYLE), {
      fontFamily: config.DEFAULT_FONT,
      align: "center"
    }));
    this.hideText();
  }
  setText(newText) {
    var _a;
    (_a = this.text) == null ? void 0 : _a.setText(newText);
  }
  setInterval(onProgress, onComplete) {
    this.timerIntervalId = setInterval(() => {
      var _a, _b;
      if (!this.text)
        return;
      this.timerValue--;
      this.setText(this.timerValue + "");
      if (this.timerValue === 0) {
        (_a = this.audioTimeout) == null ? void 0 : _a.play();
        clearInterval(this.timerIntervalId);
        onComplete();
      } else {
        (_b = this.audioTick) == null ? void 0 : _b.play();
        onProgress();
      }
    }, 1e3);
  }
}
class QuizGameScene extends Scene {
  constructor(config2, shouldBeReduxStoreHere) {
    super(config2);
    __publicField(this, "SETTING", utils.getResponsiveData());
    __publicField(this, "question");
    __publicField(this, "choices");
    __publicField(this, "answer");
    __publicField(this, "timer");
    __publicField(this, "startButton");
    __publicField(this, "numericOrder");
    __publicField(this, "currentQuiz");
    this.question = new QuestionHandler(this);
    this.choices = new ChoicesHandler(this);
    this.timer = new TimerHandler(this);
    this.startButton = new StartButtonHandler(this);
    this.numericOrder = new NumericOrderHandler(this);
    this.answer = new AnswerHandler(this);
  }
  preload() {
    this.load.audio(config.AUDIO.TICK, [utils.getFullPath("audio/mixkit-game-ball-tap-2073.wav")]);
    this.load.audio(config.AUDIO.TIMEOUT, [utils.getFullPath("audio/mixkit-video-game-treasure-2066.wav")]);
  }
  addNewQuiz(newQuiz) {
    this.currentQuiz = newQuiz;
  }
  addQuiz() {
    if (!this.currentQuiz) {
      return;
    }
    const {
      question,
      choices,
      order,
      total
    } = this.currentQuiz;
    this.question.init(question);
    this.choices.init(choices);
    this.numericOrder.setText(`${order}/${total}`);
    this.timer.reset();
    this.startButton.hideText();
    this.numericOrder.showText();
    this.timer.showText();
    this.timer.setInterval(() => {
    }, () => {
      this.game.events.emit(quizGameEvents.NEXT_QUESTION_EVENT);
    });
  }
  removeQuiz() {
    this.question.remove();
    this.choices.remove();
    this.timer.hideText();
    this.numericOrder.hideText();
  }
  create() {
    this.timer.init(5);
    this.startButton.init(() => {
      this.game.events.emit(quizGameEvents.NEXT_QUESTION_EVENT);
    });
    this.numericOrder.init();
    this.game.events.on(quizGameEvents.ADD_NEW_QUESTION_EVENT, (newQuestion) => {
      this.addNewQuiz(newQuestion);
      this.addQuiz();
    });
    this.game.events.on(quizGameEvents.END_ALL_QUESTIONS_EVENT, () => {
      this.startButton.showText();
      this.removeQuiz();
    });
  }
  init(test) {
  }
}
var styles = {};
var jsxRuntime = {
  exports: {}
};
var reactJsxRuntime_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i = 0; i < 10; i++) {
      test2["_" + String.fromCharCode(i)] = i;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
      return test2[n2];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }
  return to;
};
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = require$$0, g = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h = Symbol.for;
  g = h("react.element");
  reactJsxRuntime_production_min.Fragment = h("react.fragment");
}
var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
function q(c, a, k) {
  var b, d = {}, e = null, l = null;
  k !== void 0 && (e = "" + k);
  a.key !== void 0 && (e = "" + a.key);
  a.ref !== void 0 && (l = a.ref);
  for (b in a)
    n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      d[b] === void 0 && (d[b] = a[b]);
  return {
    $$typeof: g,
    type: c,
    key: e,
    ref: l,
    props: d,
    _owner: m.current
  };
}
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const QUIZ_GAME_ID = "quiz-game";
const removeExistedGame = () => {
  var _a;
  const quizGameElement = document.getElementById(QUIZ_GAME_ID);
  if (quizGameElement) {
    const gameCanvas = quizGameElement.getElementsByTagName("canvas");
    const gameCanvasExist = gameCanvas.length > 0;
    if (gameCanvasExist) {
      (_a = gameCanvas.item(0)) == null ? void 0 : _a.remove();
    }
  }
};
const initNewGame = (db) => {
  const {
    width,
    height
  } = utils.getViewportDimensions();
  const scene = new QuizGameScene("quiz-game", db);
  return new Game({
    height: height - 5,
    width,
    parent: QUIZ_GAME_ID,
    backgroundColor: "#123456",
    scene,
    physics: {
      default: "arcade"
    }
  });
};
const testQuiz = [{
  order: 1,
  total: 8,
  question: "How old are you?",
  choices: ["100", "20", "30", "Idk"],
  answer: 3
}, {
  order: 2,
  total: 8,
  question: "Where does water come from?",
  choices: ["Sea", "Sky", "Human", "God"],
  answer: 3
}, {
  order: 3,
  total: 8,
  question: "How old is earth?",
  choices: ["111", "6969", "57575", "Idk"],
  answer: 3
}, {
  order: 4,
  total: 8,
  question: "How old is your father?",
  choices: ["10", "20", "30", "Idk"],
  answer: 3
}, {
  order: 5,
  total: 8,
  question: "How old is your brother?",
  choices: ["3", "4", "5", "Idk"],
  answer: 3
}, {
  order: 6,
  total: 8,
  question: "How old is your mother?",
  choices: ["10", "20", "33", "Idk"],
  answer: 3
}, {
  order: 7,
  total: 8,
  question: "How old is your sister?",
  choices: ["15", "25", "35", "Idk"],
  answer: 3
}, {
  order: 8,
  total: 8,
  question: "How old is your best friend?",
  choices: ["20", "100", "31", "Idk"],
  answer: 3
}];
function* quizGenerate() {
  for (let i = 0; i < testQuiz.length; i++) {
    yield testQuiz[i];
  }
}
let quizGenerator = quizGenerate();
const getNewQuiz = (game, isDoneCallback) => {
  const {
    value: nextQuiz,
    done: isDone
  } = quizGenerator.next();
  if (!isDone) {
    game.events.emit(quizGameEvents.ADD_NEW_QUESTION_EVENT, nextQuiz);
  } else {
    isDoneCallback();
    quizGenerator = quizGenerate();
  }
};
const QuizGame = () => {
  useEffect(() => {
    removeExistedGame();
    const game = initNewGame(testQuiz);
    game.events.on(quizGameEvents.CLICK_CHOICE_EVENT, (data) => {
      console.log("click on ", data.text);
    });
    game.events.on(quizGameEvents.NEXT_QUESTION_EVENT, () => {
      getNewQuiz(game, () => {
        game.events.emit(quizGameEvents.END_ALL_QUESTIONS_EVENT);
      });
    });
  }, []);
  return /* @__PURE__ */ jsx("div", {
    className: styles.container,
    children: /* @__PURE__ */ jsx("div", {
      id: QUIZ_GAME_ID
    })
  });
};
var index = {
  QuizGame
};
export { index as default };

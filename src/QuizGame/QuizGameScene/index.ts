import { Scene } from 'phaser';
import config from '../../config';
import quizGameEvents from '../../quizGameEvents';
import utils from '../../utils';

const AUDIO = {
    TICK: 'tick',
    TIMEOUT: 'timeout'
}

class QuizGameScene extends Scene {
    SETTING = utils.getResponsiveData()
    question?: Phaser.GameObjects.Text

    // choice1?: Phaser.GameObjects.Text
    // choice2?: Phaser.GameObjects.Text
    // choice3?: Phaser.GameObjects.Text
    // choice4?: Phaser.GameObjects.Text

    choices: Phaser.GameObjects.Text[] = []

    timer?: Phaser.GameObjects.Text
    timerValue = 0
    timerDefaultValue = 0
    timerIntervalId?: number

    audioTick?: Phaser.Sound.BaseSound
    audioTimeout?: Phaser.Sound.BaseSound

    startButton?: Phaser.GameObjects.Text


    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config)
    }

    preload() {
        this.load.audio(AUDIO.TICK, [import.meta.env.BASE_URL + 'audio/mixkit-game-ball-tap-2073.wav'])
        this.load.audio(AUDIO.TIMEOUT, [import.meta.env.BASE_URL + 'audio/mixkit-video-game-treasure-2066.wav'])
    }

    getRectangleStyle(): Phaser.Types.GameObjects.Text.TextStyle {
        return {
            ...this.SETTING.CHOICE.STYLE,
            backgroundColor: '#ffffff',
            color: '#000000',           
            align: 'center',            
            fontFamily: config.DEFAULT_FONT,
        }
    }

    addHoverEffect(textObj?: Phaser.GameObjects.Text) {
        if (textObj) {
            textObj.on('pointerover', () => {
                textObj.setAlpha(0.5);
            });
            textObj.on('pointerout', () => {
                textObj.setAlpha(1);
            });
        }
    }

    addOnClickHandler(textObj: Phaser.GameObjects.Text) {
        if (textObj) {
            textObj.on('pointerdown', () => {
                this.game.events.emit(quizGameEvents.CLICK_CHOICE_EVENT, textObj)
            });
        }
    }

    startButtonDisable() {
        this.startButton?.setVisible(false);
        this.startButton?.disableInteractive();
    }

    startButtonEnable() {
        this.startButton?.setVisible(true);
        this.startButton?.setInteractive();
    }

    timerShow() {
        this.timer?.setAlpha(1);
    }

    timerHide() {
        this.timer?.setAlpha(0);
    }

    timerReset() {
        clearInterval(this.timerIntervalId);
        this.timerValue = this.timerDefaultValue
    }

    timerStart() {
        this.timerShow();
        this.addQuiz();
        this.startButtonDisable();
        this.timerReset();
        this.timer?.setText(this.timerValue + '');
        this.timerIntervalId = setInterval(() => {
            if (!this.timer) return
            this.timerValue--;
            this.timer.setText(this.timerValue + '');
            if (this.timerValue === 0) {
                this.startButtonEnable();
                this.audioTimeout?.play();
                clearInterval(this.timerIntervalId)
                this.removeQuiz();
                this.timerHide();
            } else {
                this.audioTick?.play();
            }
        }, 1000)
    }

    addQuiz() {
        this.initQuestion('Where does water come from?');
        this.initChoice(['Sea', 'Sky', 'Human', 'God']);
    }

    removeQuiz() {        
        this.question?.removeFromDisplayList();
        this.question?.removeFromUpdateList();
        this.question?.removedFromScene();        
        this.choices.forEach(choice => {
            choice.removeFromDisplayList();
            choice.removeFromUpdateList();
            choice.removedFromScene();
            choice.removeAllListeners();
            choice.removeInteractive();
        });
    }


    initAudio() {
        this.audioTick = this.sound.add(AUDIO.TICK)
        this.audioTimeout = this.sound.add(AUDIO.TIMEOUT)
    }

    initQuestion(question: string) {
        this.question = this.add.text(this.SETTING.QUESTION.POINT.x, this.SETTING.QUESTION.POINT.y, question, {
            ...this.SETTING.QUESTION.STYLE,
            fontFamily: config.DEFAULT_FONT
         });
    }

    initChoice(choices: string[]) {
        if (choices.length === 4) {
            this.choices.push(this.add.text(this.SETTING.CHOICE.POINTS.A.x, this.SETTING.CHOICE.POINTS.A.y, choices[0], this.getRectangleStyle()));
            this.choices.push(this.add.text(this.SETTING.CHOICE.POINTS.B.x, this.SETTING.CHOICE.POINTS.B.y, choices[1], this.getRectangleStyle()));
            this.choices.push(this.add.text(this.SETTING.CHOICE.POINTS.C.x, this.SETTING.CHOICE.POINTS.C.y, choices[2], this.getRectangleStyle()));
            this.choices.push(this.add.text(this.SETTING.CHOICE.POINTS.D.x, this.SETTING.CHOICE.POINTS.D.y, choices[3], this.getRectangleStyle()));
            this.choices.forEach(choice => choice.setInteractive({ cursor: 'pointer' }));
            this.choices.forEach(choice => this.addHoverEffect(choice));
            this.choices.forEach(choice => this.addOnClickHandler(choice));
        }
    }

    initTimer(startSeconds: number = 0) {
        this.timerDefaultValue = startSeconds
        this.timerValue = startSeconds
        this.timer = this.add.text(this.SETTING.TIMER.POINT.x, this.SETTING.TIMER.POINT.y, startSeconds + '', {
            ...this.SETTING.TIMER.STYLE,
            fontFamily: config.DEFAULT_FONT,
            // backgroundColor: '#ffffff',
            // color: '#000000',
            align: 'center',
        });
        this.timerHide();
    }

    initStartButton() {
        this.startButton = this.add.text(this.SETTING.START_BUTTON.POINT.x, this.SETTING.START_BUTTON.POINT.y, 'Start', {
            ...this.SETTING.START_BUTTON.STYLE,
            fontFamily: config.DEFAULT_FONT,
        })
        if (!this.startButton) return
        this.startButton.setInteractive({ cursor: 'pointer' });
        this.startButton.on('pointerover', () => {
            this.startButton?.setAlpha(0.5);
        });
        this.startButton.on('pointerout', () => {
            this.startButton?.setAlpha(1);
        });
        this.startButton.on('pointerdown', () => {
            this.timerStart();
        })
    }

    create() {
        this.initAudio();
        this.initTimer(10);
        this.initStartButton();
    }

}

export default QuizGameScene
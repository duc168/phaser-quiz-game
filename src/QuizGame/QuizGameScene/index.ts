import { Scene } from 'phaser';
import config from '../../config';
import utils from '../../utils';
import ChoicesHandler from './ChoicesHandler';
import QuestionHandler from './questionHandler';
import StartButtonHandler from './StartButtonHandler';
import TimerHandler from './TimerHandler'

function* questionGenerator() {
    const list = [
        {
            question: 'How old are you?',
            choices: ['100', '20', '30', 'Idk'],
            answers: 3,
        },
        {
            question: 'How old is earth?',
            choices: ['111', '6969', '57575', 'Idk'],
            answers: 3,
        },
        {
            question: 'How old is your father?',
            choices: ['10', '20', '30', 'Idk'],
            answers: 3,
        },
        {
            question: 'How old is your brother?',
            choices: ['3', '4', '5', 'Idk'],
            answers: 3,
        },
        {
            question: 'How old is your mother?',
            choices: ['10', '20', '33', 'Idk'],
            answers: 3,
        },
        {
            question: 'How old is your sister?',
            choices: ['15', '25', '35', 'Idk'],
            answers: 3,
        },
        {
            question: 'How old is your best friend?',
            choices: ['20', '100', '31', 'Idk'],
            answers: 3,
        },
    ]
    for (let i = 0; i < list.length; i++) {
        yield list[i]
    }
}

class QuizGameScene extends Scene {
    SETTING = utils.getResponsiveData()

    question: QuestionHandler

    choices: ChoicesHandler

    timer: TimerHandler

    startButton: StartButtonHandler

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
        super(config)
        this.question = new QuestionHandler(this)
        this.choices = new ChoicesHandler(this)
        this.timer = new TimerHandler(this)
        this.startButton = new StartButtonHandler(this)
    }

    preload() {
        this.load.audio(config.AUDIO.TICK, [utils.getFullPath('audio/mixkit-game-ball-tap-2073.wav')])
        this.load.audio(config.AUDIO.TIMEOUT, [utils.getFullPath('audio/mixkit-video-game-treasure-2066.wav')])
    }

    addQuiz() {
        this.question.init('Where does water come from?');
        this.choices.init(['Sea', 'Sky', 'Human', 'God']);
    }

    removeQuiz() {        
        this.question.remove();
        this.choices.remove();
    }    

    create() {
        this.timer.init(10);        
        this.startButton.init(() => {
            this.timer.showText();
            this.startButton.hideText();
            this.addQuiz();
            this.timer.reset();
            this.timer.setInterval(() => {}, () => {
                this.startButton.showText();
                this.removeQuiz();
            })
        });
    }

}

export default QuizGameScene
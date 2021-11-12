import { Scene } from 'phaser';
import config from '../../config';
import quizGameEvents from '../../events';
import utils from '../../utils';
import AnswerHandler from './AnswerHandler';
import ChoicesHandler from './ChoicesHandler';
import NumericOrderHandler from './NumericOrderHandler';
import QuestionHandler from './QuestionHandler';
import StartButtonHandler from './StartButtonHandler';
import TimerHandler from './TimerHandler'

class GameScene extends Scene {
    SETTING = utils.getResponsiveData()

    question: QuestionHandler

    choices: ChoicesHandler

    answer: AnswerHandler

    timer: TimerHandler

    startButton: StartButtonHandler

    numericOrder: NumericOrderHandler

    currentQuiz?: IQuiz

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig, shouldBeReduxStoreHere: any) {
        super(config)
        this.question = new QuestionHandler(this)
        this.choices = new ChoicesHandler(this)
        this.timer = new TimerHandler(this)
        this.startButton = new StartButtonHandler(this)
        this.numericOrder = new NumericOrderHandler(this)
        this.answer = new AnswerHandler(this)        
    }

    preload() {
        this.load.audio(config.AUDIO.TICK, [`https://firebasestorage.googleapis.com/v0/b/avid-circle-284205.appspot.com/o/autonomous-games%2Fquiz-game%2Fmixkit-game-ball-tap-2073.wav?alt=media&token=2c847ba6-42d0-438e-a67b-50a380f5c468`])
        this.load.audio(config.AUDIO.TIMEOUT, [`https://firebasestorage.googleapis.com/v0/b/avid-circle-284205.appspot.com/o/autonomous-games%2Fquiz-game%2Fmixkit-video-game-treasure-2066.wav?alt=media&token=51f1fe0a-5c8e-48ef-80ea-3abba1440f7e`])
    }

    private addNewQuiz(newQuiz: IQuiz) {
        this.currentQuiz = newQuiz        
    }

    addQuiz() {
        if (!this.currentQuiz) {
            return
        }
        const { question, choices, order, total } = this.currentQuiz
        this.question.init(question);
        this.choices.init(choices);
        this.numericOrder.setText(`${order}/${total}`)

        this.timer.reset();
        this.startButton.hideText();
        this.numericOrder.showText();
        this.timer.showText();
        this.timer.setInterval(() => {}, () => {
            this.game.events.emit(quizGameEvents.NEXT_QUESTION_EVENT)
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
        this.game.events.on(quizGameEvents.ADD_NEW_QUESTION_EVENT, (newQuestion: IQuiz) => {
            this.addNewQuiz(newQuestion)
            this.addQuiz();
        })
        this.game.events.on(quizGameEvents.END_ALL_QUESTIONS_EVENT, () => {
            this.startButton.showText();
            this.removeQuiz();
        });
    }

    init(test: any) {
        // this.game.events.on('test', (e: any) => {
        //     console.log('test event', e);
        // })
    }

}

export default GameScene
import { Scene } from 'phaser';
import AnswerHandler from './AnswerHandler';
import ChoicesHandler from './ChoicesHandler';
import NumericOrderHandler from './NumericOrderHandler';
import QuestionHandler from './QuestionHandler';
import StartButtonHandler from './StartButtonHandler';
import TimerHandler from './TimerHandler';
declare class QuizGameScene extends Scene {
    SETTING: {
        QUESTION: {
            STYLE: Phaser.Types.GameObjects.Text.TextStyle;
            POINT: {
                x: number;
                y: number;
            };
        };
        CHOICE: {
            STYLE: Phaser.Types.GameObjects.Text.TextStyle;
            POINTS: {
                A: {
                    x: number;
                    y: number;
                };
                B: {
                    x: number;
                    y: number;
                };
                C: {
                    x: number;
                    y: number;
                };
                D: {
                    x: number;
                    y: number;
                };
            };
        };
        TIMER: {
            STYLE: Phaser.Types.GameObjects.Text.TextStyle;
            POINT: {
                x: number;
                y: number;
            };
        };
        START_BUTTON: {
            STYLE: Phaser.Types.GameObjects.Text.TextStyle;
            POINT: {
                x: number;
                y: number;
            };
        };
        NUMERIC_ORDER: {
            STYLE: Phaser.Types.GameObjects.Text.TextStyle;
            POINT: {
                x: number;
                y: number;
            };
        };
    };
    question: QuestionHandler;
    choices: ChoicesHandler;
    answer: AnswerHandler;
    timer: TimerHandler;
    startButton: StartButtonHandler;
    numericOrder: NumericOrderHandler;
    currentQuiz?: IQuiz;
    constructor(config: string | Phaser.Types.Scenes.SettingsConfig, shouldBeReduxStoreHere: any);
    preload(): void;
    private addNewQuiz;
    addQuiz(): void;
    removeQuiz(): void;
    create(): void;
    init(test: any): void;
}
export default QuizGameScene;

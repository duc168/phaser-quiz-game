import React, { useEffect } from 'react'
import { Game } from 'phaser';
import QuizGameScene from './QuizGameScene'
import styles from './styles.module.scss'
import utils from '../utils';
import quizGameEvents from '../quizGameEvents';
const QUIZ_GAME_ID = 'quiz-game';
const removeExistedGame = () => {
    const quizGameElement = document.getElementById(QUIZ_GAME_ID)
    if (quizGameElement) {
        const gameCanvas = quizGameElement.getElementsByTagName('canvas');
        const gameCanvasExist = gameCanvas.length > 0
        if (gameCanvasExist) {
            gameCanvas.item(0)?.remove();
        }
    }
}
const initNewGame = (db: IQuiz[]) => {
    const { width, height } = utils.getViewportDimensions();
    const scene = new QuizGameScene("quiz-game", db)
    return new Game({
        height: height - 5,
        width: width,    
        parent: QUIZ_GAME_ID,
        backgroundColor: '#123456',
        scene: scene,
        physics: {
            default: 'arcade'
        },
    });
}

const testQuiz :IQuiz[] = [
    {
        order: 1,
        total: 8,
        question: 'How old are you?',
        choices: ['100', '20', '30', 'Idk'],
        answer: 3,
    },
    {
        order: 2,
        total: 8,
        question: 'Where does water come from?',
        choices: ['Sea', 'Sky', 'Human', 'God'],
        answer: 3
    },
    // {
    //     order: 3,
    //     total: 8,
    //     question: 'How old is earth?',
    //     choices: ['111', '6969', '57575', 'Idk'],
    //     answer: 3,
    // },
    // {
    //     order: 4,
    //     total: 8,
    //     question: 'How old is your father?',
    //     choices: ['10', '20', '30', 'Idk'],
    //     answer: 3,
    // },
    // {
    //     order: 5,
    //     total: 8,
    //     question: 'How old is your brother?',
    //     choices: ['3', '4', '5', 'Idk'],
    //     answer: 3,
    // },
    // {
    //     order: 6,
    //     total: 8,
    //     question: 'How old is your mother?',
    //     choices: ['10', '20', '33', 'Idk'],
    //     answer: 3,
    // },
    // {
    //     order: 7,
    //     total: 8,
    //     question: 'How old is your sister?',
    //     choices: ['15', '25', '35', 'Idk'],
    //     answer: 3,
    // },
    // {
    //     order: 8,
    //     total: 8,
    //     question: 'How old is your best friend?',
    //     choices: ['20', '100', '31', 'Idk'],
    //     answer: 3,
    // },
]

function* quizGenerate() {
    for (let i = 0; i < testQuiz.length; i++) {
        yield testQuiz[i]
    }
}

let quizGenerator = quizGenerate()

const getNewQuiz = (game: Phaser.Game,isDoneCallback: () => void) => {
    const { value: nextQuiz, done: isDone } = quizGenerator.next()
    if (!isDone) {
        // utils.getCustomEventEmitter().emit('add-new-quiz', nextQuiz)
        game.events.emit(quizGameEvents.ADD_NEW_QUESTION_EVENT, nextQuiz)
    } else {
        isDoneCallback()
        quizGenerator = quizGenerate()
    }
}
const QuizGame: React.FC<any> = () => {
    
    useEffect(() => {
        removeExistedGame();       
        const game = initNewGame(testQuiz);  
        game.events.on(quizGameEvents.CLICK_CHOICE_EVENT, (data: Phaser.GameObjects.Text) => {
            console.log('click on ', data.text);
        });
        game.events.on(quizGameEvents.NEXT_QUESTION_EVENT, () => {
            getNewQuiz(game, () => {
                game.events.emit(quizGameEvents.END_ALL_QUESTIONS_EVENT);
            });
        });
    }, [])
    return <div className={styles.container}>
            <div id={QUIZ_GAME_ID} />
    </div>
}

export default QuizGame
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
const initNewGame = () => {
    const { width, height } = utils.getViewportDimensions();
    return new Game({                
        height: height * 0.99,
        width,
        parent: QUIZ_GAME_ID,
        backgroundColor: '#123456',
        scene: QuizGameScene,
        physics: {
            default: 'arcade'
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    });
}
const QuizGame: React.FC<any> = () => {
    
    useEffect(() => {
        removeExistedGame();        
        const game = initNewGame();
        game.events.on(quizGameEvents.CLICK_CHOICE_EVENT, (data: Phaser.GameObjects.Text) => {
            console.log('click on ', data.text)
        })       
    }, [])
    return <div className={styles.container}>
            {/* <h1>Phaser Quiz Game</h1> */}
            <div id={QUIZ_GAME_ID} />
    </div>
}

export default QuizGame
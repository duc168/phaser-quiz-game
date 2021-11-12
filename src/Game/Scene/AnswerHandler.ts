export default class AnswerHandler {
    private scene: Phaser.Scene

    private answer?: number

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }

    setAnswer(newAnswer: number) {
        this.answer = newAnswer
    }

    getAnswer() {
        return this.answer
    }
}
export default class AnswerHandler {
    private scene;
    private answer?;
    constructor(scene: Phaser.Scene);
    setAnswer(newAnswer: number): void;
    getAnswer(): number | undefined;
}

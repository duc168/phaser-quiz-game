export default class QuestionHandler {
    private SETTING;
    private scene;
    constructor(scene: Phaser.Scene);
    private question?;
    init(question: string): void;
    remove(): void;
}

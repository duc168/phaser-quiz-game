export default class NumericOrderHandler {
    private SETTING;
    private scene;
    private text?;
    constructor(scene: Phaser.Scene);
    hideText(): void;
    showText(): void;
    setText(newText: string): void;
    init(): void;
}

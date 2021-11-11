export default class StartButtonHandler {
    private SETTING;
    private scene;
    private text?;
    constructor(scene: Phaser.Scene);
    hideText(): void;
    showText(): void;
    init(onStart: () => void): void;
}

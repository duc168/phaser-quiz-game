declare class ChoicesHandler {
    private SETTING;
    private choices;
    private scene;
    constructor(scene: Phaser.Scene);
    private addHoverEffect;
    private addOnClickHandler;
    private getRectangleStyle;
    init(choices: string[]): void;
    remove(): void;
}
export default ChoicesHandler;

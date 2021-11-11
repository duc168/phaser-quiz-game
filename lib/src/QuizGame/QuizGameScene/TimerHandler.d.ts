export default class TimerHandler {
    private SETTING;
    private scene;
    private text?;
    private timerValue;
    private timerDefaultValue;
    private timerIntervalId?;
    private audioTick?;
    private audioTimeout?;
    constructor(scene: Phaser.Scene);
    showText(): void;
    hideText(): void;
    initAudio(): void;
    reset(): void;
    init(startSeconds?: number): void;
    setText(newText: string): void;
    setInterval(onProgress: () => void, onComplete: () => void): void;
}

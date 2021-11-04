import config from "../../config";
import utils from "../../utils";

export default class TimerHandler {
    private SETTING = utils.getResponsiveData()

    private scene: Phaser.Scene

    private text?: Phaser.GameObjects.Text
    private timerValue = 0
    private timerDefaultValue = 0
    private timerIntervalId?: number

    private audioTick?: Phaser.Sound.BaseSound
    private audioTimeout?: Phaser.Sound.BaseSound

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }

    showText() {
        this.text?.setVisible(true);
    }

    hideText() {        
        this.text?.setVisible(false);
    }

    initAudio() {
        try {
            this.audioTick = this.scene.sound.add(config.AUDIO.TICK)
            this.audioTimeout = this.scene.sound.add(config.AUDIO.TIMEOUT)    
        } catch (error) {
            console.log('Error initAudio ', error)
        }
        
    }

    reset() {
        clearInterval(this.timerIntervalId);
        this.timerValue = this.timerDefaultValue
        this.setText(this.timerValue + '');
    }    

    init(startSeconds: number = 0) {        
        this.initAudio();
        this.timerDefaultValue = startSeconds
        this.timerValue = startSeconds
        this.text = this.scene.add.text(this.SETTING.TIMER.POINT.x, this.SETTING.TIMER.POINT.y, startSeconds + '', {
            ...this.SETTING.TIMER.STYLE,
            fontFamily: config.DEFAULT_FONT,
            // backgroundColor: '#ffffff',
            // color: '#000000',
            align: 'center',
        });
        this.hideText();
    }

    setText(newText: string) {
        this.text?.setText(newText)
    }

    setInterval(onProgress: () => void, onComplete: () => void) {
        this.timerIntervalId = setInterval(() => {
            if (!this.text) return
            this.timerValue--;
            this.setText(this.timerValue + '');
            if (this.timerValue === 0) {
                this.audioTimeout?.play();
                clearInterval(this.timerIntervalId)
                this.hideText();
                onComplete();
            } else {
                this.audioTick?.play();
                onProgress();
            }
        }, 1000)
    }
}
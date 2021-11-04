import config from "../../config";
import utils from "../../utils";

export default class StartButtonHandler {
    private SETTING = utils.getResponsiveData()
    private scene: Phaser.Scene    

    private text?: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }

    hideText() {
        this.text?.setVisible(false);
        this.text?.disableInteractive();
    }

    showText() {
        this.text?.setVisible(true);
        this.text?.setInteractive();
    }

    init(onStart: () => void) {
        this.text = this.scene.add.text(this.SETTING.START_BUTTON.POINT.x, this.SETTING.START_BUTTON.POINT.y, 'Start', {
            ...this.SETTING.START_BUTTON.STYLE,
            fontFamily: config.DEFAULT_FONT,
        })
        if (!this.text) return
        this.text.setInteractive({ cursor: 'pointer' });
        this.text.on('pointerover', () => {
            this.text?.setAlpha(0.5);
        });
        this.text.on('pointerout', () => {
            this.text?.setAlpha(1);
        });
        this.text.on('pointerdown', () => {
            onStart();
        });

        // test
        this.hideText();
        onStart();
    }
}
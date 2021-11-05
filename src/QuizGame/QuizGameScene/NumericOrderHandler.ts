import config from "../../config";
import utils from "../../utils";

export default class NumericOrderHandler {
    private SETTING = utils.getResponsiveData()
    private scene: Phaser.Scene    

    private text?: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }

    hideText() {
        this.text?.setVisible(false);
    }

    showText() {
        this.text?.setVisible(true);
    }

    setText(newText: string) {
        this.text?.setText(newText);
    }    

    init() {
        this.text = this.scene.add.text(this.SETTING.NUMERIC_ORDER.POINT.x, this.SETTING.NUMERIC_ORDER.POINT.y, '1/1', 
        this.SETTING.NUMERIC_ORDER.STYLE)
        this.hideText();
    }
}
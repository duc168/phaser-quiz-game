import config from "../../config";
import utils from "../../utils";

export default class QuestionHandler {
    private SETTING = utils.getResponsiveData()
    private scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }

    private question?: Phaser.GameObjects.Text    

    init(question: string) {
        if (this.question) {
            this.question.setText(question)
            return
        }
        this.question = this.scene.add.text(this.SETTING.QUESTION.POINT.x, this.SETTING.QUESTION.POINT.y, question, {
            ...this.SETTING.QUESTION.STYLE,
            fontFamily: config.DEFAULT_FONT
            });
    }
    remove() {
        this.question?.removeFromDisplayList();
        this.question?.removeFromUpdateList();
        this.question?.removedFromScene();
        this.question = undefined
    }
}
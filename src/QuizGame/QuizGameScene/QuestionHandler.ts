import config from "../../config";
import utils from "../../utils";

export default class QuestionHandler {
    SETTING = utils.getResponsiveData()
    scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }

    question?: Phaser.GameObjects.Text    

    init(question: string) {
        this.question = this.scene.add.text(this.SETTING.QUESTION.POINT.x, this.SETTING.QUESTION.POINT.y, question, {
            ...this.SETTING.QUESTION.STYLE,
            fontFamily: config.DEFAULT_FONT
            });
    }
    remove() {
        this.question?.removeFromDisplayList();
        this.question?.removeFromUpdateList();
        this.question?.removedFromScene();
    }
}
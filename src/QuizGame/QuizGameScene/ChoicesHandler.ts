import config from "../../config";
import quizGameEvents from "../../quizGameEvents";
import utils from "../../utils";

class ChoicesHandler {
    private SETTING = utils.getResponsiveData()
    private choices: Phaser.GameObjects.Text[] = []
    private scene: Phaser.Scene

    constructor(scene: Phaser.Scene,) {
        this.scene = scene
    }

    private addHoverEffect(textObj?: Phaser.GameObjects.Text) {
        if (textObj) {
            textObj.on('pointerover', () => {
                textObj.setAlpha(0.5);
            });
            textObj.on('pointerout', () => {
                textObj.setAlpha(1);
            });
        }
    }

    private addOnClickHandler(textObj: Phaser.GameObjects.Text) {
        if (textObj) {
            textObj.on('pointerdown', () => {
                this.scene.game.events.emit(quizGameEvents.CLICK_CHOICE_EVENT, textObj)
            });
        }
    }

    private getRectangleStyle(): Phaser.Types.GameObjects.Text.TextStyle {
        return {
            ...this.SETTING.CHOICE.STYLE,
            backgroundColor: '#ffffff',
            color: '#000000',           
            align: 'center',            
            fontFamily: config.DEFAULT_FONT,
        }
    }

    init(choices: string[]) {
        if (this.choices.length === 4) {
            this.remove();
        }
        if (choices.length === 4) {
            this.choices.push(this.scene.add.text(this.SETTING.CHOICE.POINTS.A.x, this.SETTING.CHOICE.POINTS.A.y, choices[0], this.getRectangleStyle()));
            this.choices.push(this.scene.add.text(this.SETTING.CHOICE.POINTS.B.x, this.SETTING.CHOICE.POINTS.B.y, choices[1], this.getRectangleStyle()));
            this.choices.push(this.scene.add.text(this.SETTING.CHOICE.POINTS.C.x, this.SETTING.CHOICE.POINTS.C.y, choices[2], this.getRectangleStyle()));
            this.choices.push(this.scene.add.text(this.SETTING.CHOICE.POINTS.D.x, this.SETTING.CHOICE.POINTS.D.y, choices[3], this.getRectangleStyle()));
            this.choices.forEach(choice => choice.setInteractive({ cursor: 'pointer' }));
            this.choices.forEach(choice => this.addHoverEffect(choice));
            this.choices.forEach(choice => this.addOnClickHandler(choice));
        }
    }

    remove() {
        this.choices.forEach(choice => {
            choice.removeFromDisplayList();
            choice.removeFromUpdateList();
            choice.removedFromScene();
            choice.removeAllListeners();
            choice.removeInteractive();
        });
    }
}

export default ChoicesHandler
declare class CustomEventEmitter {
    private events;
    constructor();
    addEvent(eventName: string, callback: Function): void;
    removeEvent(eventName: string): void;
    emit(eventName: string, data: any): void;
}
declare const _default: {
    getViewportDimensions: () => {
        width: number;
        height: number;
    };
    getResponsiveData: () => {
        QUESTION: {
            STYLE: Phaser.Types.GameObjects.Text.TextStyle;
            POINT: {
                x: number;
                y: number;
            };
        };
        CHOICE: {
            STYLE: Phaser.Types.GameObjects.Text.TextStyle;
            POINTS: {
                A: {
                    x: number;
                    y: number;
                };
                B: {
                    x: number;
                    y: number;
                };
                C: {
                    x: number;
                    y: number;
                };
                D: {
                    x: number;
                    y: number;
                };
            };
        };
        TIMER: {
            STYLE: Phaser.Types.GameObjects.Text.TextStyle;
            POINT: {
                x: number;
                y: number;
            };
        };
        START_BUTTON: {
            STYLE: Phaser.Types.GameObjects.Text.TextStyle;
            POINT: {
                x: number;
                y: number;
            };
        };
        NUMERIC_ORDER: {
            STYLE: Phaser.Types.GameObjects.Text.TextStyle;
            POINT: {
                x: number;
                y: number;
            };
        };
    };
    getFullPath: (input: string) => string;
    getCustomEventEmitter: () => CustomEventEmitter;
};
export default _default;

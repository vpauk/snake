import {Section} from "./Section";
import {PositionManager} from "./PositionManager";
import {Snake} from "./Snake";

export class App {

    /**
     * @type {number}
     */
    public static readonly width = 400;

    /**
     * @type {number}
     */
    public static readonly height = 400;

    /**
     * @type {number}
     */
    public static readonly step = 20;

    /**
     * Run game
     */
    run(): void {
        const canvas = <HTMLCanvasElement> document.getElementById('canvas');
        const context = canvas.getContext("2d");

        if (context === null) {
            return;
        }

        const section = Section.create(context);
        const point = Section.create(context)
            .random()
            .draw();

        const snake = new Snake();
        snake.add(section);

        const positionManager = new PositionManager(context, snake, point);
    }
}
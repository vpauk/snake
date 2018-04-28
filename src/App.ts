import { Cube } from "./Shape/Cube";
import { PositionManager } from "./PositionManager";
import { Snake } from "./Snake";

export class App {

    /**
     * @type {number}
     */
    static width = 400;

    /**
     * Run game
     */
    run(): void {
        const canvas = <HTMLCanvasElement> document.getElementById('canvas');
        const context = canvas.getContext("2d");

        if (context === null) {
            return;
        }

        const range = Array.apply(null, Array(21)).map((_: number, i: number) => {
            return i * 20;
        });


        const cube = Cube.create(context);
        const cube1 = Cube.create(context)
                            .random()
                            .draw();

        const snake = new Snake(context);
        snake.add(cube);

        const positionManager = new PositionManager(context, snake, cube, cube1);
    }
}
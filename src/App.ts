import { Cube } from "./Shape/Cube";
import { PositionManager } from "./PositionManager";

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

        console.log(range);

        const cube = new Cube(context);
        const cube1 = new Cube(context);
        console.log(Math.random() * (370 - 1) + 1);
        cube1.setX(range[Math.floor(Math.random() * 21)]);
        cube1.setY(range[Math.floor(Math.random() * 21)]);
        cube1.draw();

        const positionManager = new PositionManager(cube, cube1);
    }
}

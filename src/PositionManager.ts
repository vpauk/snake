import {Shape} from './Shape/Shape'
import { Snake } from './Snake';
import { Cube } from './Shape/Cube';

export class PositionManager {
    private static readonly step = 20;

    constructor(protected context: CanvasRenderingContext2D, protected snake: Snake, protected shape: Shape, protected point: Shape) {
        this.onKeyDown();

        setInterval(() => {
            this.move();
        }, 500);
    }

    private up(): void {
        this.context.clearRect(0, 0, 400, 400);

        const list = this.snake.getList().slice(0);

        for (let item of list) {
            item.setY(item.getY() - PositionManager.step);

            if (item.getY() - PositionManager.step === this.point.getY() && item.getX() === this.point.getX()) {
                let clonePoint = Object.assign(new Cube(this.context), this.point);
                clonePoint.draw();
                this.snake.add(clonePoint);

                this.pointAdded();
            }

            item.draw();
        }
    }

    private down(): void {
        this.context.clearRect(0, 0, 400, 400);

        const list = this.snake.getList().slice(0);
        for (let item of list) {
            item.setY(item.getY() + PositionManager.step);

            if (item.getY() + PositionManager.step === this.point.getY() && item.getX() === this.point.getX()) {
                let clonePoint = Object.assign(new Cube(this.context), this.point);
                clonePoint.draw();
                this.snake.add(clonePoint);

                this.pointAdded();
            }

            item.draw();
        }
    }

    private left(): void {
        this.context.clearRect(0, 0, 400, 400);

        const list = this.snake.getList().slice(0);
        for (let item of list) {
            item.setX(item.getX() - PositionManager.step);

            if (item.getX() - PositionManager.step === this.point.getX() && item.getY() === this.point.getY()) {
                let clonePoint = Object.assign(new Cube(this.context), this.point);
                clonePoint.draw();
                this.snake.add(clonePoint);

                this.pointAdded();
            }

            item.draw();
        }
    }

    private right(): void {
        this.context.clearRect(0, 0, 400, 400);

       const list = this.snake.getList().slice(0);
        for (let item of list) {
    
            item.setX(item.getX() + PositionManager.step);

            if (item.getX() + PositionManager.step === this.point.getX() && item.getY() === this.point.getY()) {
                let clonePoint = Object.assign(new Cube(this.context), this.point);
                clonePoint.draw();
                this.snake.add(clonePoint);

                this.pointAdded();
            }
    
            item.draw();
        }
    }

    protected onKeyDown(): void {
        document.onkeydown = (e: KeyboardEvent) => {
            e = e || window.event;

            if (e.keyCode == 38) {
                this.shape.setDirection(Shape.DIRECTION_UP);
            } else if (e.keyCode == 40) {
                this.shape.setDirection(Shape.DIRECTION_DOWN);
            } else if (e.keyCode == 37) {
                this.shape.setDirection(Shape.DIRECTION_LEFT);
            } else if (e.keyCode == 39) {
                this.shape.setDirection(Shape.DIRECTION_RIGHT);
            }
        }
    }

    protected move(): void {
        if (this.shape.getDirection() === Shape.DIRECTION_UP) {
            this.up();
        } else if (this.shape.getDirection() === Shape.DIRECTION_DOWN) {
            this.down();
        } else if (this.shape.getDirection() === Shape.DIRECTION_LEFT) {
            this.left();
        } else if (this.shape.getDirection() === Shape.DIRECTION_RIGHT) {
            this.right();
        }

        this.point.draw();
    }

    public pointAdded(): void {
        //this.context.clearRect(0, 0, 400, 400);
        this.point = Cube.create(this.context).random().draw();
    }
}
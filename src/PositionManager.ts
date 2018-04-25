import {Shape} from './Shape/Shape'

export class PositionManager {
    private static readonly step = 20;

    constructor(protected shape: Shape, protected point: Shape) {
        this.onKeyDown();

        setInterval(() => {
            this.move();

            point.draw();
        }, 1000);
    }

    private up(): void {
        this.shape.setY(this.shape.getY() - PositionManager.step);

        this.shape.move();
    }

    private down(): void {
        this.shape.setY(this.shape.getY() + PositionManager.step);

        this.shape.move();
    }

    private left(): void {
        this.shape.setX(this.shape.getX() - PositionManager.step);

        this.shape.move();
    }

    private right(): void {
        this.shape.setX(this.shape.getX() + PositionManager.step);

        if (this.shape.getX() >= this.point.getX() && this.shape.getY() >= this.point.getY()) {
            console.log(11111111);
        }

        this.shape.move();
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
    }
}
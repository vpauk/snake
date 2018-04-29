import {Snake} from './Snake';
import {Section} from './Section';
import {App} from "./App";

export class PositionManager {

    constructor(
        protected context: CanvasRenderingContext2D,
        protected snake: Snake,
        protected section: Section,
        protected point: Section
    ) {
        this.onKeyDown();

        setInterval(() => {
            this.move();
        }, 500);
    }

    private up(): void {
        this.context.clearRect(0, 0, App.width, App.height);

        const list = this.snake.getList().slice(0);

        for (let item of list) {
            let nextPosition = item.getY() - App.step;

            if (item.getY() - App.step === this.point.getY() && item.getX() === this.point.getX()) {
                let clonePoint = Object.assign(new Section(this.context), this.point);
                clonePoint.setY(clonePoint.getY() - App.step);
                clonePoint.draw();
                this.snake.add(clonePoint);

                this.pointAdded();
            }

            item.setY(nextPosition);
            item.draw();
        }
    }

    private down(): void {
        this.context.clearRect(0, 0, App.width, App.height);

        const list = this.snake.getList().slice(0);
        for (let item of list) {
            let nextPosition = item.getY() + App.step;

            if (item.getY() + App.step === this.point.getY() && item.getX() === this.point.getX()) {
                let clonePoint = Object.assign(new Section(this.context), this.point);
                clonePoint.setY(clonePoint.getY() + App.step);
                clonePoint.draw();
                this.snake.add(clonePoint);

                this.pointAdded();
            }

            item.setY(nextPosition);
            item.draw();
        }
    }

    private left(): void {
        this.context.clearRect(0, 0, App.width, App.height);

        const list = this.snake.getList().slice(0);
        for (let item of list) {
            let nextPosition = item.getX() - App.step;

            if (item.getX() - App.step === this.point.getX() && item.getY() === this.point.getY()) {
                let clonePoint = Object.assign(new Section(this.context), this.point);
                clonePoint.setX(clonePoint.getX() - App.step);
                clonePoint.draw();
                this.snake.add(clonePoint);

                this.pointAdded();
            }

            item.setX(nextPosition);
            item.draw();
        }
    }

    private right(): void {
        this.context.clearRect(0, 0, App.width, App.height);

        const list = this.snake.getList().slice(0);
        for (let item of list) {
            let nextPosition = item.getX() + App.step;

            if (item.getX() + App.step === this.point.getX() && item.getY() === this.point.getY()) {
                let clonePoint = Object.assign(new Section(this.context), this.point);
                clonePoint.setX(clonePoint.getX() + App.step);
                clonePoint.draw();
                this.snake.add(clonePoint);

                this.pointAdded();
            }

            item.setX(nextPosition);
            item.draw();
        }
    }

    protected onKeyDown(): void {
        document.onkeydown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowDown":
                    this.section.setDirection(Section.DIRECTION_DOWN);
                    break;
                case "ArrowUp":
                    this.section.setDirection(Section.DIRECTION_UP);
                    break;
                case "ArrowLeft":
                    this.section.setDirection(Section.DIRECTION_LEFT);
                    break;
                case "ArrowRight":
                    this.section.setDirection(Section.DIRECTION_RIGHT);
                    break;
                default:
                    return;
            }
        }
    }

    protected move(): void {
        if (this.section.getDirection() === Section.DIRECTION_UP) {
            this.up();
        } else if (this.section.getDirection() === Section.DIRECTION_DOWN) {
            this.down();
        } else if (this.section.getDirection() === Section.DIRECTION_LEFT) {
            this.left();
        } else if (this.section.getDirection() === Section.DIRECTION_RIGHT) {
            this.right();
        }

        this.point.draw();
    }

    public pointAdded(): void {
        this.point = Section.create(this.context).random().draw();
    }
}
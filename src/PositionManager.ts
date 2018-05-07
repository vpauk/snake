import {Snake} from './Snake';
import {Section} from './Section';
import {App} from "./App";

export class PositionManager {

    protected change: {x: number, y: number, direction: string} = {x: -1, y: -1, direction: ''};

    constructor(
        protected context: CanvasRenderingContext2D,
        protected snake: Snake,
        protected point: Section
    ) {
        this.onKeyDown();

        setInterval(() => {
            this.move();
        }, 500);
    }

    private up(item: Section): void {
        this.context.clearRect(0, 0, App.width, App.height);
        let nextPosition = item.getY() - App.step;

        if (item.getY() - App.step === this.point.getY() && item.getX() === this.point.getX()) {
            let clonePoint = Object.assign(new Section(this.context), this.point);
            clonePoint.setY(clonePoint.getY() - App.step);
            clonePoint.setDirection(this.change.direction);
            clonePoint.draw();
            this.snake.add(clonePoint);

            this.pointAdded();
        }

        item.setY(nextPosition);
        item.draw();
    }

    private down(item: Section): void {
        this.context.clearRect(0, 0, App.width, App.height);

        let nextPosition = item.getY() + App.step;

        if (item.getY() + App.step === this.point.getY() && item.getX() === this.point.getX()) {
            let clonePoint = Object.assign(new Section(this.context), this.point);
            clonePoint.setY(clonePoint.getY() + App.step);
            clonePoint.setDirection(this.change.direction);
            clonePoint.draw();
            this.snake.add(clonePoint);

            this.pointAdded();
        }

        item.setY(nextPosition);
        item.draw();
    }

    private left(item: Section): void {
        this.context.clearRect(0, 0, App.width, App.height);

        let nextPosition = item.getX() - App.step;

        if (item.getX() - App.step === this.point.getX() && item.getY() === this.point.getY()) {
            let clonePoint = Object.assign(new Section(this.context), this.point);
            clonePoint.setX(clonePoint.getX() - App.step);
            clonePoint.setDirection(this.change.direction);
            clonePoint.draw();
            this.snake.add(clonePoint);

            this.pointAdded();
        }

        item.setX(nextPosition);
        item.draw();
    }

    private right(item: Section): void {
        this.context.clearRect(0, 0, App.width, App.height);

        let nextPosition = item.getX() + App.step;
        let isTest = false;

        if (item.getX() + App.step === this.point.getX() && item.getY() === this.point.getY()) {
            alert(1);
            let clonePoint = Object.assign(new Section(this.context), this.point);
            clonePoint.setX(clonePoint.getX() + App.step);
            clonePoint.setDirection(this.change.direction);
            clonePoint.draw();
            this.snake.add(clonePoint);

            this.pointAdded();
            alert(2);
            isTest = true;
        }

        console.log(nextPosition, item.getDirection());

        item.setX(nextPosition);
        item.draw();
        if (isTest) {
            alert(3);
        }
    }

    protected onKeyDown(): void {
        document.onkeydown = (event: KeyboardEvent) => {
            this.change.x = this.snake.getHead().getX();
            this.change.y = this.snake.getHead().getY();

            switch (event.key) {
                case "ArrowDown":
                    this.snake.getHead().setDirection(Section.DIRECTION_DOWN);
                    this.change.direction = Section.DIRECTION_DOWN;
                    break;
                case "ArrowUp":
                    this.snake.getHead().setDirection(Section.DIRECTION_UP);
                    this.change.direction = Section.DIRECTION_UP;
                    break;
                case "ArrowLeft":
                    this.snake.getHead().setDirection(Section.DIRECTION_LEFT);
                    this.change.direction = Section.DIRECTION_LEFT;
                    break;
                case "ArrowRight":
                    this.snake.getHead().setDirection(Section.DIRECTION_RIGHT);
                    this.change.direction = Section.DIRECTION_RIGHT;
                    break;
                default:
                    return;
            }
        }
    }

    protected move(): void {
        const list = this.snake.getList().slice(0);
    
        console.log('**************************');
        for (let item of list) {
            if (item.getX() === this.change.x && item.getY() === this.change.y && this.change.direction !== item.getDirection()) {
                item.setDirection(this.change.direction);
            }

            if (item.getDirection() === Section.DIRECTION_UP) {
                this.up(item);
            } else if (item.getDirection() === Section.DIRECTION_DOWN) {
                this.down(item);
            } else if (item.getDirection() === Section.DIRECTION_LEFT) {
                this.left(item);
            } else if (item.getDirection() === Section.DIRECTION_RIGHT) {
                this.right(item);
            }
        }

        this.point.draw();
    }

    public pointAdded(): void {
        this.point = Section.create(this.context).random().draw();
    }
}
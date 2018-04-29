import {App} from "./App";

export class Section {
    public static readonly DIRECTION_UP = 'up';
    public static readonly DIRECTION_RIGHT = 'right';
    public static readonly DIRECTION_DOWN = 'down';
    public static readonly DIRECTION_LEFT = 'left';

    protected width = 20;
    protected height = 20;
    protected x = 0;
    protected y = 0;
    protected color: string = '#FF0000';
    protected direction = Section.DIRECTION_DOWN;

    constructor(protected context: CanvasRenderingContext2D) {
    }

    public static create(context: CanvasRenderingContext2D): Section {
        return new Section(context);
    }

    public draw(): Section {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);

        return this;
    }

    public random(): Section {
        const range = Array.apply(null, Array(App.step + 1)).map((_: number, i: number) => {
            return i * App.step;
        });

        this.x = range[Math.floor(Math.random() * (App.step + 1))];
        this.y = range[Math.floor(Math.random() * (App.step + 1))];

        return this;
    }

    public getX(): number {
        return this.x;
    }

    public setX(x: number) {
        this.x = x;
    }

    public getY(): number {
        return this.y;
    }

    public setY(y: number) {
        this.y = y;
    }

    public getDirection(): string {
        return this.direction;
    }

    public setDirection(direction: string) {
        this.direction = direction;
    }
}
export abstract class Shape {

    public static readonly DIRECTION_UP = 'up';
    public static readonly DIRECTION_RIGHT = 'right';
    public static readonly DIRECTION_DOWN = 'down';
    public static readonly DIRECTION_LEFT = 'left';

    protected width = 0;
    protected heigh = 0;
    protected x = 0;
    protected y = 0;
    protected direction = Shape.DIRECTION_DOWN;

    constructor(public context: CanvasRenderingContext2D) {
    }

    public abstract draw(): void;
    public abstract move(): void;

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
        this.direction = direction;;
    }
}
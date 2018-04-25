import {Shape} from './Shape';

export class Cube extends Shape {
    protected width = 20;
    protected heigh = 20;
    protected x = 0;
    protected y = 0;
    protected color: string = '#FF0000';

    constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.draw();
    }

    public draw(): void {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.heigh);   
    }

    public move(): void {
        this.context.clearRect(0, 0, 400, 400);
        this.draw();
    }
}
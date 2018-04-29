import {Shape} from './Shape';

export class Section extends Shape {
    protected width = 20;
    protected heigh = 20;
    protected x = 0;
    protected y = 0;
    protected color: string = '#FF0000';

    constructor(context: CanvasRenderingContext2D) {
        super(context);

        this.draw();
    }

    public static create(context: CanvasRenderingContext2D): Section {
        return new Section(context);
    }

    public draw(): Section {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.heigh);   

        return this;
    }

    public random(): Section {
        const range = Array.apply(null, Array(21)).map((_: number, i: number) => {
            return i * 20;
        });

        this.x = range[Math.floor(Math.random() * 21)];
        this.y = range[Math.floor(Math.random() * 21)];

        return this;
    }
}
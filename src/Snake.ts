import { Section } from "./Shape/Section";
import { Shape } from "./Shape/Shape";

export class Snake {
    protected list: Array<Shape> = [];

    constructor(protected context: CanvasRenderingContext2D) {
        this.list = [];
    }

    public add(item: Shape): void {
        this.list.push(item);
    }

    public getList(): Array<Shape> {
        return this.list;
    }
}
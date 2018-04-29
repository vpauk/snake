import { Section } from "./Section";

export class Snake {
    protected list: Array<Section> = [];

    constructor(protected context: CanvasRenderingContext2D) {
        this.list = [];
    }

    public add(item: Section): void {
        this.list.push(item);
    }

    public getList(): Array<Section> {
        return this.list;
    }
}
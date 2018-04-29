import { Section } from "./Section";

export class Snake {
    protected list: Array<Section> = [];

    public add(item: Section): void {
        this.list.push(item);
    }

    public getList(): Array<Section> {
        return this.list;
    }
}
export class Task{
    name: string;
    description: string;
    isDescriptionVisible: boolean;
    color: string;

    constructor(name: string, description: string, isDescriptionVisible: boolean, color: string) {
        this.name = name;
        this.description = description;
        this.isDescriptionVisible = isDescriptionVisible;
        this.color = color;
    }
}
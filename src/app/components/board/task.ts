export class Task{
    name: string;
    description: string;
    isDescriptionVisible: boolean;

    constructor(name: string, description: string, isDescriptionVisible: boolean) {
        this.name = name;
        this.description = description;
        this.isDescriptionVisible = isDescriptionVisible;
    }
}
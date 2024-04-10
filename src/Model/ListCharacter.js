
export class ListCharacter {
    #characters;

    constructor() {
        this.#characters = [];
    }

    addCharacter(character) {
        this.#characters.push(character);
    }

    getCharacters() {
        return this.#characters;
    }

}

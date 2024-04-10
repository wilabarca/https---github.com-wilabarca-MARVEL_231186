export class MarvelCharacter {
    #id;
    #name;
    #description;
    #thumbnail;

    setId(id) { this.#id = id; }
    getId() { return this.#id; }

    setName(name) { this.#name = name; }
    getName() { return this.#name; }

    setDescription(description) { this.#description = description; }
    getDescription() { return this.#description; }

    setThumbnail(thumbnail) { this.#thumbnail = thumbnail; }
    getThumbnail() { return this.#thumbnail; }
}


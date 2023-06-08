class Car {
    #maxTank; //Скрыть свойство
    constructor(brand, model, maxTank) {
        this.brand = brand;
        this.model = model;
        this.#maxTank = maxTank;
        this.nowTank = Math.floor(Math.random() * maxTank);
    }

    getTitle() {
        return `${this.brand} ${this.model}`;
    }

    setModel(model) {
        this.model = model;
        return this;
    }

    needPetrol() {
        return this.#maxTank - this.nowTank;
    }

    fillUp() {
        this.nowTank = this.#maxTank;
        return this;
    }

    get maxTank() {
        return this.#maxTank;
    }

    set maxTank(data) {
        console.log(`Нельзя менять значение на ${data}`);
    }
}

export const opel = new Car('Opel', 'Crossland', 45);

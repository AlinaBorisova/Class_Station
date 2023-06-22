import { Column } from './column';
import { RenderStation } from './renderStation'

export class Station {
    #queue = [];
    #filling = [];
    #ready = [];

    constructor(typeStation, renderApp = null) {
        this.typeStation = typeStation;
        this.typeStation.push(this.addGasStation());
        this.getTypeStation(typeStation);
        this.renderApp = renderApp;
        this.renderStation = null;
    }

    addGasStation() {
        this.gasStation = {type: 'gaz'};
        return this.gasStation;
    }

    getTypeStation(typeStation) {
        this.typeStation.forEach((station, i) => {
            this.typeStation[i].count = 1;
            this.typeStation[i].speed = 5;
        })
    }

    get filling() {
        return this.#filling;
    }

    get queue() {
        return this.#queue;
    }

    init() {
        this.render();

        setInterval(() => {
            this.checkQueueToFilling();
        }, 2000);
    }

    render() {
        for (const optionStation of this.typeStation) {
            for (let i = 0; i < optionStation.count; i++) {
                this.filling.push(new Column(optionStation.type, optionStation.speed));
            }
        }

        if (this.renderApp) {
            this.renderStation = new RenderStation(this.renderApp, this);
        }
    }

    checkQueueToFilling() {
        if (this.#queue.length) {
            for (let i = 0; i < this.#queue.length; i++) {
                for(let j = 0; j < this.#filling.length; j++) {
                    if (!this.#filling[j].car &&
                        this.#queue[i].typeFuel === this.#filling[j].type) {
                           this.#filling[j].car = this.#queue.splice(i, 1)[0];
                           this.fillingGo(this.#filling[j]);
                           this.renderStation.renderStation();
                           break;
                        }
                }
            }
        }
    }

    fillingGo(column) {
        const car = column.car;
        const needPetrol = car.needPetrol;
        let nowTank = car.nowTank;
        const timerId = setInterval(() => {
            console.log(car.getTitle(), nowTank)
            nowTank += column.speed;
            if (nowTank >= car.maxTank) {
                clearInterval(timerId);
                const total = car.nowTank - needPetrol;
                car.fillUp();
                column.car = null;
                this.leaveClient({car, total})
            }
        }, 1000);
    }

    leaveClient({car, total}) {
        this.#ready.push(car);
        this.renderStation.renderStation();
    }

    addCarQueue(car) {
        this.#queue.push(car);
        this.renderStation.renderStation();
    }
}
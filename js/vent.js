import riot from 'riot';

export default class Vent {
    constructor () {
        riot.observable(this);
    }
}

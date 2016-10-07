'use strict';

export default class Discount {
    constructor (config) {
        this.config = config;
    }

    value (price, quantity) {
        return (Math.round(price * 100) * this.discountQuantity(quantity) * -1) / 100;
    }

    discountQuantity (quantity) {
        return Math.floor(quantity / this.config.thresholdItems) * this.config.freeItems;
    }
}

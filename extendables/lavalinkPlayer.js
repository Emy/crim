const { Extendable } = require('klasa');

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, {
            enabled: true,
            appliesTo: []
        });
    }

    get () {
        // `this` refers to the parent class, and not this one. You cannot use super.
        ;
    }

};

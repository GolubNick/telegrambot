'use strict'

class User {
    constructor(...params) {
        this.name = params[0];
        this.id = params[1];
        this.day = params[2];
    }

    get getName() {
        return this.name;
    }
    get getId() {
        return this.id;
    }
    get getDay() {
        return this.day;
    }

    set setName(newValue) {
        this.name = newValue;
    }
    set setId(newValue) {
        this.id = newValue;
    }
    set setDay(newValue) {
        this.day = newValue;
    }
}
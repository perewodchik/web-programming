import {PersonFactory} from './personFactory.js';

export class School {
    constructor() {
        this.personArray = [];
        this.personFactory = new PersonFactory();
    }
    
    add(type,params) {
        this.personArray.push(this.personFactory.create(type, params));
    }

    remove(name) {
        let index = this.personArray.findIndex(function (person) {
            return person.name === name;
        });
        
        this.personArray.splice(index, 1); 
    }

    find(name) {
        return this.personArray.find(function(person) {
            return person.name === name;
        });
    }

    render() {
        this.personArray.forEach(function(element) {
            element.initialize();
        })
    }

}
import {Person, Shinobi, Trainer} from './personLib.js';

export class PersonFactory {
    createPerson(params) {
        return new Person(params);
    }
    createShinobi(params) {
        return new Shinobi(params);
    }
    createTrainer(params) {
        return new Trainer(params);
    }
    create(type, params) {
        let instance;
        switch(type) {
            case "shinobi": instance = this.createShinobi(params); break;
            case "trainer": instance = this.createTrainer(params); break;
            default: instance = this.createPerson(params); break; 
        }
        instance.id = Math.floor(Math.random() * 1024);
        
        return instance;
    }
    
};
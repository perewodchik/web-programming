import {School} from './school.js';

window.onload = function(){
    let  school = new School();
    school.add("trainer", {
        name : "Kakashi Hatake",
        birthDate: new Date(1980, 7, 7),
        imgUrl: "img/kakashi.png",
        team: "Team 7",
        jutsu: "Sharingan"
    });
    school.add("shinobi", {
        name: "Naruto Uzumaki", 
        village: "Konohagakure", 
        rank: "Hokage", 
        birthDate: new Date(2000, 5, 13), 
        imgUrl: "img/naruto.jpg"
    });
    school.add("shinobi", {
        name: "Sasuke Uchiha",
        birthDate: new Date(1999, 1, 1),
        imgUrl: "img/sasuke.jpg",
        rank: "Genin",
    });
    school.add("shinobi", {
        name: "Sakura Haruno",
        birthDate: new Date(1998, 2, 3),
        imgUrl: "img/sakura.jpg",
        rank: "Jonin",
        village: "Konohagakure"
    });
    
    school.render();
};
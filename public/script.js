class Person {
    constructor(params)
    {
        this.name = params.name || "no name";  
        this.birthDate = params.birthDate || new Date(1900,1,1);
        this.imgUrl = params.imgUrl || "img/default.png";
    }

    static cardsMenu() {
        return document.getElementById("card-menu");
    }

    makeBadge() {
        let badge = document.createElement("div");
        let badgeButtonContainer = document.createElement("div");
        let badgeButton = document.createElement("img");
        let badgeDescription = document.createElement("div");
        let badgeName = document.createElement("div");
        let badgeBirthDate = document.createElement("div");
        let badgeImage = document.createElement("img");

        badge.classList.add("badge");
        badgeButtonContainer.classList.add("badge__button-container");
        badgeButton.classList.add("badge__button");
        badgeDescription.classList.add("badge__description");
        badgeName.classList.add("badge__name");
        badgeBirthDate.classList.add("badge__birthdate");
        badgeImage.classList.add("badge__image");
        
        badgeButton.setAttribute("src", "img/X_button.webp");
        badgeName.textContent = this.name;
        badgeBirthDate.textContent = this.birthDate.getDate() + "." + (+this.birthDate.getMonth() + 1) + "." + this.birthDate.getUTCFullYear();
        badgeImage.setAttribute("src", this.imgUrl);

        badgeButtonContainer.appendChild(badgeButton);
        badgeDescription.appendChild(badgeName);
        badgeDescription.appendChild(badgeBirthDate);

        badge.appendChild(badgeButtonContainer);
        badge.appendChild(badgeDescription);
        badge.appendChild(badgeImage);

        badgeButton.addEventListener("click", function() {
            this.parentNode.parentNode.remove();
        })

        return badge;
    }

    makeCard() {
        let card = document.createElement("div");
        let imgElement = document.createElement("img");
        let nameElement = document.createElement("div");
        let descElement = document.createElement("div");

        card.id = this.name;
        card.setAttribute("id", this.name);
        card.classList.add("card");
        imgElement.classList.add("class", "card__image")
        nameElement.classList.add("class", "card__name");
        descElement.classList.add("class", "card__description");

        imgElement.setAttribute("src", this.imgUrl);
        nameElement.textContent = this.name;
        descElement.textContent = "A Person";

        card.appendChild(imgElement);
        card.appendChild(nameElement);
        card.appendChild(descElement);

        let badge = this.makeBadge();
        card.addEventListener("click", function() {

            let x = this.getBoundingClientRect().right - 100;
            let y = this.getBoundingClientRect().top;
            console.log(x,y);
            badge.style.left = x + "px";
            badge.style.top = y + "px";
            document.body.appendChild(badge);
        });

        return card;
    }

    initialize() {
        Shinobi.cardsMenu().appendChild(this.makeCard());
    }
}

/* Shinobi has 2 additional fields - village and rank */
class Shinobi extends Person {
    constructor(params)
    {
        super(params);
        this.village = params.village || "None";
        this.rank = params.rank || "No rank";
    }

    makeCard() {
        let shinobiCard = super.makeCard();
        let descElement = shinobiCard.getElementsByClassName("card__description")[0];
        descElement.textContent = this.village + ", " + this.rank;

        return shinobiCard;
    }

    makeBadge() {
        let shinobiBadge = super.makeBadge();
        let badgeVillage = document.createElement("div");
        let badgeRank = document.createElement("div");
        let badgeDescription = shinobiBadge.getElementsByClassName("badge__description")[0];
       
        badgeVillage.classList.add("badge__village");
        badgeRank.classList.add("badge__rank");
        
        badgeVillage.textContent = this.village;
        badgeRank.textContent = this.rank;

        badgeDescription.appendChild(badgeVillage);
        badgeDescription.appendChild(badgeRank);

        return shinobiBadge;
    }
}

/* Has 2 additional field - training team and jutsu */
class Trainer extends Person {
    constructor(params)
    {
        super(params);
        this.team = params.team;
        this.jutsu = params.jutsu;
    }

    makeCard() {
        let trainerCard = super.makeCard();
        let descElement = trainerCard.getElementsByClassName("card__description")[0];
        descElement.textContent = this.team + ", " + this.jutsu;

        return trainerCard;
    }

    makeBadge() {
        let trainerBadge = super.makeBadge();
        let badgeTeam = document.createElement("div");
        let badgeJutsu = document.createElement("div");
        let badgeDescription = trainerBadge.getElementsByClassName("badge__description")[0];
       
        badgeTeam.classList.add("badge__team");
        badgeJutsu.classList.add("badge__jutsu");
        
        badgeTeam.textContent = this.team;
        badgeJutsu.textContent = this.jutsu;

        badgeDescription.appendChild(badgeTeam);
        badgeDescription.appendChild(badgeJutsu);

        return trainerBadge;
    }
}

class PersonFactory {
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

class School {
    constructor() {
        this.personArray = [];
        this.personFactory = new PersonFactory();
    }
    
    add(type,params) {
        this.personArray.push(this.personFactory.create(type, params));
    }

    remove(name) {
        let index = this.personArray.findIndex(function (person) {
            return person.name == name;
        });
        
        this.personArray.splice(index, 1); 
    }

    find(name) {
        return this.personArray.find(function(person) {
            return person.name == name;
        });
    }

    render() {
        this.personArray.forEach(function(element) {
            element.initialize();
        })
    }

}

window.onload = function(){
    let  school = new School();
    school.add("trainer", {
        name : "Kakashi Hatake",
        birthDate: new Date(1980, 07,07),
        imgUrl: "img/kakashi.png",
        team: "Team 7",
        jutsu: "Sharingan"
    });
    school.add("shinobi", {
        name: "Naruto Uzumaki", 
        village: "Konohagakure", 
        rank: "Hokage", 
        birthDate: new Date(2000, 05, 13), 
        imgUrl: "img/naruto.jpg"
    });
    school.add("shinobi", {
        name: "Sasuke Uchiha",
        birthDate: new Date(1999,01,01),
        imgUrl: "img/sasuke.jpg",
        rank: "Genin",
    });
    school.add("shinobi", {
        name: "Sakura Haruno",
        birthDate: new Date(1998, 02, 03),
        imgUrl: "img/sakura.jpg",
        rank: "Jonin",
        village: "Konohagakure"
    });
    school.add("Person", {
        name: "Random Person"
    });
    school.add("trainer", {
        name: "PersonToBeRemoved"
    })

    school.remove("PersonToBeRemoved");

    school.render();
};


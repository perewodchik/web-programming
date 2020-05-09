class Shinobi {
    constructor(name, village, rank, birthDate, imgUrl)
    {
        this.name = name;
        this.village = village;
        this.rank = rank;
        this.birthDate = birthDate;
        this.imgUrl = imgUrl;
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
        let badgeVillage = document.createElement("div");
        let badgeRank = document.createElement("div");
        let badgeImage = document.createElement("img");

        badge.classList.add("badge");
        badgeButtonContainer.classList.add("badge__button-container");
        badgeButton.classList.add("badge__button");
        badgeDescription.classList.add("badge__description");
        badgeName.classList.add("badge__name");
        badgeBirthDate.classList.add("badge__birthdate");
        badgeVillage.classList.add("badge__village");
        badgeRank.classList.add("badge__rank");
        badgeImage.classList.add("badge__image");

        badgeButton.setAttribute("src", "img/X_button.webp");
        badgeName.textContent = this.name;
        badgeBirthDate.textContent = this.birthDate.getDate() + "." + (+this.birthDate.getMonth() + 1) + "." + this.birthDate.getUTCFullYear();
        badgeVillage.textContent = this.village;
        badgeRank.textContent = this.rank;
        badgeImage.setAttribute("src", this.imgUrl);

        badgeButtonContainer.appendChild(badgeButton);

        badgeDescription.appendChild(badgeName);
        badgeDescription.appendChild(badgeBirthDate);
        badgeDescription.appendChild(badgeVillage);
        badgeDescription.appendChild(badgeRank);

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
        descElement.textContent = this.village + ", " + this.rank;

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

window.onload = function(){
    shinobiArray = [];
    shinobiArray.push(new Shinobi("Naruto Uzumaki", "Konohagakure", "Hokage", new Date(2000, 05, 13), "img/naruto.jpg"));
    shinobiArray.push(new Shinobi("Sasuke Uchiha", "Konohagakure", "genin", new Date(1999, 01, 01), "img/sasuke.jpg"));
    shinobiArray.push(new Shinobi("Sakura Haruno", "Konohagakure", "jonin", new Date(1998, 02, 03), "img/sakura.jpg"));
    shinobiArray.forEach(function(element) {
        element.initialize();
    });
};

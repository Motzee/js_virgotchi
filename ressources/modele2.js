/*Création d'une créature*/

function boutonInvoquerCreature() {
    let formulaireCreation = document.getElementById("creation");

    formulaireCreation.addEventListener("click", function(e) {
        //empêcher la redirection vers action
        e.preventDefault();

        //insertion de la créature invoquée dans le localStorage
        let nomCreature = document.getElementById("nomBapteme").value;

        let choixNature = recupValeurBoutonRadio("choixType");

        invocationCreature(nomCreature, choixNature);

        //redirection vers l'écran
        location.reload();
    });
}

function invocationCreature(nom, nature) {

    //création d'un objet JS
    let laCreature = new Creature(nom, nature);

    //on calcule le nombre de créatures possédées : à faire
    let nbCreatures = localStorage.length;

    if (nbCreatures === 0) {
        nbCreatures += 1;
    }

    let clefCreature = "creature" + nbCreatures;

    console.log(clefCreature);
    console.log(laCreature);

    sauvegarderDsLocalStorage(clefCreature, laCreature);

}



function boutonRevoquerCreatures() {
    let boutonRevoque = document.getElementById("actionRevoquer");

    boutonRevoque.addEventListener("click", function() {
        //à terme, utiliser plutôt localStorage.removeItem('nomDeCreature') ;
        localStorage.clear();
        location.reload();
    });

}

/*Prototype de créature*/
function Creature(nom, natureuh) {
    this.nom = nom;
    this.nature = natureuh;
    this.dateNais = new Date();

    //stats de base
    this.stade = 0;
    this.stats = {
        faim: 100,
        hygiene: 100,
        amusement: 50,
        sommeil: 50
    };

    //acquises, génèse aléatoire (gausse à faire), entrainement possible
    this.competences = {
        intelligence: nbAleaBornesInclues(3, 5),
        force: nbAleaBornesInclues(2, 5),
        memoire: nbAleaBornesInclues(3, 5),
        attachement: nbAleaBornesInclues(4, 5)
    };

    //innées, génèse aléatoire (gausse à faire), modifications difficiles
    this.caractere = {
        gentillesse: nbAleaBornesInclues(-2, 12) / 10,
        patience: nbAleaBornesInclues(-2, 12) / 10,
        malice: nbAleaBornesInclues(-2, 12) / 10,
        sociabilite: nbAleaBornesInclues(-2, 12) / 10,
        expressivite: nbAleaBornesInclues(-2, 12) / 10,
        creativite: nbAleaBornesInclues(-2, 12) / 10
    };

}

/* Boutons d'action*/

let nourrir = function(nom) {
    nom.stats.faim += 60;
    nom.stats.faim = statsSansExces(nom.stats.faim);
    nom.stats.hygiene -= 5;
    nom.stats.hygiene = statsSansExces(nom.stats.hygiene);
}

let nettoyer = function(nom) {
    nom.stats.hygiene += 50;
    nom.stats.hygiene = statsSansExces(nom.stats.hygiene);
}

let faireDormir = function(nom) {
    nom.stats.sommeil += 80;
    nom.stats.sommeil = statsSansExces(nom.stats.sommeil);
    nom.stats.faim -= 30;
    nom.stats.faim = statsSansExces(nom.stats.faim);
    nom.stats.amusement -= 20;
    nom.stats.amusement = statsSansExces(nom.stats.amusement);
}

let cajoler = function(nom) {
    nom.stats.amusement += 10;
    nom.stats.amusement = statsSansExces(nom.stats.amusement);
    nom.competences.attachement += 0.25;
    nom.caractere.gentillesse += 0.001;
}

let jouer = function(nom) {
    nom.stats.amusement += 50;
    nom.stats.amusement = statsSansExces(nom.stats.amusement);
    nom.stats.sommeil -= 30;
    nom.stats.sommeil = statsSansExces(nom.stats.sommeil);
    nom.stats.hygiene -= 15;
    nom.stats.hygiene = statsSansExces(nom.stats.hygiene);
    nom.competences.force += 2;
}

let faireEtudier = function(nom) {
    nom.stats.amusement -= 10;
    nom.stats.amusement = statsSansExces(nom.stats.amusement);
    nom.stats.sommeil -= 30;
    nom.stats.sommeil = statsSansExces(nom.stats.sommeil);
    nom.stats.faim -= 20;
    nom.stats.faim = statsSansExces(nom.stats.faim);
    nom.competences.intelligence += 3;
}

//régulation des stats (gérer les extrèmes)
function statsSansExces(valeur) {
    if (valeur > 120) {
        valeur = 120;
        return valeur;
    } else if (valeur < -20) {
        valeur = -20;
        return valeur;
    } else {
        return valeur;
    }
}

/* Gestion des sauvegardes de la créature */
function sauvegarderDsLocalStorage(clef, objetATransformer) {
    let stringObtenue = JSON.stringify(objetATransformer); //on transforme l'objet en string

    localStorage.setItem(clef, stringObtenue);

    localStorage.setItem("creatureActuelle", clef);
}

function restaurerObjetDuLocalStorage(stringATransformer) {
    let objetObtenu = localStorage.getItem(stringATransformer);
    objetObtenu = JSON.parse(objetObtenu);

    return objetObtenu;
}


/* Fonctions atomiques*/

//Check un input de type radio pour récupérer sa valeur en JS
function recupValeurBoutonRadio(valeurName) {
    let selecteur = 'input[name="' + valeurName + '"]';

    let collectionDeBoutons = document.querySelectorAll(selecteur);

    for (var i = 0; i < collectionDeBoutons.length; i++) {

        if (collectionDeBoutons[i].checked) {
            return collectionDeBoutons[i].value;
        }
    }
}

//fonction de création de nb aléatoire dans un intervalle
function nbAleaBornesInclues(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function affichageEcrans() {
    let nbCreature = localStorage.length;

    let cadreCreature = document.createElement("main");
    //si aucune créature invoquée
    if (typeof nbCreature == "undefined" || nbCreature === 0) {
        cadreCreature.id = "pageCreation";
        cadreCreature.innerHTML = '<form id="formCreation" action="#" method="POST"><fieldset><legend>Invocation</legend><p>Sélectionnez le type de créature à invoquer :<br/><input class="choixCreature" type="radio" name="choixType" value="ruruka" id="ruruka" checked /> <label for="ruruka">Ruruka</label><input class="choixCreature" type="radio" name="choixType" value="nanoda" id="nanoda" /> <label for="nanoda">Nanoda</label></p><p><label for="nomBapteme">Donnez un nom à votre créature pour l\'attacher à vous :</label><br/><input name="nomBapteme" id="nomBapteme" type="text" maxlength="32" required /></p><input id="creation" type="submit" value="Invoquer" /></fieldset></form>';
        document.body.appendChild(cadreCreature);

        boutonInvoquerCreature();
    }

    //si plusieurs créatures : proposer un écran de choix de créatures
    else if (nbCreature > 1) {
        cadreCreature.id = "pageChoixCreature";
        cadreCreature.innerHTML = '<p>Vous avez invoqué plusieurs créatures, choisissez celle à rappeler :<li id="actionRevoquer">[X]</li>';
        document.body.appendChild(cadreCreature);

        boutonRevoquerCreatures();

        //il faudra voir pour appeler localStorage.getItem("creature1") avec le numéro du truc choisi
    }

    //si une seule créature
    else {
        cadreCreature.id = "ecranCreature";
        cadreCreature.innerHTML = '<main><section id="screenCreature"><div id="infosCreature"></div><aside id="statsCreature"><div id="statFaim" class="jauge"></div><div id="statHygiene" class="jauge"></div><div id="statAmuse" class="jauge"></div><div id="statSommeil" class="jauge"></div></aside><figure id="imgCreature"></figure></section><section id="menuInteractions"><ul id="listeActions"><li id="actionNourrit" class="action">Nourrir</li><li id="actionNettoie" class="action">Nettoyer</li><li id="actionDodo" class="action">Faire dormir</li><li id="actionCajole" class="action">Cajoler</li><li id="actionJoue" class="action">Jouer</li><li id="actionEnseigne" class="action">Faire étudier</li><li id="actionRevoquer" title="Révoquer la créature">[X]</li></ul></section></main>';
        document.body.appendChild(cadreCreature);
        boutonRevoquerCreatures();
        console.log(localStorage.getItem("creature1"));
    }
}

//boutons d'interaction
let boutonNourrit = document.getElementById("actionNourrit");
let boutonNettoie = document.getElementById("actionNettoie");
let boutonDodo = document.getElementById("actionDodo");
let boutonCajole = document.getElementById("actionCajole");
let boutonJoue = document.getElementById("actionJoue");
let boutonEnseigne = document.getElementById("actionEnseigne");

//affichage de la créature en fonction de son stade
function avatarCreature(nom) {
    let figureCreature = document.getElementById("imgCreature");
    figureCreature.textContent = "";
    let apercuCreature = new Image();
    let lienAvatar = "img/" + nom.galerie[nom.stade];
    apercuCreature.src = lienAvatar;
    apercuCreature.alt = nom.nom + ", au stade " + nom.stade;

    figureCreature.appendChild(apercuCreature);
}

//affichage des statistiques créature
let statFaim = document.getElementById("statFaim");
let statHygiene = document.getElementById("statHygiene");
let statAmuse = document.getElementById("statAmuse");
let statSommeil = document.getElementById("statSommeil");

function debugStats(creature) {

    statFaim.textContent = "";
    statHygiene.textContent = "";
    statAmuse.textContent = "";
    statSommeil.textContent = "";

    let niveauFaim = document.createElement("span");
    niveauFaim.textContent = "faim : " + creature.stats.faim;
    statFaim.appendChild(niveauFaim);

    let niveauHygiene = document.createElement("span");
    niveauHygiene.textContent = "hygiène : " + creature.stats.hygiene;
    statHygiene.appendChild(niveauHygiene);

    let niveauAmuse = document.createElement("span");
    niveauAmuse.textContent = "amusé/e : " + creature.stats.amusement;
    statAmuse.appendChild(niveauAmuse);

    let niveauSommeil = document.createElement("span");
    niveauSommeil.textContent = "sommeil : " + creature.stats.sommeil;
    statSommeil.appendChild(niveauSommeil);
}

function ajusteJaugesStats(nomCreature, typeJauge) {
    let nbPointsStat = nomCreature['stats'][typeJauge] + 20;
    let aspectJauge = "linear-gradient(to right, transparent, transparent " + nbPointsStat + "px, white " + nbPointsStat + "px, white), linear-gradient(to right, #ca5f60, #d7cf88, #61a637)";
    return aspectJauge;
}

function afficheJaugesStats(creature) {
    statFaim.style.background = ajusteJaugesStats(creature, "faim");
    statHygiene.style.background = ajusteJaugesStats(creature, "hygiene");
    statAmuse.style.background = ajusteJaugesStats(creature, "amusement");
    statSommeil.style.background = ajusteJaugesStats(creature, "sommeil");
}

//affichage infos créature (nom, age)
function afficherInfosCreature(nom) {

    let infosCreature = document.getElementById("infosCreature");

    let vieCreature = document.createElement("p");
    if (calculAge(creature) > 1) {
        vieCreature.textContent = calculAge(creature) + " jours";
    } else {
        vieCreature.textContent = calculAge(creature) + " jour";
    }
    infosCreature.appendChild(vieCreature);

}
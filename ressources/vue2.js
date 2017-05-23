/* Affichage de l'interface en fonction du contenu (ou non) de localStorage */

function affichageEcrans() {
    let nbCreature = localStorage.length - 1;

    let cadreCreature = document.createElement("main");

    //si aucune créature invoquée
    if (typeof nbCreature == "undefined" || nbCreature <= 0) {
        cadreCreature.id = "pageCreation";
        cadreCreature.innerHTML = '<form id="formCreation" action="#" method="POST"><fieldset><legend>Invocation</legend><p>Sélectionnez le type de créature à invoquer :<br/><input class="choixCreature" type="radio" name="choixType" value="ruruka" id="ruruka" checked /> <label for="ruruka">Ruruka</label><input class="choixCreature" type="radio" name="choixType" value="nanoda" id="nanoda" /> <label for="nanoda">Nanoda</label></p><p><label for="nomBapteme">Donnez un nom à votre créature pour l\'attacher à vous :</label><br/><input name="nomBapteme" id="nomBapteme" type="text" maxlength="32" required /></p><input id="creation" type="submit" value="Invoquer" /></fieldset></form>';
        document.body.appendChild(cadreCreature);
    }

    //si plusieurs créatures : proposer un écran de choix de créatures
    else if (nbCreature > 1) {
        cadreCreature.id = "pageChoixCreature";
        cadreCreature.innerHTML = '<p>Vous avez invoqué plusieurs créatures, choisissez celle à rappeler</p>';
        document.body.appendChild(cadreCreature);
        //il faudra voir pour appeler localStorage.getItem("creature1") avec le numéro du truc choisi
    }

    //si une seule créature
    else {
        cadreCreature.id = "ecranCreature";
        cadreCreature.innerHTML = '<section id="screenCreature"><div id="infosCreature"></div><aside id="statsCreature"><div id="statFaim" class="jauge"></div><div id="statHygiene" class="jauge"></div><div id="statAmuse" class="jauge"></div><div id="statSommeil" class="jauge"></div></aside><figure id="imgCreature"></figure></section><section id="menuInteractions"><ul id="listeActions"><li><img id="boutonSave" src="img/icon_save.png" alt="sauvegarder" title="Enregistrer" /></li><li id="actionNourrit" class="action">Nourrir</li><li id="actionNettoie" class="action">Nettoyer</li><li id="actionDodo" class="action">Faire dormir</li><li id="actionCajole" class="action">Cajoler</li><li id="actionJoue" class="action">Jouer</li><li id="actionEnseigne" class="action">Faire étudier</li><li id="actionRevoquer" title="Révoquer la créature">[X]</li></ul></section>';
        document.body.appendChild(cadreCreature);
    }
}



//affichage infos créature (nom, age)
function afficherInfosCreature(nom, type, dateNais) {

    let infosCreature = document.getElementById("infosCreature");

    let typeCreature = document.createElement("em");
    typeCreature.textContent = ", type " + type;

    let nomCreature = document.createElement("h1");
    nomCreature.textContent = nom;
    nomCreature.appendChild(typeCreature);

    let vieCreature = document.createElement("p");
    vieCreature.textContent = dateNais;
    /*
        if (calculAge(creature) > 1) {
            vieCreature.textContent = calculAge(creature) + " jours";
        } else {
            vieCreature.textContent = calculAge(creature) + " jour";
        }*/
    infosCreature.appendChild(nomCreature);
    infosCreature.appendChild(vieCreature);

}



//affichage de la créature en fonction de son stade
function avatarCreature(nom, nature, stade) {
    let figureCreature = document.getElementById("imgCreature");
    figureCreature.textContent = "";
    let apercuCreature = new Image();

    let nanoda = ["cybunny_bebe.png", "cybunny_jeune.png", "cybunny_ado.png"];

    let ruruka = ["ruruka_bebe.png", "ruruka_ado.png", "ruruka_adulte.png"];
    let lienAvatar = "";
    switch (nature) {
        case "nanoda":
            lienAvatar = "img/" + nanoda[stade];
            break;
        case "ruruka":
            lienAvatar = "img/" + ruruka[stade];
            break;
        default:
            alert("erreur dans le choix de l'avatar");
    }


    apercuCreature.src = lienAvatar;
    apercuCreature.alt = nom + ", au stade " + stade;

    figureCreature.appendChild(apercuCreature);
}
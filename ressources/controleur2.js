affichageEcrans();

let typePage = document.querySelector("main").id;
switch (typePage) {
    case "pageCreation":
        boutonInvoquerCreature();
        break;

        //plusieurs créatures
    case "pageChoixCreature":
        //non prévu pour l'instant
        break;

        //une seule créature
    case "ecranCreature":
        let laCreature = restaurerObjetDuLocalStorage(localStorage.getItem("creatureActuelle"));
        console.log(laCreature);

        let age = 1; //age à calculer
        afficherInfosCreature(laCreature.nom, laCreature.nature, age);
        avatarCreature(laCreature.nom, laCreature.nature, laCreature.stade);
        afficheStats();
        afficheJaugesStats(laCreature);

        debugStats(laCreature);
        boutonRevoquerCreatures();

        /*Evenements : clic sur des boutons d'action*/
        let boutonNourrit = document.getElementById("actionNourrit");
        let boutonNettoie = document.getElementById("actionNettoie");
        let boutonDodo = document.getElementById("actionDodo");
        let boutonCajole = document.getElementById("actionCajole");
        let boutonJoue = document.getElementById("actionJoue");
        let boutonEnseigne = document.getElementById("actionEnseigne");

        //Nourrir
        boutonNourrit.addEventListener("click", function() {
            nourrir(laCreature);
            debugStats(laCreature);
            afficheJaugesStats(laCreature);
        });

        //Nettoyer
        boutonNettoie.addEventListener("click", function() {
            nettoyer(laCreature);
            debugStats(laCreature);
            afficheJaugesStats(laCreature);
        });

        //Faire dormir
        boutonDodo.addEventListener("click", function() {
            faireDormir(laCreature);
            debugStats(laCreature);
            afficheJaugesStats(laCreature);
        });

        //Cajoler
        boutonCajole.addEventListener("click", function() {
            cajoler(laCreature);
            debugStats(laCreature);
            afficheJaugesStats(laCreature);
        });

        //Jouer
        boutonJoue.addEventListener("click", function() {
            jouer(laCreature);
            debugStats(laCreature);
            afficheJaugesStats(laCreature);
        });
        //Faire étudier
        boutonEnseigne.addEventListener("click", function() {
            faireEtudier(laCreature);
            debugStats(laCreature);
            afficheJaugesStats(laCreature);
        });

        break;

    default:
        console.log("erreur dans la sélection de l'écran");
}
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
        boutonRevoquerCreatures();

        afficherInfosCreature(laCreature.nom, laCreature.nature, 1);
        break;

    default:
        console.log("erreur dans la sélection de l'écran");
}
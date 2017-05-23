function boutonRevoquerCreatures() {
    let boutonRevoque = document.getElementById("actionRevoquer");

    boutonRevoque.addEventListener("click", function() {
        //à terme, utiliser plutôt localStorage.removeItem('nomDeCreature') ;
        localStorage.clear();
        location.reload();
    });

}


function boutonInvoquerCreature() {
    let formulaireCreation = document.getElementById("creation");

    formulaireCreation.addEventListener("click", function(e) {
        //empêcher la redirection vers action
        e.preventDefault();

        //insertion de la créature invoquée dans le localStorage
        localStorage.setItem("creature", "test de malaaade !");
        let test = localStorage.getItem("creature");

        //redirection vers l'écran
        location.reload();
    });
}
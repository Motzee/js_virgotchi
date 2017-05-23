//vieillissement quotidien (actuellement : gain de jours, mais faire plutôt temps actuel moins temps de création moins)
function calculAge(creature) {
    console.log("La bestiole est née le :" + creature.age);
    let naissance = creature.age;
    /*let naissance = creature.age.getTime();*/
    let aujourdHui = new Date();
    console.log("voici aujourd'hui : " + aujourdHui);
    let age = new Number((aujourdHui.getTime() - naissance.getTime()) / 31536000000).toFixed(0);
    console.log(age);
    return age;

}

//evolution
function momentEvolution(creature) {
    let age = calculAge(creature);
    //changement artificiel de stade pour simule rune évolution
    if (age > 1) {
        creature.stade += 1;
    }
    creature.stade += 1;
    if (creature.stade > creature.galerie.length - 1) {
        creature.stade = creature.galerie.length - 1;
    }
    avatarCreature(creature)
}
// exemple de variables que vous pouvez utiliser
var grille = new Array(0,0,0,0,0,0,0,0,0); // stock la grille avec des cases jouées
var grilleElement = new Array(); // stock la grille avec les éléments HTML
var grilleRestant = new Array(0,1,2,3,4,5,6,7,8); // stock la grille des coups restant à jouer
var grilleCaseId = new Array(); // stock la grille des id de chaque case
var ligne = 3;
var colonne = 3;
var joueurHumain = 1;
var joueurIA = 2;
var imgHumain = "o.gif";
var imgIA = "x.gif";
var nbCase = ligne * colonne;
var nbCoup = ligne * colonne;
var joueHumain = false;

function Init()
{
    grilleElement = Array.from(document.getElementsByTagName("td"));
    grilleElement.pop();
    for (var i=0; i < grilleElement.length; i++) {
        grilleElement[i].caseNumber = i;
    }
    for (var i=0; i < grilleElement.length; i++){
        grilleElement[i].addEventListener('click', CaseClicked)
    }
}

function CaseClicked() {
    if (grilleRestant.find(element => element == this.caseNumber) === undefined ) {
        alert("la case et déjà pleine")
    }
    else {
        GridManage(this.caseNumber,joueurHumain);
        this.appendChild(VisualOX(joueurHumain))
        IAPlay();
    }
}

function GridManage(caseNumber,player) {
    grilleRestant.splice(grilleRestant.indexOf(caseNumber),1)
    grille.splice(caseNumber,1,player)
    console.log(grilleRestant)
    console.log(grille)
}
function IAPlay() {

}

function VisualOX(joueur) {
    var img = document.createElement("img");
    (joueur == 1) ? img.src = imgHumain : img.src = imgIA;
    return img
}
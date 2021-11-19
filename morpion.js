// exemple de variables que vous pouvez utiliser
var grilleJoue = new Array(0,0,0,0,0,0,0,0,0); // stock la grille avec des cases jouées -- grille remplace par 1 ou 2 (grille a joué ou non)
var grilleElementTd = new Array(); // stock la grille avec les éléments HTML -- td document get element by tagname
var grilleCasesRestantes = new Array(0,1,2,3,4,5,6,7,8); // stock la grille des coups restant à jouer
var ligne = 3;
var colonne = 3;
var joueurHumain = 1;
var joueurIA = 2;
var imgHumain = "o.gif";
var imgIA = "x.gif";
var nbCase = ligne * colonne;
var nbCoup = ligne * colonne;
var joueHumain = false;
var partieWinJoueur = 0;
var partieWinIA = 0;
var Gagne = false;

function Init()
{
    // On ajoute les éléments Td à notre array 
    grilleElementTd = Array.from(document.getElementsByTagName("td"));
    // On supprime le dernier Td qui correspond à Rejouer
    grilleElementTd.pop();
    // On ajoute un nombre à la case comme un attribut ( via une boucle for)
    for (var i=0; i < grilleElementTd.length; i++) {
        grilleElementTd[i].caseNumber = i;
    }
    // On itère sur GrilleElementTd[i] afin de savoir quelle case est cliqué. On lance la fonction CaseClicked au clic
    for (var i=0; i < grilleElementTd.length; i++){
        grilleElementTd[i].addEventListener('click', CaseClicked)
    }
    var rejouer = document.getElementById("rejouer");
    rejouer.addEventListener("click", Rejouer);
}
    
function CaseClicked() { 
    // On vérifie si la case est pleine ou vide
    if (grilleCasesRestantes.find(element => element == this.caseNumber) === undefined ) {
        alert("la case est déjà pleine")
    }
    // Si vide : 
    else {
        if(Gagne == false){
            // On gère les différents tableaux
            GridManage(this.caseNumber,joueurHumain);
            // On ajoute l'image correspondant à l'humain à la case cliquée
            this.appendChild(AjoutOX(joueurHumain))
            // On test si le joueur a gagné ou non
            //TestWin(joueurHumain);
            
            if (!TestWin(joueurHumain)) { // (TestWin(joueurHumain == false))
                // On fait jouer l'IA via la fonction : 
                IAPlay();
                // On test si l'IA a gagné ou non
                TestWin(joueurIA);
            }
        }
        else {
            alert("La partie est finie ! Si vous voulez rejouer cliquer sur le bouton :)");
        } 
    }
    
    
}
//fonction qui gèrent les tableaux
function GridManage(caseNumber,player) {
    // On supprime la ligne à l'index de numero de la case (cliquée ou aléatoire)
    grilleCasesRestantes.splice(grilleCasesRestantes.indexOf(caseNumber),1)
    // On modifie la valeur au à la lignenumero de la case (cliquée ou aléatoire) par 1(joueurHumain) ou 2 (joueurIA)
    grilleJoue.splice(caseNumber,1,player)
    // Voir dans les logs
    console.log(grilleCasesRestantes)
    console.log(grilleJoue)
}
// fonction qui définit nombre aléatoire pour l'IA selon le nombre de cases restantes
function getRandomInt() {
    return Math.floor(Math.random() * grilleCasesRestantes.length); // -1 ?
}
// function qui fait jouer l'IA
function IAPlay() {
    // Variable qui définit la case choisi par l'ordinateur
    var iaCasePick = grilleCasesRestantes[getRandomInt()];
    console.log(iaCasePick)
    // Gestion des différents tableaux
    GridManage(iaCasePick, joueurIA);
    // On itère 
    for (var i=0; i < grilleElementTd.length; i++) {
        if (grilleElementTd[i].caseNumber == iaCasePick) {
            grilleElementTd[i].appendChild(AjoutOX(joueurIA));
        }
    }
}
// function qui retourne un élément img
function AjoutOX(joueur) {
    /*var img = document.createElement("img");
    (joueur == 1) ? img.src = imgHumain : img.src = imgIA;
    return img*/
    // Variable qui créée un élément img
    var img = document.createElement("img");
    // Condition qui ajoute l'image selon si player = 1 (humain) ou 2 (IA)
    if(joueur ==1){
        img.src = imgHumain;
    }
    else {
        img.src = imgIA;
    }
    return img;
}
function TestWin(player ){
      if (grilleJoue[0] == player && grilleJoue[1]== player && grilleJoue[2]== player
        || grilleJoue[3] == player && grilleJoue[4]== player && grilleJoue[5]== player
        || grilleJoue[6] == player && grilleJoue[7]== player && grilleJoue[8]== player
        || grilleJoue[0] == player && grilleJoue[3]== player && grilleJoue[6]== player
        || grilleJoue[1] == player && grilleJoue[4]== player && grilleJoue[7]== player
        || grilleJoue[2] == player && grilleJoue[5]== player && grilleJoue[8]== player
        || grilleJoue[0] == player && grilleJoue[4]== player && grilleJoue[8]== player
        || grilleJoue[2] == player && grilleJoue[4]== player && grilleJoue[6]== player
        ){
            if (player == 1) {
                setTimeout(alert, 250,"Bravo ! Vous avez gagné ");
                var scoreJ1 = document.getElementById("score1");
                scoreJ1.innerHTML++
                
            }
            
            else {
                setTimeout(alert, 250,"Vous avez perdu! ");
                var scoreJ2 = document.getElementById("score2");
                scoreJ2.innerHTML++
                
            } 
            Gagne=true;
            var manches = document.getElementById("nbManches");
            manches.innerHTML++
        }
        else if (grilleCasesRestantes.length == 0 ){
            setTimeout(alert, 250,"Egalité dommage : recommencez ! :)");
            Gagne=true;
            var manches = document.getElementById("nbManches");
            manches.innerHTML++
    
        }
      

    return Gagne
}
function Rejouer(){
    grilleJoue = new Array(0,0,0,0,0,0,0,0,0);
    grilleCasesRestantes = new Array(0,1,2,3,4,5,6,7,8);
    for (let i = 0; i < grilleElementTd.length; i++) {
        if (grilleElementTd[i].lastChild) {
            grilleElementTd[i].removeChild(grilleElementTd[i].lastChild);   
        }
    }
    console.log(grilleJoue);
    console.log(grilleCasesRestantes);
    Gagne = false;
}

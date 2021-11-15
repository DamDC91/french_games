
"use strict";
// on interdit l'utilisation de variables non déclarées

// et c'est bien de documenter le code en JSDoc!

/**
 * @file TP2
 * @version 0.0
 * @author ???
 */

// Retarde le lancement du programme principal après le chargement
// de la page Web

    var cubeDodge=0;
    var sens=1;
    var anim;
    var addCubes;
    var num = 0;
    var position = 50;
    var vitesse=5;
    var lancer=false;
    //var glace;
   // var yGlace=0;
   // var xGlace=getRandomInt(368);

    var collision;
    const TailleCube=32;
    const Hpingouin=66;
    const Lpingouin=46;

    function cube(xGlace,yGlace, TailleCube) 
    {
    	this.xGlace=xGlace;
    	this.yGlace=yGlace;
    	this.TailleCube=TailleCube;
    }

    var cubes = [new cube(getRandomInt(368),0,32)];


    function Gauche()
    {
        sens=0;
    }
    function Droite()
    {
        sens=1;
    }
    function Key(e)
    {
        if(e.key=="ArrowRight")
        {
            sens=1;
        }
        else if(e.key=="ArrowLeft")
        {
            sens=0; 
        }
    }
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    function Score(){
        var t=document.getElementById("score");
        var text="score : "+cubeDodge;
        t.textContent=text;
    }

window.onload = function() {
    Score();
    // les variables locales sont visibles des fonctions internes
    var chemin;
    var canvas= document.getElementById("canvas");
    canvas.width=400;
    canvas.height=300;
    var c2d = canvas.getContext('2d');

    var img = new Image(); 
    img.src="games/pingouin/images/forest.jpg";   
    var img2 = new Image();
    var img3= new Image();
    img3.src="games/pingouin/images/icecube.png";


    document.getElementById("replay").addEventListener("click",stop);


    function stop()
    {
        lancer=false;
        vitesse=5;
        cubes = [new cube(getRandomInt(368),0,32)];
        cubeDodge=0;
        position = 50;
        sens=1;
        num=0;
        //drawCanvas("games/pingouin/images/largetux-walk-right-0.png");
        clearInterval(anim);
        clearInterval(addCubes);
        Score();

    }

    

    img.onload=function (){ c2d.drawImage(img,0,0,canvas.width,canvas.height);};

    canvas.addEventListener("click", bouge,false);

    window.addEventListener("keydown", Key);


    function drawCanvas(chemin)
    {
    	
        c2d.drawImage(img,0,0,canvas.width,canvas.height);

        img2.src=chemin;
        img2.onload=function (){ c2d.drawImage(img2,position,225);};
       //console.log(position);
       for(var i=0; i<cubes.length;i++) {
            var c=cubes[i];
        	c2d.drawImage(img3,c.xGlace,c.yGlace);
        }
    }

    function sendScore()
    {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "score-backEnd.php", true); 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
        }
        };
        xhttp.send(JSON.stringify({game:getGameId(),score: cubeDodge}));
    }


    function bouge() {
        if(!lancer)
        {
            lancer=true;
            anim=setInterval(function(){
            	vitesse*=1.001;
                num += 1;
                if(vitesse!=0)
                {
                    if(position<canvas.width-Lpingouin && sens==1)
                    {
                        chemin = 'games/pingouin/images/largetux-walk-right-' + (num % 6) + '.png';
                        position=position+vitesse;
                    }
                    else if(position>0 && sens==0)
                    {
                       chemin = 'games/pingouin/images/largetux-walk-left-' + (num % 6) + '.png'; 
                       position=position-vitesse;
                    }
                    if(position>=canvas.width-Lpingouin)
                    {
                        sens=0;
                    }
                    else if(position<=0)
                    {
                        sens=1;
                    }
                }
                for(var i=0; i<cubes.length;i++) {
                	var c=cubes[i];
	                c.yGlace+=10;
	                if(c.yGlace>=canvas.height-c.TailleCube)
	                {
	                	cubeDodge++;
	                    c.yGlace=0;
	                    c.xGlace=getRandomInt(canvas.width-TailleCube);
	                }
	            }
	            Score();

                drawCanvas(chemin);
				for(var i=0; i<cubes.length;i++) {
                	var c=cubes[i];
	                if(((c.xGlace<=(position+46) && c.xGlace>=position) || ((c.xGlace+32)<=(position+46) && (c.xGlace+32)>=position)) && c.yGlace>=193)
	                {
                        sendScore();
	                    stop();
	                    //c.yGlace=canvas.height+100; ?
	                     c2d.drawImage(img,0,0,canvas.width,canvas.height);
	                }
           		}
            },60);
            addCubes=setInterval(function(){ if (cubes.length<8) {cubes.push(new cube(getRandomInt(368),0,32));} },10000);
        }
    }


}

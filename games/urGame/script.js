
class board
{
	constructor(player1,player2)
	{
		this.board=[];
		this.player1=player1;
		this.player2=player2;

		for(let i=0;i<20;i++)
		{
			if(i==0 || i==4)
			{
				let CaseP2Ro= new Case(specificity.rosase, null, [player2]);
				this.board.push(CaseP2Ro);
			}
			else if(i<6)
			{
				let CaseP2= new Case(specificity.none, null, [player2]);
				this.board.push(CaseP2);
			}
			else if(i==9 && Case8)
			{
				let CaseWarInvisible=new Case(specificity.invincible, null, [player1, player2]);
				this.board.push(CaseWarInvisible);
			}
			else if(i<14)
			{
				let CaseWar=new Case(specificity.none, null, [player1, player2]);
				this.board.push(CaseWar);
			}
			else if(i==14 || i==18)
			{
				let CaseP1Ro= new Case(specificity.rosase, null, [player1]);
				this.board.push(CaseP1Ro);
			}
			else if(i<20)
			{
				let CaseP1= new Case(specificity.none, null, [player1]);
				this.board.push(CaseP1);
			}
		}
	}
	placePawn(ind,pawn)
	{
		this.board[ind].setPawn(pawn);

	}
	getPawn(ind)
	{
		return this.board[ind].getPawn();
	}
	isEmpty(ind)
	{
		return this.board[ind].isEmpty();
	}
	getSpecificity(ind)
	{
		return this.board[ind].getSpecificity();
	}
	releaseCase(i) //juste mettre le pion a null ?
	{
		let CaseP1= new Case(specificity.none, null, [this.player1]);
		let CaseP1Ro= new Case(specificity.rosase, null, [this.player1]);

		let CaseP2= new Case(specificity.none, null, [this.player2]);
		let CaseP2Ro= new Case(specificity.rosase, null, [this.player2]);

		let CaseWar=new Case(specificity.none, null, [this.player1, this.player2]);
		let CaseWarInvisible=new Case(specificity.invincible, null, [this.player1, this.player2]);
		if(i==0 || i==4)
		{
			this.board[i]=(CaseP2Ro);
		}
		else if(i<6)
		{
			this.board[i]=(CaseP2);
		}
		else if(i==9 && Case8)
		{
			this.board[i]=(CaseWarInvisible);
		}
		else if(i<14)
		{
			this.board[i]=(CaseWar);
		}
		else if(i==14 || i==18)
		{
			this.board[i]=(CaseP1Ro);
		}
		else if(i<20)
		{
			this.board[i]=(CaseP1);
		}
	}
	drawBoard(ctx)
	{
		ctx.fillStyle="white";
		ctx.fillRect(0,0,1000,1000);
		let cpt=0;
		for(let i=0;i<3;i++)
		{
			for(let j=0;j<8;j++)
			{
				if((i==0 || i==2) && (j==0 || j==6))	//plutot récupéré le type de Case
				{
					ctx.fillStyle = Rosase;
				}
				else if(i==1 && j==3 && Case8)
				{
					ctx.fillStyle = Invincible;
				}
				else
				{
					ctx.fillStyle = Normal;
				}
				if(!((i==0 && j==4) || (i==0 && j==5)) && !((i==2 && j==4) || (i==2 && j==5)))
				{
					ctx.fillRect(j*CaseSize, i*CaseSize+yBoard, CaseSize-1, CaseSize-1);
					if(!this.isEmpty(cpt))
					{
						ctx.beginPath();
						ctx.fillStyle=this.getPawn(cpt).getPlayer().getColor();
						ctx.arc(j*CaseSize+CaseSize/2,i*CaseSize+CaseSize/2+yBoard,CaseSize*0.4, 0, 2*Math.PI);
						ctx.fill();
					}
					cpt++;
				}
			}
			let scoreP1=0;
			let scoreP2=0;
			for(let i=0;i<nbPawn;i++)
			{
				if(this.player1.getPawn(i).getState()==state.end)
				{
					scoreP1++;
				}
				if(this.player2.getPawn(i).getState()==state.end)
				{
					scoreP2++;
				}
			}
			ctx.font = '25px serif';
			ctx.fillText(scoreP2,5.5*CaseSize,yBoard*1.5);
			ctx.fillText(scoreP1,5.5*CaseSize,yBoard*1.5+2*CaseSize);
		}
	}
}


class Case
{
	constructor(specificity,pawn,players)
	{
		this.specificity=specificity;
		this.pawn=pawn;
		this.playerAccess=players; //inutile
	}
	getSpecificity()
	{
		return this.specificity;
	}
	isEmpty()
	{
		if(this.pawn==null)
		{
			return true;
		}
		return false;
	}
	setPawn(pawn)
	{
		this.pawn=pawn;
	}
	getPawn()
	{
		return this.pawn;
	}
}

class Pawn
{
	constructor(player, state, pos, index)
	{
		this.player = player;
		this.state = state;
		this.pos = pos;		 // index in road
		this.index = index;  // index in pawns
	}
	getState()
	{
		return this.state;
	}
	getPos()
	{
		return this.pos;
	}
	getPlayer()
	{
		return this.player;
	}
	setPos(pos)
	{
		this.pos=pos;
	}
	Eat()
	{
		this.pos = null;
		this.state=state.hand;
	}
	End()
	{
		this.state=state.end;
		this.pos=null;
	}
	inGame(pos)
	{
		this.state=state.game;
		this.pos=pos;
	}
}




class Player
{
	constructor(pseudo,nbPawn,road,canPlay,color,nb)
	{
		this.number=nb;
		this.pseudo = pseudo;
		this.color=color;
		this.pawns = [];
		for(let i=0;i<nbPawn;i++)
		{
			let P = new Pawn(this,state.hand,null,i);
			this.pawns.push(P);
		}
		this.road = road;
		this.canPlay = canPlay;
	}
	movePawn(ind,score,board)	// classe enfant avec une classe abstraite
	{
		if(score==0)
		{
			this.canPlay=false;
		}
		else
		{
			let roadInd = this.pawns[ind].pos;
			let oldBoardInd=this.road[roadInd];
			let newRoadInd=roadInd+score;
			let pawn = this.pawns[ind]; 

			if(pawn.getState() == state.game)
			{

				if(newRoadInd < this.road.length ) // not end
				{
					let newBoardInd=this.road[newRoadInd];

					if(board.isEmpty(newBoardInd)) // move on empty case
					{
						board.releaseCase(oldBoardInd);
						pawn.setPos(newRoadInd);
						board.placePawn(newBoardInd, pawn);
					}
					else if(!board.isEmpty(newBoardInd) && board.getPawn(newBoardInd).getPlayer()!=this && board.getSpecificity(newBoardInd)!=specificity.invincible) // Eat
					{
						board.getPawn(newBoardInd).Eat();
						board.releaseCase(oldBoardInd);
						pawn.setPos(newRoadInd);
						board.placePawn(newBoardInd, pawn);
					}

					if(board.getSpecificity(this.road[newRoadInd])==specificity.none)
					{
						this.canPlay=false;
					}
					//else stay at true
				}
				else if(newRoadInd == this.road.length) //  end
				{
					pawn.End();
					board.releaseCase(oldBoardInd);
					this.canPlay=false;
				}
			}
			else if(pawn.getState() == state.hand && board.isEmpty(this.road[score-1])) // put pawn on board
			{
				let newBoardInd=this.road[newRoadInd-1];
				pawn.inGame(score-1);
				board.placePawn(newBoardInd, pawn);
				if(board.getSpecificity(newBoardInd)==specificity.none)
				{
					this.canPlay=false;
				}
			}
		}
	}
	canMove(score,board)
	{
		let PawnsCanMove=[];
		if (score==0)
		{
			for(let i=0;i<nbPawn;i++)
			{
				PawnsCanMove.push(false);
			}
			return PawnsCanMove;
		}
		for(let i=0;i<nbPawn;i++)
		{
			let bool= { play : true, eat: false, rosase : false, invincible: false, end:false };

			let pawn = this.pawns[i]; 
			let roadInd = this.pawns[i].pos;
			let newRoadInd=roadInd+score;
			if(pawn.getState() == state.game)
			{
				if(newRoadInd < this.road.length ) // not end
				{
					let newBoardInd=this.road[newRoadInd];
					if(board.isEmpty(newBoardInd)) // move on empty case
					{
						if(board.getSpecificity(newBoardInd)==specificity.none)
						{
							PawnsCanMove.push(bool);
						}
						else if(board.getSpecificity(newBoardInd)==specificity.rosase)
						{
							bool.rosase=true;
							PawnsCanMove.push(bool);
						}
						else
						{
							bool.invincible=true;
							PawnsCanMove.push(bool);
						}
						
					}
					else if(!board.isEmpty(newBoardInd) && board.getPawn(newBoardInd).getPlayer()!=this && board.getSpecificity(newBoardInd)!=specificity.invincible) // Eat
					{
						bool.eat=true;
						PawnsCanMove.push(bool);
					}
					else
					{
						bool.play=false;
						PawnsCanMove.push(bool); //  can't
					}
				}
				else if(newRoadInd == this.road.length) //  end
				{
					bool.end=true;
					PawnsCanMove.push(bool);
				}
				else	//pawn end
				{
					bool.play=false;
					PawnsCanMove.push(bool);
				}
			}
			else if(pawn.getState() == state.hand && board.isEmpty(this.road[score-1])) // put pawn on board
			{
				if(score!=4)
				{
					PawnsCanMove.push(bool);
				}
				else
				{
					bool.rosase=true;
					PawnsCanMove.push(bool);
				}
				
			}
			else
			{
				bool.play=false;
				PawnsCanMove.push(bool);
			}
		}
		return PawnsCanMove;
	}
	getCanPlay()
	{
		return this.canPlay;
	}
	getPseudo()
	{
		return this.pseudo;
	}
	setCanPlay(bool)
	{
		this.canPlay=bool;
	}
	getColor()
	{
		return this.color;
	}
	getPawnIndexInBoard(indP)
	{
		let i= this.pawns[indP].getPos();
		if(i!=null)
		{
			return this.road[i];
		}
		else
		{
			return null;
		}
	}
	getPawn(indP)
	{
		return this.pawns[indP];
	}
	convertScoreIntoIndBoard(score) // simplifier avec road et get number
	{
		return this.road[score];
	}
	getIndPawnWithIndexBoard(indexBoard, board)
	{
		for(let i=0;i<this.road.length;i++)
		{
			if(indexBoard==this.road[i])
			{
				for(let j=0;j<nbPawn;j++)
				{
					if(this.pawns[j].getPos()==i)
					{
						return j;
					}
				}
			}
		}
	}
	getIndPawnInHand()
	{
		for(let i=0;i<this.pawns.length;i++)
		{
			if(this.pawns[i].getState()==state.hand)
			{
				return i;
			}
		}
	}
	getNumber()
	{
		return this.number;
	}
	drawPlayer(ctx)
	{
		let d;
		if(this.number==2)
		{
			d=0;
		}
		else
		{
			d=3*CaseSize+yBoard;
		}
		for(let i=0;i<this.pawns.length;i++)
		{
			if(this.pawns[i].getState()==state.hand)
			{
				ctx.beginPath();
				ctx.fillStyle=this.color;
				ctx.arc(i*CaseSize*0.75+CaseSize/2,CaseSize/2+d,CaseSize*0.4, 0, 2*Math.PI);
				ctx.fill();
			}
		}
		ctx.fillStyle=this.color;
		ctx.font = '40px serif';
  		ctx.fillText(this.pseudo, 600, d+yBoard/2);
	}
	hasWin() //dans le code
	{
		let win=true;
		for(let i=0;i<nbPawn;i++)
		{
			if(this.pawns[i].getState()!=state.end)
			{
				win=false;
			}
		}
		return win;
	}
}


/* ======================== CODE =============================*/
let state =
{
	hand : 1,
	game : 2,
	end : 3,
	empty : 4,
};

let specificity = {
	none : 1,
	rosase : 2,
	invincible : 3
};

const CaseSize=101;

let nbPawn=5;
let Case8=true;
let Bot=false;

//color
const Rosase="green";
const Invincible ="red";
const Normal="gray";

const ColorP1="blue";
const ColorP2="orange";

let pseudo1="joueur 1";
let pseudo2="joueur 2";

const yBoard=100;
const time=2000;
/*
function readCookie()
{
	var cookie=document.cookie;
	if(cookie)
	{
		var val=cookie.split(',');
		
		nbPawn=parseInt(val[2]);
		if(val[0]=="no")
		{
			Case8=false;
		}
		if(val[1]=="bot")
		{
			Bot=true;
		}
		pseudo1=val[3];
		if(val.length==5)
		{
			pseudo2=val[4];
		}
		console.log(val);
	}
}*/

let score=0;
window.onload = function()
{
	//readCookie();

	/*	<canvas width="850px" height="500px" id="canvas"></canvas>
	<div>
		<h1 id="player"></h1>
		<p id="p"></p>
		<canvas width="200px" height="200px" id="canvasCoin"></canvas>
	</div>*/

	let canvas= document.getElementById("canvas");
	canvas.width=850;
	canvas.height=500;
	let ctx = canvas.getContext("2d");

	let div_canvas=document.getElementById("div_canvas");


	let div = document.createElement("div");
	let canvasCoin=document.createElement("canvas");
	canvasCoin.height=200;
	canvasCoin.width=200;
	let ctxCoin=canvasCoin.getContext("2d");

	let para=document.createElement("h2");
	para.classList.add("text-center");

	let h2=document.createElement("h2");
	h2.classList.add("text-center");

	div_canvas.append(div);
	div.append(h2);
	div.append(para);
	div.append(canvasCoin);


	let CaseSelected=[];
	initGame(pseudo1,pseudo2,nbPawn);

	
	

	function initGame(pseudo1,pseudo2,nbPawn)
	{
		let road1=[17,16,15,14,6,7,8,9,10,11,12,13,19,18];
		let road2=[3,2,1,0,6,7,8,9,10,11,12,13,5,4];
		let player1= new Player(pseudo1,nbPawn,road1,true,ColorP1, 1);
		let player2;
		if(Bot)
		{
			player2= new Player("Bot", nbPawn, road2, false,ColorP2, 2);
		}
		else
		{
			player2= new Player(pseudo2, nbPawn, road2, false,ColorP2, 2);
		}
		
		let Board = new board(player1,player2);
		Board.drawBoard(ctx);
		let players=[player1,player2];
		

		Play(players, Board);
	}

	function Play(players,board)
	{
		if(playersWin(players))
		{
			return;
		}
		CaseSelected=[];
		let player;	
		if(players[0].getCanPlay())
		{
			player=players[0];
		}
		else if(players[1].getCanPlay())
		{
			player=players[1];
		}
		players[0].drawPlayer(ctx);
		players[1].drawPlayer(ctx);
		throwPiece(player);
		let PawnsCanMove=player.canMove(score,board);
		let hand=false;
		let playerCanMove=false;
		let cpt=0;
		for(let i=0;i<nbPawn;i++)
		{
			if(PawnsCanMove[i].play)
			{
				playerCanMove=true;
				if(player.getPseudo()!="Bot")
				{
					let pawnState = player.getPawn(i).getState();
					if(pawnState == state.game)
					{
						let indexBoard = player.getPawnIndexInBoard(i);
						selectedCase(indexBoard);
					}
					else if(pawnState = state.hand && !hand)
					{
						let ind = player.convertScoreIntoIndBoard(score);
						selectedHand(player.getNumber());
						hand=true;
					}
				}
				else
				{	
					cpt=cpt+1;
				}
			}
		}
		if(score!=0 && playerCanMove && player.getPseudo()!="Bot")
		{
			 canvas.addEventListener("click", function (e){ click(e,players,board,score);}, {once : true});
		}
		else if(score==0)
		{
			let a= setTimeout(function(){
				players=changeRound(players);
				Play(players,board);
			},time);
		}
		else if(!playerCanMove)
		{
			let a= setTimeout(function(){
				players=changeRound(players);
				Play(players,board,false);
			},time);
		}
		else if(player.getPseudo()=="Bot")
		{
			let a = setTimeout(function(){
				player.movePawn(choiceBot(PawnsCanMove,player,board),score,board);
				board.drawBoard(ctx)
				if(!player.getCanPlay())
				{
					if(players[0]==player)
					{
						players[1].setCanPlay(true);
					}
					else
					{
						players[0].setCanPlay(true);
					}
				}
				Play(players,board);
			},time);
		}
	}

	function choiceBot(PawnsCanMove,player,board)
	{
		let choice={rosase:null,eat:null,end:null,invincible:null};
		let ind=[];
		let indice;
		for(let i=0;i<PawnsCanMove.length;i++)
		{
			if(PawnsCanMove[i].play)
			{
				if(PawnsCanMove[i].invincible)
				{
					return choice.invincible=i;
				}
				else if(PawnsCanMove[i].rosase)
				{
					return choice.rosase=i;
				}
				else if(PawnsCanMove[i].eat)
				{
					return choice.eat=i;
				}
				else if(PawnsCanMove[i].end)
				{	
					return choice.end=i;
				}
				else if(player.getPawnIndexInBoard(i)==null || player.getPawnIndexInBoard(i)!= null && board.getSpecificity(player.getPawnIndexInBoard(i))!=specificity.invincible)
				{
					ind.push(i);
				}
				else
				{
					indice=i;
				}
			}
		}
		if(choice.invincible!=null)
		{
			return choice.invincible;
		}
		else if(choice.rosase!=null)
		{
			return choice.rosase;
		}
		else if(choice.eat!=null)
		{
			return choice.eat;
		}
		else if(choice.end!=null)
		{
			return choice.end;
		}
		else
		{
			for(let i=0;i<ind.length;i++)
			{
				if(PawnsCanMove[i].play && player.getPawnIndexInBoard(i)>=6 && player.getPawnIndexInBoard(i)<=13 && !board.isEmpty(player.getPawnIndexInBoard(i)-2) && board.getPawn(player.getPawnIndexInBoard(i)-2).getPlayer()!=player && board.getSpecificity(player.getPawnIndexInBoard(i))!=specificity.invincible)
				{
					return i;
				}
			}
			if(ind.length!=0)
			{
				return ind[Math.round(Math.random()*20)%(ind.length)];
			}
			else
			{
				return indice;
			}
			
		}
	}

	function changeRound(players)
	{
		if(players[0].getCanPlay())
		{
			players[0].setCanPlay(false);
			players[1].setCanPlay(true);
		}
		else if(players[1].getCanPlay())
		{
			players[1].setCanPlay(false);
			players[0].setCanPlay(true);
		}
		return players;
	}

	function throwPiece(player)
	{
		ctxCoin.clearRect(0,0,canvasCoin.width,canvasCoin.height);
		let cpt=0;
		for(let i=0;i<2;i++)
		{
			for(let j=0;j<2;j++)
			{
				if(Math.random()>=0.5)
				{
					cpt+=1;
					ctxCoin.fillStyle="gray";		
					ctxCoin.beginPath();
					ctxCoin.arc(i*canvasCoin.width/2+canvasCoin.width/4,j*canvasCoin.height*0.5+canvasCoin.height*0.25,canvasCoin.height*0.2, 0, 2*Math.PI);
					ctxCoin.fill();
					ctxCoin.fillStyle="black";
					ctxCoin.font="30px serif";
					ctxCoin.fillText("1",i*canvasCoin.width/2+canvasCoin.width*0.21, j*canvasCoin.height*0.50+canvasCoin.height*0.30);
				}
				else
				{
					ctxCoin.fillStyle="silver";
					ctxCoin.beginPath();
					ctxCoin.arc(i*canvasCoin.width/2+canvasCoin.width/4,j*canvasCoin.height*0.5+canvasCoin.height*0.25,canvasCoin.height*0.2, 0, 2*Math.PI);
					ctxCoin.fill();
					ctxCoin.fillStyle="black";
					ctxCoin.font="30px serif";
					ctxCoin.fillText("0",i*canvasCoin.width/2+canvasCoin.width*0.21, j*canvasCoin.height*0.50+canvasCoin.height*0.30);
				}
			}					
		}
		score=cpt;
		h2.innerHTML=player.getPseudo();
		h2.style.color=player.getColor();
		para.innerHTML=score;

		
	}

	function playersWin(players)
	{
		if(players[0].hasWin())
		{
			alert(players[0].getPseudo()+" win");
			return true;
		}
		else if(players[1].hasWin())
		{
			alert(players[1].getPseudo()+" win");
			return true;
		}
		return false;
	}

	function selectedHand(PlayerNumber)
	{
		if(PlayerNumber==1)
		{
			let zone={x: 0,y: 3*CaseSize+yBoard+1, w:canvas.width, h:CaseSize*0.95};
			CaseSelected.push(zone);
			ctx.beginPath();
			ctx.strokeStyle="black";
			ctx.rect(zone.x,zone.y,zone.w,zone.h);
			ctx.stroke();
		}
		else
		{
			let zone={x: 0,y: 0, w:canvas.width, h:CaseSize*0.95};
			CaseSelected.push(zone);
			ctx.beginPath();
			ctx.strokeStyle="black";
			ctx.rect(zone.x,zone.y,zone.w,zone.h);
			ctx.stroke();
		}
	}

	function selectedCase(indexBoard)
	{
		let x,y;
		if(indexBoard<6)
		{
			y=0;
			if(indexBoard<4)
			{
				x=indexBoard*CaseSize;
			}
			else
			{
				x=(indexBoard+2)*CaseSize;
			}
		}
		else if(indexBoard<14)
		{
			y=CaseSize;
			x=(indexBoard-6)*CaseSize;
		}
		else
		{
			y=2*CaseSize;
			if(indexBoard<18)
			{
				x=(indexBoard-14)*CaseSize;
			}
			else
			{
				x=(indexBoard-12)*CaseSize;
			}
		}
		y+=yBoard;
		ctx.beginPath();
		ctx.rect(x, y, CaseSize-1, CaseSize-1);
		ctx.strokeStyle="black";
		ctx.stroke();
		let CaseS={x:x,y:y,w:CaseSize-1,h:CaseSize-1};
		CaseSelected.push(CaseS)
	}

	function click(e,players,board,score)
	{
		let player;
		let idPa;
		if(players[0].getCanPlay())
		{
			player=players[0];
			idPa=0;
		}
		else if(players[1].getCanPlay())
		{
			player=players[1];
			idPa=1;
		}
		let x=e.pageX-canvas.offsetLeft-canvas.parentNode.offsetLeft;
		let y=e.pageY-canvas.offsetTop-canvas.parentNode.offsetTop;
		//console.log(canvas.offsetLeft+canvas.parentNode.offsetLeft+" , "+canvas.offsetTop+canvas.parentNode.offsetTop);
		console.log(x+" , "+y);

		let i;
		for(i=0;i<CaseSelected.length;i++)
		{
			if(x>=CaseSelected[i].x && x<=CaseSelected[i].x+CaseSelected[i].w && y>=CaseSelected[i].y && y<=CaseSelected[i].y+CaseSelected[i].h)
			{
				break;
			}
		}
		if(i==CaseSelected.length)
		{
			canvas.addEventListener("click", function (e){ click(e,players,board,score);}, {once : true});
			return;
		}
		CaseSelected=[];
		let nbCaseRow=-1;
		let nbCaseCol=-1;
		for(let j=0;j<8;j++)
		{
			if(x<CaseSize*(j+1) && x>CaseSize*(j))
			{
				nbCaseRow=j;
			}
		}
		for(let j=0;j<3;j++)
		{
			if(y-yBoard<CaseSize*(j+1) && y-yBoard>CaseSize*j)
			{
				nbCaseCol=j;
			}
		}

		let indexBoard;
		if(nbCaseCol==0)
		{
				if(nbCaseRow>=6)
				{
					indexBoard=nbCaseRow-2;
				}
				else if(nbCaseRow<4)
				{
					indexBoard=nbCaseRow;
				}
		}
		else if(nbCaseCol==1)
		{
			indexBoard=nbCaseRow+6;
		}
		else if(nbCaseCol==2)
		{
			if(nbCaseRow>=6)
			{
				indexBoard=nbCaseRow+12;
			}
			else if(nbCaseRow<4)
			{
				indexBoard=nbCaseRow+14;
			}
		}
		
		if(nbCaseCol==-1)
		{
			let P=player.getIndPawnInHand();
			player.movePawn(P,score,board);
		}
		else
		{
			let P=player.getIndPawnWithIndexBoard(indexBoard,board);
			player.movePawn(P,score,board);
		}
		
		board.drawBoard(ctx);
		if(!player.getCanPlay())
		{
			if(idPa==0)
			{
				players[1].setCanPlay(true);
			}
			else
			{
				players[0].setCanPlay(true);
			}
		}
		Play(players,board);
	}
};
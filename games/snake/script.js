const cubeSize=25;
const Damier1=" #979a9a";
const Damier2=" #d7dbdd";

let Direction={

	Left : 1,
	Right : 2,
	Up : 3,
	Down : 4
};


window.onload= function()
{


	let score=0;
	let changeDirection=false;
	let Green=80;
	let pause=false;
	let canvas = document.getElementById("canvas");
	canvas.width=500;
	canvas.height=500;
	let ctx=canvas.getContext("2d");

	let p = document.getElementById("score");
	p.innerHTML="apple : "+score;

	let rePlay=document.getElementById("replay");
	rePlay.addEventListener("click", startGame);


	class cube
	{
		constructor(x,y,str)
		{
			this.x=x;
			this.y=y;
			this.color=str;
		}
	}

	class Apple{	
		constructor()
		{
			this.x=Math.floor(Math.random() * (canvas.width/cubeSize-1)+1)*(cubeSize);
			this.y=Math.floor(Math.random() * (canvas.height/cubeSize-1)+1)*(cubeSize);
		}

		draw()
		{
			ctx.fillStyle = "red";
			/*ctx.beginPath();
			ctx.arc(this.x+cubeSize/2,this.y+cubeSize/2,cubeSize/3,0,Math.PI*2,false);
			ctx.fill();*/
			ctx.beginPath();
			ctx.moveTo(this.x+cubeSize/3,this.y+cubeSize*0.9);
			//ctx.bezierCurveTo(this.x+cubeSize.cubeSize/6, this.y+cubeSize*0.8, this.x+cubeSize/8, this.y+cubeSize*0.4,this.x+cubeSize/7, this.y+cubeSize*0.3);
			ctx.bezierCurveTo(this.x-cubeSize/10, this.y+cubeSize*0.7,    this.x, this.y,     this.x+cubeSize/2, this.y+cubeSize*0.25);
			ctx.bezierCurveTo(this.x+cubeSize, this.y,    this.x+cubeSize*1.1, this.y+cubeSize*0.7,   this.x+cubeSize*2/3,this.y+cubeSize*0.9);
			ctx.quadraticCurveTo(this.x+cubeSize/2, this.y+cubeSize*0.80,   this.x+cubeSize/3, this.y+cubeSize*0.9);
			ctx.fill();
			ctx.beginPath();
			ctx.strokeStyle="green";
			ctx.lineWidth=2;
			ctx.moveTo(this.x+cubeSize/2, this.y+cubeSize*0.25);
			ctx.lineTo(this.x+cubeSize*0.65,this.y-cubeSize*0.0);
			ctx.stroke();

			ctx.strokeStyle="green";
			ctx.lineWidth=1;
		}

		change()
		{
			this.x=Math.floor(Math.random() * (canvas.width/cubeSize-1)+1)*(cubeSize);
			this.y=Math.floor(Math.random() * (canvas.height/cubeSize-1)+1)*(cubeSize);
		}
	}

	class Snake
	{
		constructor()
		{	
			let Point1 = new cube(0,0);
			let Point2=new cube(-cubeSize,0,);
			let Point3=new cube(-2*cubeSize,0,);
			this.TabSnake=[Point1,Point2,Point3];
			this.DirectionSnake=Direction.Right;
			pause=true;
		}
		draw()
		{
			Green=80;
			for(let i=1;i<this.TabSnake.length;i++)
			{
				if(i!=this.TabSnake.length-1)
				{
					//ctx.fillStyle = "rgb(0,"+Green+",0)";
					ctx.fillStyle = createPa("rgb(0,"+Green+",0)");
					Green*=1.02;
					ctx.fillRect(this.TabSnake[i].x,this.TabSnake[i].y,cubeSize,cubeSize);
				}
				else
				{
					this.drawTail();
				}
			}
			this.drawHead();
		}
		drawTail()
		{
			let color=Damier2;
			if((snake.TabSnake[snake.TabSnake.length-1].x+snake.TabSnake[snake.TabSnake.length-1].y)%(2*(cubeSize))==0)
			{
				color=Damier1;
			}
			ctx.fillStyle=color;
			ctx.fillRect(snake.TabSnake[snake.TabSnake.length-1].x,snake.TabSnake[snake.TabSnake.length-1].y,cubeSize,cubeSize);

			let angle=0;
			let pre=this.TabSnake[this.TabSnake.length-2];
			let tail=this.TabSnake[this.TabSnake.length-1]
			
			if(pre.x>tail.x && (tail.x!=0 || pre.x!=canvas.width-cubeSize) || (tail.x==canvas.width-cubeSize && pre.x==0))
			{
				angle=90*Math.PI;
			}
			else if(pre.x<tail.x && (tail.x!=canvas.width-cubeSize || pre.x!=0) || (tail.x==0 && pre.x==canvas.width-cubeSize))
			{
				angle=angle=270*Math.PI;
			}
			else if(pre.y>tail.y && (tail.y!=0 || pre.y!=canvas.height-cubeSize) || (tail.y==canvas.height-cubeSize && pre.y==0))
			{
				angle=180*Math.PI;
			}
			
			ctx.translate(this.TabSnake[this.TabSnake.length-1].x+cubeSize/2, this.TabSnake[this.TabSnake.length-1].y+cubeSize/2); 
			ctx.rotate(angle/180);
			ctx.translate(-this.TabSnake[this.TabSnake.length-1].x-cubeSize/2, -this.TabSnake[this.TabSnake.length-1].y-cubeSize/2);

			ctx.beginPath();
			ctx.fillStyle = "rgb(0,"+Green+",0)";
			ctx.moveTo(this.TabSnake[this.TabSnake.length-1].x,this.TabSnake[this.TabSnake.length-1].y);
			ctx.quadraticCurveTo(this.TabSnake[this.TabSnake.length-1].x+cubeSize/2, this.TabSnake[this.TabSnake.length-1].y+cubeSize, this.TabSnake[this.TabSnake.length-1].x+cubeSize, this.TabSnake[this.TabSnake.length-1].y);
			ctx.stroke();
			ctx.fill();
			ctx.setTransform(1, 0, 0, 1, 0, 0);

		}
		drawHead()
		{
			let angle=0;
			switch(this.DirectionSnake)
			{
				case Direction.Pause:
					angle=90*Math.PI;
					break;
				case Direction.Right:
					angle=90*Math.PI;
					break;
				case Direction.Left:
					angle=270*Math.PI;
					break;
				case Direction.Down:
					angle=180*Math.PI;
					break;
			}
			
			
			ctx.translate(this.TabSnake[0].x+cubeSize/2, this.TabSnake[0].y+cubeSize/2); 
			ctx.rotate(angle/180);
			ctx.translate(-this.TabSnake[0].x-cubeSize/2, -this.TabSnake[0].y-cubeSize/2);

			ctx.strokeStyle="black";
			ctx.lineWidth=1;

			ctx.fillStyle = "rgb(0,80,0)";
			ctx.fillRect(this.TabSnake[0].x,this.TabSnake[0].y+cubeSize/3,cubeSize,cubeSize*2/3);
			ctx.beginPath();
			ctx.arc(this.TabSnake[0].x+cubeSize/2,this.TabSnake[0].y+cubeSize/3,cubeSize/2,0,2*Math.PI,true);
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = "white";
			ctx.arc(this.TabSnake[0].x+cubeSize/10,this.TabSnake[0].y+cubeSize*2/3,cubeSize/5,0,2*Math.PI,true);
			ctx.fill();
			ctx.stroke();

			ctx.beginPath();
			ctx.fillStyle = "blue";
			ctx.arc(this.TabSnake[0].x+cubeSize/10, this.TabSnake[0].y+cubeSize*2/3-cubeSize/10,cubeSize/10,0,2*Math.PI,true);
			ctx.fill();
			ctx.stroke();

			ctx.beginPath();
			ctx.fillStyle = "white";
			ctx.arc(this.TabSnake[0].x+cubeSize-cubeSize/10,this.TabSnake[0].y+cubeSize*2/3,cubeSize/5,0,2*Math.PI,true);
			ctx.fill();
			ctx.stroke();


			ctx.beginPath();
			ctx.fillStyle = "blue";
			ctx.arc(this.TabSnake[0].x+cubeSize-cubeSize/10, this.TabSnake[0].y+cubeSize*2/3-cubeSize/10,cubeSize/10,0,2*Math.PI,true);
			ctx.fill();
			ctx.stroke();

			ctx.beginPath();
			ctx.strokeStyle="red";
			ctx.lineWidth=2;
			ctx.moveTo(this.TabSnake[0].x+cubeSize/2, this.TabSnake[0].y);
			ctx.lineTo(this.TabSnake[0].x+cubeSize*0.7,this.TabSnake[0].y-cubeSize/2);
			ctx.stroke();

			ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.arc(this.TabSnake[0].x+cubeSize/2, this.TabSnake[0].y+cubeSize/2,cubeSize/2,-3*Math.PI/4,-Math.PI/4);
			ctx.stroke();


			ctx.strokeStyle="black";
			ctx.lineWidth=1;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
		move()
		{
			clearCube(this.TabSnake[0].x+cubeSize,this.TabSnake[0].y);
			clearCube(this.TabSnake[0].x-cubeSize,this.TabSnake[0].y);
			clearCube(this.TabSnake[0].x,this.TabSnake[0].y+cubeSize);
			clearCube(this.TabSnake[0].x,this.TabSnake[0].y-cubeSize);
			if(this.DirectionSnake!=Direction.Pause)
			{
				switch(this.DirectionSnake)
				{
					case Direction.Up:
						if(this.TabSnake[0].y!=0)
						{
							let Point=new cube(this.TabSnake[0].x,this.TabSnake[0].y-cubeSize,'rgb(0,'+Green+',0)');
							this.TabSnake.splice(0,0,Point);
						}
						else if(this.TabSnake[0].y==0)
						{
							let Point=new cube(this.TabSnake[0].x,canvas.height-cubeSize,'rgb(0,'+Green+',0)');
							this.TabSnake.splice(0,0,Point);
						}
						break;

					case Direction.Down:
						if(this.TabSnake[0].y!=canvas.height-cubeSize)
						{
							let Point=new cube(this.TabSnake[0].x,this.TabSnake[0].y+cubeSize,'rgb(0,'+Green+',0)');
							this.TabSnake.splice(0,0,Point);
						}
						else if(this.TabSnake[0].y==canvas.height-cubeSize)
						{
							let Point=new cube(this.TabSnake[0].x,0,'rgb(0,'+Green+',0)');
							this.TabSnake.splice(0,0,Point);
						}
						break;
					case Direction.Left:
						if(this.TabSnake[0].x!=0)
						{
							let Point=new cube(this.TabSnake[0].x-cubeSize,this.TabSnake[0].y,'rgb(0,'+Green+',0)');
							this.TabSnake.splice(0,0,Point);
						}
						else if(this.TabSnake[0].x==0)
						{
							let Point=new cube(canvas.width-cubeSize,this.TabSnake[0].y,'rgb(0,'+Green+',0)');
							this.TabSnake.splice(0,0,Point);
						}
						break;
					case Direction.Right:
						if(this.TabSnake[0].x!=canvas.width-cubeSize)
						{
							let Point=new cube(this.TabSnake[0].x+cubeSize,this.TabSnake[0].y,'rgb(0,'+Green+',0)');
							this.TabSnake.splice(0,0,Point);
						}
						else if(this.TabSnake[0].x==canvas.width-cubeSize)
						{
							let Point=new cube(0,this.TabSnake[0].y,'rgb(0,'+Green+',0)');
							this.TabSnake.splice(0,0,Point);
						}
						break;
				}
			}
			this.draw();
		}
		eatHimself()
		{
			let X = this.TabSnake[0].x;
			let Y = this.TabSnake[0].y;
			for(let i=1;i<this.TabSnake.length;i++)
			{
				if(X==this.TabSnake[i].x && Y==this.TabSnake[i].y)
				{
					return true;
				}
			}
			return false;
		}
		suppress()
		{
			if(this.DirectionSnake!=Direction.Pause)
			{
				clearCube(snake.TabSnake[snake.TabSnake.length-1].x,snake.TabSnake[snake.TabSnake.length-1].y);
				snake.TabSnake.pop();
				this.drawTail();
			}
		}
	}

	let apple;
	let snake;
	let animGame;
	let speed=200;
	startGame();



	function grid()
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		for(let i=0;i<canvas.height;i+=(cubeSize))
		{
			for(let j=0;j<canvas.width;j+=(cubeSize))
			{
				let color=Damier2;
				if((i+j)%(2*(cubeSize))==0)
				{
					color=Damier1;
				}
				ctx.fillStyle=color;
				ctx.fillRect(i,j,cubeSize,cubeSize);
			}
		}
	}
	function startGame()
	{
        clearInterval(animGame);
		speed=200;
        score=0;
        p.innerHTML="apple(s) : "+score;
		apple= new Apple();
		snake= new Snake();
		grid();
		apple.draw();
		snake.draw();
		document.body.addEventListener("keydown",down);
		animGame= setInterval(anim,speed);

		window.addEventListener("keydown", disableSCrolling, false);

	}

	function disableSCrolling(e) {
		if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		    e.preventDefault();
		}
	}

	function anim()
	{
		changeDirection=false;
		if(!pause)
		{
			let finish=false;
			snake.move()
			if(snake.eatHimself())
			{
				window.removeEventListener("keydown",disableSCrolling);
				clearInterval(animGame);
				finish=true;
				Note(1976,500);

				var xhttp = new XMLHttpRequest();
				xhttp.open("POST", "score-backEnd.php", true); 
				xhttp.setRequestHeader("Content-Type", "application/json");
				xhttp.onreadystatechange = function() {
				   if (this.readyState == 4 && this.status == 200) {
				     // Response
				     var response = this.responseText;
				   }
				};
				xhttp.send(JSON.stringify({game:getGameId(),score: score}));

			}
			if(snake.TabSnake[0].x==apple.x && snake.TabSnake[0].y==apple.y &&!finish)
			{
				snake.TabSnake[snake.TabSnake.length-1].color="rgb(0,"+Green+",0)";
				newApple();
				speed*=0.98;
				clearInterval(animGame);
				animGame=setInterval(anim,speed);
				score++;
				p.innerHTML="apple(s) : "+score;
				Note(1760,400);
			}
			else if(!finish)
			{
				snake.suppress();
			}
			apple.draw();
		}
	}

	function newApple()
	{
		apple.change();
		for(let i=0;i<snake.TabSnake.length;i++)
		{
			if(apple.x==snake.TabSnake[i].x && apple.y==snake.TabSnake[i].y)
			{
				newApple();	
			}
		}
	}
	
	function down(e)
	{
		if(!changeDirection)
		{
			if (e.keyCode == 37 && snake.DirectionSnake!=Direction.Right) {pause=false; Note(1047,300); snake.DirectionSnake=Direction.Left; }
	        if (e.keyCode == 39 && snake.DirectionSnake!=Direction.Left) {pause=false; Note(1175,300); snake.DirectionSnake=Direction.Right; }
	        if (e.keyCode == 38 && snake.DirectionSnake!=Direction.Down) {pause=false; Note(1397,300); snake.DirectionSnake=Direction.Up; }
	        if (e.keyCode == 40 && snake.DirectionSnake!=Direction.Up) {pause=false; Note(1568,300); snake.DirectionSnake=Direction.Down; }
	        if (e.keyCode == 80) { pause=!pause; }
	        changeDirection=!changeDirection;
	    }
	}

	function createPa(color)
	{
		let patternCanvas = document.createElement('canvas');
		let patternContext = patternCanvas.getContext('2d');

		patternCanvas.width = cubeSize/2;
		patternCanvas.height = cubeSize/2;
		patternContext.strokeStyle="black";
		patternContext.fillStyle = color;
		patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
		patternContext.arc(0, 0, cubeSize/3, 0,  Math.PI*0.6);
		patternContext.stroke();
		return ctx.createPattern(patternCanvas, 'repeat');
	}

	function Note(f,n)
	{
		let context = new AudioContext();
		let Gain= context.createGain();
		Gain.gain.value=0.01;
		let o = context.createOscillator();
		o.type = "triangle";
		o.frequency.value=f;
		o.connect(Gain);
		Gain.connect(context.destination);
		o.start();
		setTimeout(function(){o.stop();},n);
	}

	function clearCube(x,y)
	{
		let color=Damier2;
		if((x+y)%(2*(cubeSize))==0)
		{
			color=Damier1;
		}
		ctx.fillStyle=color;
		ctx.fillRect(x,y,cubeSize,cubeSize);
	}
};

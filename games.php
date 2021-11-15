<?php
	$session_active=False;
	session_start();
	if(isset($_SESSION["id"]))
	{
		$session_active=True;
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="icon" type="image/png" href="images/logo2.png" />
	<title>French Games</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> 

	<!--	<link rel="stylesheet" type="text/css" href="indexStyle.css"> -->
	<link rel="stylesheet" href="indexStyle.css">



</head>
<body>

	<?php include 'nav.php'; 
				// if($session_active)
				//{
	include "connexionBdd.php";
	$bdd=connexion();
	$query="Select name,path,category from games where id=".$_GET['id'];
	$rep=mysqli_query($bdd,$query);
	$path="";
	$category;
	if($rep)
	{
		$val=mysqli_fetch_assoc($rep);
		$category=$val['category'];
		echo '
		<script type="text/javascript">
		function getGameId()
		{
			return '.$_GET["id"].';
			}</script>
			<script type="text/javascript" src="games/'.$val['path'].'/script.js"></script>';

			echo "<h1 class=\"text-center mt-2\"><u>".ucfirst($val['name'])."</u></h1>";
		}
				// }
	?>



	<div class="container ">
		<div class="row mb-3">
			<div id="div_canvas" class="col-12 d-flex justify-content-center mt-3">
				<canvas id="canvas" class="border border-black"></canvas>
			</div>
		</div>
		<div class="row justify-content-center align-items-center">
			<div class="col-4 text-right"> 
				<p id="score"></p>
			</div>
			<div class="col-4 text-center">
				<button class="btn btn-dark " id="replay">Rejouer</button>
			</div>
			<div class="col-4 text-left">
				<?php
					$query = " Select * from likes where id_player=".$_SESSION['id']." and id_game =".$_GET['id'];
					$rep=mysqli_query($bdd,$query);
					if($rep)
					{
						$query2="Select count(*) from likes where id_game=".$_GET['id'];
						$rep2=mysqli_query($bdd,$query2);
						if($rep2)
						{
							if($val2=mysqli_fetch_row($rep2))
							{
								if (mysqli_num_rows($rep)==1)
									echo "<button class='btn btn-danger' id='like'>♥ ".$val2[0]."</button>";
								else
									echo "<button class='btn btn-dark' id='like'>♥ ".$val2[0]."</button>";
							}
						}

					}
				?>
			</div>
		</div>
	</div>  





	<br />

	<div class="container" style="height : 500px;">
		<div class="row">
			<?php 
			if($category!="2 joueurs")
			{
				echo '<div class="col-12 col-sm-6 order-sm-1 order-2">';
			}
			else
			{
				echo '<div class="col-12 w-25">';
			}
			
			?>
			<h3 class="text-center">Commentaires</h3>
			<?php 
			if ($session_active) {
				echo '<input type="text" id="commentTxt" placeholder="commentaire..." required>
				<input type="submit" value="envoyer" id="sendButton">';
			}	
			else
			{
				echo '<p>veuillez vous connecter.</p>';
			}

			?>


			<div id="comment-div">
				<?php
					$query = "Select id_player,text,date,id from comments where id_game=".$_GET['id']." Order By date DESC";// limit 10"; // TODO
					$rep=mysqli_query($bdd,$query);
					if($rep) 
					{
						while($val=mysqli_fetch_assoc($rep)) 
						{
							$pseudo="unknow";
							$query2 = "Select pseudo from users where id=".$val['id_player'];
							$rep2=mysqli_query($bdd,$query2);

							if($rep2) 
							{
								$val2=mysqli_fetch_assoc($rep2);
								$pseudo=$val2['pseudo'];

							}
							echo "<p class=\"comment\" id=\"comment-".$val['id']."\"> <a href=\"profil.php?id=".$val['id_player']."\"><b>".$pseudo."</b></a><span class=\"date\"> ".$val['date']."</span><br/><span class=\"txt\">".$val['text']."</span></p>";
						}
					}
					?>	
				</div>
			</div>
			<?php 
			if($category!="2 joueurs")
			{
				echo '					
				<div class="col-12 col-sm-6 order-1 order-sm-2">
				<div id="best-score">
				<h3 class="text-center">Meilleurs joueurs</h3>
				<table class="table">
				<thead class="thead-dark">
				<tr>
				<th scope="col">Rang</th>
				<th scope="col">Pseudo</th>
				<th scope="col">Score</th>
				</tr>
				</thead>
				<tbody id="tbody-score">

				</tbody>
				</table>
				</div>
				</div>';
			}
			?>


		</div>
	</div>

	<script type="text/javascript">
		function AjaxLike()
		{
			var xhttp = new XMLHttpRequest();
			xhttp.open("POST", "likes-backEnd.php", true); 
			xhttp.setRequestHeader("Content-Type", "application/json");
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					try
					{
						var response = JSON.parse(this.responseText);
						like_button.innerHTML="♥ "+response.likes;
						if (response.player_like)
						{
							like_button.className="btn btn-danger";
						}
						else
						{
							like_button.className="btn btn-dark";
						}
					}
					catch(e) {}
				}
			};
			xhttp.send(JSON.stringify({game:getGameId()}));
		}

		function getNews()
		{
			var divComment= document.getElementById("comment-div");
			var lastCommentId=0;

			var children = divComment.children;
			for(var i= 0;i<children.length;i++)
			{
				var strCommentId=children[i].id;
				var tempId=strCommentId.substring(8,strCommentId.length);
				tempId=parseInt(tempId);
				if(tempId>lastCommentId){
					lastCommentId=tempId;
				}
			}

			var xhttp = new XMLHttpRequest();
			xhttp.open("POST", "news-backEnd.php", true); 
			xhttp.setRequestHeader("Content-Type", "application/json");
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					try
					{
						var response = JSON.parse(this.responseText);
						for (const comment of response)
						{
							let p = document.createElement('p'); 
							let a = document.createElement('a');
							let b = document.createElement('b');
							p.append(a);
							a.append(b);
							b.innerHTML=comment.pseudo;
							a.href="profil.php?id="+comment.id_player;
							p.id="comment-"+comment.id;
							p.classList.add("comment");
							p.innerHTML+="<span class=\"date\"> "+comment.date+"</span> <br /><span class=\"txt\">"+comment.text+"</span>";
							divComment.prepend(p);
						}
					}
					catch(e) {}

				}
			};
			xhttp.send(JSON.stringify({lastCommentId: lastCommentId, game :getGameId()}));

		}

		setInterval(getNews,10000);


		function getBestScore() 
		{
				let tbody=document.getElementById("tbody-score");
				var xhttp = new XMLHttpRequest();
				xhttp.open("POST", "bestScore-backEnd.php", true); 
				xhttp.setRequestHeader("Content-Type", "application/json");
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						try 
						{
							console.log(this.responseText);
							var response = JSON.parse(this.responseText);
							console.log("ok");
							let i=0;
							let tr=tbody.children;
							for(const best of response)
							{
								console.log(tr.length>i);
								if(tr.length>i)
								{
									if(tr[i].children[1].innerHTML!=best.pseudo || tr[i].children[2].innerHTML!=best.score )
									{
										tr[i].children[1].innerHTML=best.pseudo;
										tr[i].children[2].innerHTML=best.score;
									}
								}
								else
								{

									let newtr=document.createElement('tr');

									let newth=document.createElement('th');

									newth.scope="row";

									newth.innerHTML=i+1;

									let td1=document.createElement('td');
									let td2=document.createElement('td');

									td1.innerHTML=best.pseudo;
									td2.innerHTML=best.score;

									newtr.append(newth);
									newtr.append(td1);
									newtr.append(td2);
									tbody.append(newtr);
									console.log("ajout");
								}
								i++;
							}
							console.log(response);
						}
						catch(e)
						{}
					}
				};
				xhttp.send(JSON.stringify({game:getGameId()}));

			}

			let divScore = document.getElementById("best-score");
			getBestScore();
			setInterval(getBestScore,10000);

			let like_button=document.getElementById("like");
			if (like_button!=null){
				like_button.addEventListener("click",AjaxLike,false);	
			}



			function sendForm()
			{
				var xhttp = new XMLHttpRequest();
				xhttp.open("POST", "comment-backEnd.php", true); 
				xhttp.setRequestHeader("Content-Type", "application/json");
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						getNews();
						document.getElementById("commentTxt").value="";
					}
				};
				xhttp.send(JSON.stringify({text: new String(document.getElementById("commentTxt").value), game :getGameId()}));
			}

			let c=document.getElementById("sendButton");
			if (c!=null)
			{
				c.addEventListener("click",sendForm,false);						
			}


		</script>

</body>
</html>

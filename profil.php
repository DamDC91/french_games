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
	<link rel="stylesheet" type="text/css" href="indexStyle.css">
</head>
<body>
	<?php include( "nav.php")?>

	<div class="container w-100 text-center mt-3 mb-5">

		<?php
		include "connexionBdd.php";
		$bdd=connexion();
		$query = "select * from users where id=".$_GET['id'];
		$rep=mysqli_query($bdd,$query);
		$infoPlayer;
		if($rep)
		{
			$infoPlayer=mysqli_fetch_assoc($rep);
			echo"<h1><u>".$infoPlayer['pseudo']."</u></h1>";
		}

		$src="avatars/no-avatar.jpg";
		$extensions_autorisees = array('jpg', 'jpeg', 'gif', 'png');
		foreach ($extensions_autorisees as $ext )
		{
			if(is_file("avatars/".$_GET['id'].".".$ext))
			{
				$src="avatars/".$_GET['id'].".".$ext;
			}
		}	
		echo "<img class=\"w-25 rounded-circle\" src=\"".$src."\">";
		if($session_active)
		{
			if($_SESSION['id']==$_GET['id'])
			{
				echo '<div class="d-flex mb-2">
				<form method="post" action="avatar-backEnd.php" enctype="multipart/form-data" class="m-2 mx-auto text-center">
				<div class="row justify-content-center">
				<input type="file" name="avatar" class="form-control-file">
				</div>
				<div class="row justify-content-center m-2">
				<button type="submit" class="btn btn-dark">Changer de photo</button>
				</form>
				</div>';
			}
		}

		?>
	</div>

	<div class="container">
		<div class="row">
			<div class="col-12 col-sm-6">
				<h5 class="text-center">A Propos</h5>
				<ul>
					<li> membre depuis <?php $date=new DateTime($infoPlayer['registration_date']); echo $date->format('d/m/Y'); ?> </li>


					<li> date de naissance <?php $date=new DateTime($infoPlayer['birth_date']); echo $date->format('d/m/Y'); ?> </li>
					<li>citation : <?php

					$query="Select quote from users where id=".$_SESSION['id'];
					$rep=mysqli_query($bdd,$query);
					$quote="<i>pas de citation..</i>";
					if($rep)
					{
						$val=mysqli_fetch_assoc($rep);
						if($val['quote']!=null)
							$quote=$val['quote'];
					}
					echo '<span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="cliquer pour éditer">
					<div id="div">
					<p id="citation">'.$quote.'</p>';
					if ($session_active)
					{
						echo '
						<form id="form" method="POST" action="quote-backEnd.php">
						<input type="text" id="input" name="quote">
						<!-- <button type="submit">envoyer</button> -->
						</form>
						</div>
						</span>
						<script type="text/javascript">

						function change()
						{
							if(p.hidden==false)
							{
								input.value=p.innerHTML.replace("<i>pas de citation..</i>","");
								console.log(p.innerHTML);
								p.hidden=true;
								form.hidden=false;

							}   
						}
						let div = document.getElementById("div");
						let p=document.getElementById("citation");
						let form = document.getElementById("form");
						let input=document.getElementById("input");
						form.hidden=true;
						div.addEventListener("click",change);

						</script>';
					}

					?>

				</li>
			</ul>

			 </div>
			<div class="col-12 col-sm-6">
				<h5 class="text-center">Meilleurs scores</h5>
				<table class="table">
					<thead class="thead-dark">
						<tr>
							<th scope="col">Classement</th>
							<th scope="col">Jeu</th>
							<th scope="col">Score</th>
						</tr>
					</thead>
					<tbody>
						<?php
						$query="Select id_game,score from scores where id_player=".$_GET['id'];
						$rep=mysqli_query($bdd,$query);
						if($rep)
						{
							while($line=mysqli_fetch_assoc($rep))
							{
								echo "<tr>";
								$query3="select count(*) from scores where id_game=".$line['id_game']." and score>".$line['score'];
								$rep3=mysqli_query($bdd,$query3);
								if($rep3)
								{
									if($val=mysqli_fetch_row($rep3))
									{
										$rank=$val[0]+1;
										echo '<th scope="col">'.$rank.'</th>';
									}

								}

								$query2="Select name, id from games where id=".$line['id_game'];
								$rep2=mysqli_query($bdd,$query2);
								if($rep2)
								{
									if($val=mysqli_fetch_assoc($rep2))
										echo '<td><a href="games.php?id='.$val["id"].'">'.ucfirst($val["name"])."</a></td>";
									echo '<td>'.$line['score'].'</td>';
								}
								echo "</tr>";
							}

						}

						?>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
</body>

	</html>

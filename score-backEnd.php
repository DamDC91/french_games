<?php
session_start();
if(isset($_SESSION["id"]))
{
	header("Content-Type: application/json"); 
	$data = json_decode(file_get_contents("php://input")); 

	include "connexionBdd.php";
	$bdd=connexion();
	$query="select score from scores where id_player=".$_SESSION['id']." and id_game=".$data->{'game'};
	$rep=mysqli_query($bdd,$query);
	if($rep)
	{
		$line=mysqli_fetch_array($rep);
		if($line["score"]<$data->{'score'})
		{ 
			$query="Update scores set score = ".$data->{'score'}." where id_player=".$_SESSION['id']." and id_game=".$data->{'game'}; 
			$rep=mysqli_query($bdd,$query);
			if(mysqli_affected_rows($bdd)==0)
			{
				$query="Insert into scores (id_player,id_game,score) values(".$_SESSION['id'].",".$data->{'game'}.",".$data->{'score'}.")"; 
				$rep=mysqli_query($bdd,$query);
			}
		}
		else if(mysqli_affected_rows($bdd)==0)
		{
			$query="Insert into scores (id_player,id_game,score) values(".$_SESSION['id'].",".$data->{'game'}.",".$data->{'score'}.")"; 
			$rep=mysqli_query($bdd,$query);
		}
	}
	mysqli_close($bdd);
}
?>

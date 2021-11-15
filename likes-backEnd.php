<?php
session_start();
if(isset($_SESSION["id"]))
{
	header("Content-Type: application/json"); 
	$data = json_decode(file_get_contents("php://input")); 
	
	include "connexionBdd.php";
	$player_like=false;
	$bdd=connexion();
	$query="select id from likes where id_player=".$_SESSION['id']." and id_game=".$data->{'game'};
	$rep=mysqli_query($bdd,$query);
	if($rep)
	{
		if(mysqli_num_rows($rep)==0)
		{
			$player_like=true;
			$query="Insert into likes (id_player,id_game) values(".$_SESSION['id'].",".$data->{'game'}.")"; 
			$rep=mysqli_query($bdd,$query);
		}
		else
		{
			$query="delete from likes where id_player=".$_SESSION['id']." and id_game=".$data->{'game'};
			$rep=mysqli_query($bdd,$query);
		}
	}
	$reponse_json=array();
	$count=0;
	$query="Select count(*) from likes where id_game=".$data->{'game'};
	$rep=mysqli_query($bdd,$query);
	if($rep)
	{
		if($val=mysqli_fetch_row($rep))
		{
			$count=$val[0];
		}
	}
	echo json_encode(array('likes'=>$count,'player_like'=>$player_like));
	mysqli_close($bdd);
}
?>

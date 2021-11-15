<?php
header("Content-Type: application/json"); 
$data = json_decode(file_get_contents("php://input")); 

include "connexionBdd.php";
$bdd=connexion();
$query="select id_player,score from scores where id_game=".$data->{'game'}." Order by score DESC Limit 5";

$rep=mysqli_query($bdd,$query);
if($rep)
{
	$best_score= array();
	while($val = mysqli_fetch_assoc($rep))
	{

		$query2="Select pseudo from users where id=".$val['id_player'];
		$rep2=mysqli_query($bdd,$query2);
		$pseudo="unknow";
		if($rep2)
		{
			$val2=mysqli_fetch_assoc($rep2);
			$pseudo=$val2['pseudo'];
		}
		$tmp=array('score'=>$val['score'],'pseudo'=>$pseudo);
		array_push($best_score,$tmp);
	}
	echo json_encode($best_score);
}
mysqli_close($bdd);
echo " ";
?>

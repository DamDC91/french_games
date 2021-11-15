<?php

header("Content-Type: application/json"); 
$data = json_decode(file_get_contents("php://input")); 

include "connexionBdd.php";
$bdd=connexion();
$query="select id,id_player,text,date from comments 
where id_game=".$data->{'game'}." and id>".$data->{'lastCommentId'};

$rep=mysqli_query($bdd,$query);

if($rep)
{

	$val2=mysqli_fetch_assoc($rep2);
	$pseudo=$val2['pseudo'];
	$comments=array();
	while($val=mysqli_fetch_assoc($rep))
	{
		$query2="Select pseudo from users where id=".$val['id_player'];
		$rep2=mysqli_query($bdd,$query2);
		$pseudo="unckown";
		if($rep2)
		{
			$val2=mysqli_fetch_assoc($rep2);
			$pseudo=$val2['pseudo'];
		}

		$c=array('id'=>$val['id'], 
			'pseudo'=>$pseudo,
			'text'=>$val['text'],
			'id_player' => $val['id_player'],
			'date'=>$val['date']);
		array_push($comments, $c);
	} 
	echo json_encode($comments);
}
mysqli_close($bdd);

?>
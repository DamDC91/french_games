<?php
session_start();
if(isset($_SESSION["id"]))
{
	header("Content-Type: application/json"); 
	$data = json_decode(file_get_contents("php://input")); 
	
	include "connexionBdd.php";
	$bdd=connexion();

	$stmt = mysqli_stmt_init($bdd);
	mysqli_stmt_prepare($stmt, "Insert into comments (id_player,id_game,text,date) values(?,?,?, NOW())");

	mysqli_stmt_bind_param($stmt, "iss", $_SESSION['id'],$data->{'game'},$data->{'text'});

	mysqli_stmt_execute($stmt);
	mysqli_close($bdd);
}
?>

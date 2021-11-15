<?php
session_start();
include "connexionBdd.php";
$bdd=connexion();
$stmt = mysqli_stmt_init($bdd);
mysqli_stmt_prepare($stmt, "Update users set quote=? where id=?");


mysqli_stmt_bind_param($stmt, "si", $_POST['quote'],$_SESSION['id']);


mysqli_stmt_execute($stmt);

if(mysqli_affected_rows($bdd)!=0)

{
	mysqli_close($bdd);
	header("location: profil.php?id=".$_SESSION['id']);
}
else
{
	mysqli_close($bdd);
	header("location: profil.php?id=".$_SESSION['id']."&error=Une erreur est survenue");
}
?>
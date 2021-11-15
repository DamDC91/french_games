<?php
$pseudo=$_POST["pseudo"];
$pwd=$_POST["password"];

$table="users";
include "connexionBdd.php";
$bdd=connexion();
$query="Select * from $table where pseudo='$pseudo'";
$rep=mysqli_query($bdd,$query);
if($rep)
{
	$res=mysqli_num_rows($rep);
    if($res==1) //always 1 line
    {
        $line=mysqli_fetch_array($rep);
        if(password_verify($pwd,$line['password']))
        {
            echo "valide";
            if (session_status()== PHP_SESSION_ACTIVE)
                session_destroy();
            session_start();
            $_SESSION['id']=$line['id'];
            $_SESSION['pseudo']=$pseudo;
            $_SESSION['registration_date']=$line["registration_date"];
            $_SESSION['birth_date']=$line['birth_date'];
            mysqli_close($bdd);
            header("location:index.php");
        }
        else
        {
            mysqli_close($bdd);
            echo "mot de passe invalide";
            header("location: index.php?error=mot de passe invalide");
        }
    }
    else
    {
        mysqli_close($bdd);
        header("location: index.php?error=pseudo invalide");
        echo "identifiant invalide";
    }
}
else
{
    mysqli_close($bdd);
	header("location: index.php?error=Une erreur est survenue");
	echo "probleme de requete";
}
?>

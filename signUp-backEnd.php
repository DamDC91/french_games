<?php
$pseudo=$_POST["pseudo"];
$pwd=PASSWORD_HASH($_POST["password"],PASSWORD_DEFAULT);
$mail=$_POST["mail"];
$birth=$_POST["birth_day"];

$table="users";
include "connexionBdd.php";
$bdd=connexion();
$query='Insert into '.$table.' (pseudo,password,email,registration_date,birth_date) values 
("'.$pseudo.'","'.$pwd.'","'.$mail.'",NOW(),"'.$birth.'")';
$rep=mysqli_query($bdd,$query);
if ($rep)
{
	$query2="Select id, registration_date from ".$table." where pseudo=\"".$pseudo."\"";
	$rep2=mysqli_query($bdd,$query2);
	if ($val=mysqli_fetch_array($rep2))
	{
		session_start();
		$_SESSION['id']=$val['id'];
		$_SESSION['pseudo']=$pseudo;
		$_SESSION['registration_date']=$val["registration_date"];
		$_SESSION['birth_date']=$birth;
	}

}
else
{
    mysqli_close($bdd);
	header("location: signUp.php?error=pseudo ou mail déjà utilisé");
}


  //  mysqli_close($bdd);

mysqli_close($bdd);
if(isset($_FILES['avatar']) AND $_FILES['avatar']['error'] == 0 AND !empty($_FILES['avatar']['name']))
{
    $maxSize=2097152; //2Mo

    $infosfichier = pathinfo($_FILES['avatar']['name']);
    $extension_upload = strtolower($infosfichier['extension']);
    $extensions_allow = array('jpg', 'jpeg', 'gif', 'png');

    if (in_array($extension_upload, $extensions_allow) AND $_FILES['avatar']['size']<$maxSize )
    {
        error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
        if(!move_uploaded_file($_FILES['avatar']['tmp_name'], "avatars/".$_SESSION['id'].".".$extension_upload))
        {
            header("location: signUp.php?error=probleme avec l'image");
            print_r(error_get_last());
        } 

    }
}
header("location: index.php");
?>


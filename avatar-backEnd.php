<?php
session_start();
if(isset($_FILES['avatar']) AND $_FILES['avatar']['error'] == 0 AND !empty($_FILES['avatar']['name']))
{
    $maxSize=2097152; //2Mo

    $infosfichier = pathinfo($_FILES['avatar']['name']);
    $extension_upload = strtolower($infosfichier['extension']);
    $extensions_autorisees = array('jpg', 'jpeg', 'gif', 'png');

    if (in_array($extension_upload, $extensions_autorisees) AND $_FILES['avatar']['size']<$maxSize )
    {
       error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
       foreach ($extensions_autorisees as $ext ) {
            echo "avatars/".$_SESSION['id'].".".$ext."<br />";
            if(is_file("avatars/".$_SESSION['id'].".".$ext))
            {
                unlink("avatars/".$_SESSION['id'].".".$ext);
            }
        }
        if(move_uploaded_file($_FILES['avatar']['tmp_name'], "avatars/".$_SESSION['id'].".".$extension_upload))
        {
            echo "download";
        }
        else
        {

            print_r(error_get_last());
            header("location: profil.php?id=".$_SESSION['id']."&error=Probleme avec l'image.");
        }

    }
    mysqli_close($bdd);
    header("location: profil.php?id=".$_SESSION['id']);
}
mysqli_close($bdd);
header("location: profil.php?id=".$_SESSION['id']."&error=Aucune Image.");


?>
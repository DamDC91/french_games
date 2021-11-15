<?php
function connexion()
{
    $host="localhost";
    $user="admin";
    $pass="root";
    $base="french_games";
    $bdd=mysqli_connect($host,$user,$pass,$base);

    if(!$bdd)
        die("Echec de la connexion au serveur: ".mysqli_connect_error()." ".mysqli_connect_errno());
    mysqli_set_charset($bdd,"utf-8");
    return $bdd;
}
?>

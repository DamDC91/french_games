<?php
$session_active=False;
session_start();
if(isset($_SESSION["id"]))
{
	$session_active=True;
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="icon" type="image/png" href="images/logo2.png" />
	<title>French Games</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" media="screen" href="indexStyle.css">
</head>
<body>

  <?php include( "nav.php")?>

  <?php
    $category="retro";
    if(isset($_GET['category']))
    {
      $category=$_GET['category'];
    }
  function Display_Game($val,$bdd)
  {
    $query="Select count(*) from likes where id_game=".$val['id'];
    $rep=mysqli_query($bdd,$query);
    $nb_likes=0;
    if($rep)
    {
      $v=mysqli_fetch_array($rep);
      $nb_likes=$v[0];
    }
        echo "<div class=\"row\"><div class=\"col-12\"><h3 class=\"text-center\">".ucfirst($val["name"])." (♥ ".$nb_likes.")</h3></div></div>";
        echo "<a href=\"games.php?id=".$val['id']."\">";
        echo "<div class=\"row border-bottom border-black pb-3 pt-3\">";

        echo "<div class=\"col-12 col-sm-3\"><img src=\"games/".$val["path"]."/".$val["path"].".png\"></div>";
        echo "<div class=\"col-12 col-sm-6\"><p>".$val["description"]."</p></div>";

        echo "<div class=\"col-12 col-sm-3\"> <h3>Meilleurs Joueurs</h3><ol>";

        $query2="Select id_player, score from scores where id_game=".$val["id"]." Order by score Desc Limit 3";
        $rep2=mysqli_query($bdd,$query2);
        if($rep2)
        {
          while($val2=mysqli_fetch_assoc($rep2))
          {
            $query3="Select pseudo from users where id=".$val2['id_player'];
            $rep3=mysqli_query($bdd,$query3);
            if($rep3)
            {               
              $val3=mysqli_fetch_assoc($rep3);                      
              echo "<li> ".$val3['pseudo']." : ".$val2["score"]." </li>";
            }
          }
        } 
        echo "</ol></div>";

        echo "</div></a>";
  }

  include "connexionBdd.php";
  $bdd=connexion();
  if(!isset($_GET['search']))
  {
    echo '    <h1 class="text-center mt-5 mb-4"><u>Jeux</u></h1>';
    echo '<div class="container w-75">';
    $query = "Select id, name,description,path from games where category=\"".$category."\"";
    $rep=mysqli_query($bdd,$query);

    if($rep)
    {
      while($val=mysqli_fetch_assoc($rep))
      {
        Display_Game($val,$bdd);
      }
    }
  }

  else
  {
    echo '    <h1 class="text-center mt-5">Recherche pour "'.$_GET['search'].'"</h1>';
    echo '    <h3 class="text-center mt-5">Jeux</h3>';
    echo '<div class="container w-75">';
    $query = "Select id, name, description,path from games";// where Lower(name)=\"".strtolower($_GET['search'])."\"";
    $rep=mysqli_query($bdd,$query);
    if($rep)
    {
        $cpt=0;
        while($val=mysqli_fetch_assoc($rep))
        {
          $p=0;
          similar_text(strtolower($val['name']), strtolower($_GET['search']),$p);
          if($p>=75.0)
          {
            $cpt++;
            Display_Game($val,$bdd);
          }
        }
        if($cpt==0)
        {
          echo '<p><i>Pas de jeu trouvé...</i></p>';
        }
    }
    echo '<h3 class="text-center mt-5">Profil</h3>';
    $query="Select id,pseudo from users";// where Lower(pseudo)=\"".strtolower($_GET['search'])."\"";
    $rep=mysqli_query($bdd,$query);
    {
        $cpt=0;
        while($val=mysqli_fetch_assoc($rep))
        {
          $p=0;
          similar_text(strtolower($val['pseudo']), strtolower($_GET['search']),$p);
          if($p>75.0)
          {
            $cpt++;
           echo '<div class="col-12"> <a href="profil.php?id='.intval($val['id']).'">'.$val['pseudo'].'</a></div>';
          }
        }
        if($cpt==0)
        {
           echo '<p><i>Pas de profil trouvé...</i></p>';
        }
    }
  }

?>
</div>
</body>
</html>

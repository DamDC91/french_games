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
    <link rel="stylesheet" type="text/css" href="indexStyle.css">
</head>
<body>

<?php include( "nav.php")?>


    <div class="container mt-5">

        
        <div class="row">
            <h1 class="mx-auto">Inscription </h1>
        </div>
        <div class="row">
            <form method="post" action="signUp-backEnd.php" enctype="multipart/form-data" class="m-2 mx-auto">

                <div class="col-xs-4">
                    <input type="text" name="pseudo" placeholder="Pseudo" class="form-control" required></br>

                    <input type="email" name="mail" placeholder="Mail" class="form-control" required></br>

                    <input type="password"  name="password" placeholder="Mot de passe" class="form-control" required></br>

                    <div class="form-group">

                        <label for="date">Date de naissance</label>

                        <input type="date"  name="birth_day" id="date" class="form-control-date" required></br>

                    </div>

                    <div class="form-group">
                        <label for="profil-picture">Avatar</label>
                        <input type="file" name="avatar" id="profil-picture" class="form-control-file">
                        <small class="form-text text-muted">Ce champs c'est pas obligatoire.</small>
                    </div>

                    <button type="submit" class="btn btn-dark">s'inscrire</button>
                </div>

            </form>
        </div>
    </div>  

</body>
</html>

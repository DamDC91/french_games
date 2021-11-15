	<nav class="navbar navbar-expand-lg navbar-light bg-danger">
		<a class="navbar-brand" href="index.php"><img id="logo" src="images/logo1.png"/></a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
                <?php
                if ($session_active)
                {
                echo '<li class="nav-item">
                    <a class="nav-link" href="profil.php?id='.$_SESSION['id'].'">Profil<span class="sr-only">(current)</span></a>
                </li>';
                echo '<li class="nav-item">
                    <a class="nav-link" href="deconnexion.php">Se Déconnecter <span class="sr-only">(current)</span></a>
                </li>';

                }
                else
                {
                    echo '<li class="nav-item">
                    <a class="nav-link" id="btn" data-toggle="modal" data-target="#connexionModal" >Se Connecter <span class="sr-only">(current)</span></a>
                    </li>

                    <li class="nav-item">
                    <a class="nav-link" href="signUp.php">S\'inscrire <span class="sr-only">(current)</span></a>
                    </li>';
                    echo '	<div class="modal fade" id="connexionModal" tabindex="-1" role="dialog" aria-labelledby="connexionModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-sm modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="connexionModalLabel">Connexion</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<form method="post" action="signIn-backEnd.php">
					<div class="modal-body">

						<div class="form-group">
							<label for="recipient-name" class="col-form-label">Pseudo:</label>
							<input type="text" class="form-control" id="recipient-name" name="pseudo">
						</div>
						<div class="form-group">
							<label for="pwd" class="col-form-label">Mot de passe:</label>
							<input type="password" class="form-control" id="pwd" name="password">
						</div>

					</div>
					<div class="modal-footer">
						<button type="submit" class="btn btn-secondary">Envoyer</button>
					</div>
				</form>
			</div>
		</div>
	</div>';

                }

                ?>
                <!--<li class="nav-item">
                    <a class="nav-link" href="#">Profile</a>
                </li>-->
                <li class="nav-item dropdown">
                	<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                		Jeux
                	</a>
                	<div class="dropdown-menu" aria-labelledby="navbarDropdown">
                		<a class="dropdown-item" href="index.php?category=retro">Jeux Retro</a>
                		<a class="dropdown-item" href="index.php?category=2 joueurs">Jeux 2 Joueurs</a>
                	</div>
                </li>

            </ul>
            <form method="get" class="form-inline my-2 my-lg-0">
            	<input class="form-control mr-sm-2" name="search" type="search" placeholder="rechercher" aria-label="rechercher">
            	<button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button> 

            </form>
        </div>
    </nav>
         <?php if(isset($_GET['error']))
        {
            echo '<script type="text/javascript"> alert("erreur : '.$_GET['error'].'"); document.location.href=document.location.href.substr(0,document.location.href.indexOf("error"));</script>';
        }
        ?>

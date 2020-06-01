<!DOCTYPE html>
<html>

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Alpha</title>

  <link rel="stylesheet" href="web/css/bootstrap_lumen.min.css">
  <link rel="stylesheet" href="web/css/mystyle.css">
  
</head>

<body data-ng-app="main-app">

    <!-- Begin Page Content -->
    <div class="container-fluid">
    	<nav class="navbar navbar-expand-lg navbar-light bg-light">
        	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        		<span class="navbar-toggler-icon"></span>
        	</button>
        	
        	<a class="navbar-brand" href="#">Navbar</a>			
        		<div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        			  	
        			<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        				<li class="nav-item">
        					<a class="nav-link" href="#">Home</a>
        			    </li>
        			    <li class="nav-item">
        			        <a class="nav-link" href="#historiales">Historiales</a>
        			    </li>
        			    <li class="nav-item">
        			        <a class="nav-link" href="#historial">Historial</a>
        			    </li>
        			    <li class="nav-item">
        			        <a class="nav-link" href="#diagnosticos">Diagnosticos</a>
        			    </li>
        			    <li class="nav-item">
        			        <a class="nav-link" href="#controles_clinicos">Controles Clinicos</a>
        			    </li>
        			    <li class="nav-item">
        			        <a class="nav-link" href="#laboratorio">Laboratorio</a>
        			    </li>
        			    <li class="nav-item">
        			        <a class="nav-link" href="#tratamiento">Tratamiento</a>
        			    </li>
        			    <li class="nav-item">
        			        <a class="nav-link" href="#seguimiento">Seguimiento</a>
        			    </li>
        			</ul>
        			    	
        			<form class="form-inline">
                    	<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
        			    				    				    	
        		</div>
        </nav>
			
    	<ng-view></ng-view>
	</div>
	
	
	<script src="web/js/jquery-3.4.1.slim.min.js"></script>
	<script src="web/js/popper.min.js"></script>
	<script src="web/js/bootstrap.min.js"></script>
	<script src="web/js/angular-1.2.32.min.js"></script>	
	<script src="https://code.angularjs.org/1.2.32/angular-route.min.js" ></script>
	
	<!-- myapp js -->
	<script src="web/js/dirPagination.js"></script>
	<script src="app/routes.js"></script>	
	<script src="app/services.js"></script>
	<script src="app/controllers.js"></script>

</body>

</html>


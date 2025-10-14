<?php
################################
## ARCHIVO: Cerrar_sesion.php ##
##                            ##
################################
session_start();
session_destroy();
header("Location: login.html");


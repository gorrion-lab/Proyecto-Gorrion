<?php
/*
===========================================================
 ARCHIVO: CC.php
 DESCRIPCIÓN:
 -----------------------------------------------------------
 Este archivo contiene la configuración y creación de la 
 conexión a la base de datos MySQL utilizada por el sistema 
 del proyecto Gorrión. 

 Su propósito es centralizar la información de conexión 
 (servidor, usuario, contraseña y nombre de la base de datos) 
 para que pueda ser reutilizada por todos los scripts PHP 
 del proyecto que necesiten interactuar con la base de datos.
===========================================================
*/

// ---------------------------------------------
// Parámetros de configuración del servidor
// ---------------------------------------------
// Se definen las variables que almacenan los datos necesarios
// para establecer la conexión con la base de datos.

$servidor = "localhost";        // Nombre o dirección IP del servidor MySQL (local o remoto)
$NombreUsuario = "Vck";         // Usuario autorizado para acceder a la base de datos
$Contrasena = "Vck_mmm_@87";    // Contraseña del usuario de la base de datos
$Nombredb = "huerto";           // Nombre de la base de datos que utiliza el sistema


// ---------------------------------------------
// Creación de la conexión
// ---------------------------------------------
// Se utiliza la clase mysqli de PHP para crear un objeto de conexión 
// con los parámetros definidos anteriormente.

$conn = new mysqli($servidor, $NombreUsuario, $Contrasena, $Nombredb);


// ---------------------------------------------
// Verificación de la conexión
// ---------------------------------------------
// Se valida si la conexión fue exitosa. En caso de error, el programa
// detiene su ejecución y muestra un mensaje con el motivo del fallo.

if ($conn->connect_error) {
    // La función die() interrumpe el script y muestra el mensaje de error.
    die("Conexión fallida: " . $conn->connect_error);
}

// ---------------------------------------------
// Si la conexión es exitosa
// ---------------------------------------------
// El archivo no muestra ningún mensaje para no interferir con el flujo 
// de las demás páginas. Los scripts que incluyan este archivo podrán 
// usar la variable $conn para ejecutar consultas SQL.



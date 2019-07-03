// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCsfFZjOHpIZQ2AjciEdkxkXYR_Pls-kaA",
    authDomain: "chat-topicos2019a.firebaseapp.com",
    databaseURL: "https://chat-topicos2019a.firebaseio.com",
    projectId: "chat-topicos2019a",
    storageBucket: "",
    messagingSenderId: "364032770912",
    appId: "1:364032770912:web:767fe4cfca6425a5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Variable para acceder a los datos de la base
var tabla = firebase.database().ref('chat');

tabla.limitToLast(20).on('value', function (snapshot) {

    //Limpiamos el contenido de chat
    $(".chat").html("");

    //foreach nos servira para recorreer todos los mensajes que tengamos almacenados y mostrarlos
    snapshot.forEach(function (e) {
        //Asignamos el todo el contenido del mensaje a una variable
        var msj = e.val();

        //Validamos si el contenido del mensaje o el nombre del usuario se encuentran vacio en caso de que no sea asi
        //procemos a mostrar los mensajes como elementos de lista de nuestro archivo html
        if ((msj.Mensaje != null) && (msj.Nombre != null)) {

            //Copiamos el contenido a plantilla para luego mostrarlos en cada etiqueta correspondiente y lo hacemos
            //en base al nombre que asignamos a la clase
            $("#plantilla").clone().prependTo(".chat");
            $('.chat #plantilla').show(10);
            $('.chat #plantilla .Nombre').html(msj.Nombre);
            $('.chat #plantilla .Mensaje').html(msj.Mensaje);
            $('.chat #plantilla .Tiempo').html(msj.Fecha);
            //Esta funcion nos sirve para que se apilen los mensajes y se muestren todos, caso contrario solo se nos
            //mostraria el ultimo que se ha añadido.
            $('.chat #plantilla').attr("id", "");
        }

    });
});

//Obtenemos el nombre de usuario mediante un cuadro de dialogo con el la funcion "prompt();"
var Nombre = prompt("Nombre:");

$('#btnEnviar').click(function () {

    //Obtenemos los datos del tiempo en el momento en que se envia el mensaje
    var fec = new Date();
    var d = fec.getUTCDate();
    var m = fec.getMonth() + 1;
    var y = fec.getFullYear();
    var h = fec.getHours();
    var min = fec.getMinutes();

    Fecha = d + "/" + m + "/" + y + " " + h + ":" + min;

    //Se guardan los datos en la base mediante el metodo "push"
    tabla.push({
        Nombre: Nombre,
        Mensaje: $("#Mensaje").val(),
        Fecha: Fecha
    });

    document.getElementById('Mensaje').value='';
});
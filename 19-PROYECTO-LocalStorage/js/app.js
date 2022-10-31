//variables
const formulario = document.querySelector('#formulario');
const listaTw = document.querySelector('#lista-tweets');
//almacenar
let tweets = [];


//event listeners
evento();

function evento() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);


    //cuando el documento esta listo
    // escuchar por DOMContentLoaded es decir cuando el documento este cargado en su totalidad
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        // si no hay un element en storage no va a marvar como error si no que lo va a marcar como null por eso agregarle el o vacio

        console.log(tweets);
        crearHTML();
    });
}



//funciones
function agregarTweet(e){
    e.preventDefault();

    //obtener los datos que el usuario esta ecribiendo
    const tweet = document.querySelector('#tweet').value;

    //valiacion
    if(tweet === ''){
        mostrarError('El mensaje no puede estar vacio');

        // evita que se ejecuten mas lineas de codigo
        return;
    }

    // usamos este objeto para darte un id al tweet y evitar que sean iguales, se podria hacer con la bd
    // el Date.now devuelve el nro en milisegundos que han transcurrido desde 1970
    const tweetObj = {
        id: Date.now(),
        /* texto: tweet */
        // si llave y valor tienen el mismo nombre se puede colocar uno
        tweet
    } 


    //añadir tweet al arreglo
    //spread operator para tener una copia de los tweets
    tweets = [...tweets, tweetObj];
    

    //crear el html
    crearHTML();

    //reinicar el formulario
    formulario.reset();
}


// mostrar el mensaje de error
//reutilizable
function mostrarError(error) {
    //crear elemento
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    //en el css
    mensajeError.classList.add('error');

    //insertar en el html
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    
    // tiempo para que el mensaje de error desaparezca 
    setTimeout(() => {
        mensajeError.remove();
    }, 1800);// despues de 1.8 segundos
}


//Muestra un listado de los tweets
function crearHTML(){
    //forma optima con while
    limpiarHTML();

    // ejecutar la funcion en caso que tweets tenga algun dato

    if (tweets.length > 0) {

        tweets.forEach( tweet =>{
            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            //añadir la funcion de eliminar el tweet
            btnEliminar.onclick = () => {
                borrarTweets(tweet.id);
            }


            //crear el html
            const li = document.createElement('li');
            //añadir texto
            // tweet.tweet hace referencia al obj que estamos creando
            li.textContent = tweet.tweet;

            //asignar el boton
            li.appendChild(btnEliminar);

            // colocar los tweets en el listado de tweets - div vacio
            listaTw.appendChild(li);
            console.log(tweets);
        });
    }
    // una vez que se crea el html llamamos la funcio
    sincronizarStorage();
}

//agrega los tweets actuales a localStorage

function sincronizarStorage(){
    //recordar que es un arreglo y no se puede pasar si no siendo string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// como el appendchild recicla el codigo hay que limpiarlo
function limpiarHTML(){
    //mientras haya elementos clonados por appendchild
    while( listaTw.firstChild ){
        listaTw.removeChild(listaTw.firstChild);
    }
} 

/*eliminar, .filter crea un nuevo arreglo y se lo asignamos a un nuevo arreglo teniendo en cuenta la diferencia de los ids por que estamos borrando y creando o mostrando el no borrado senalando los id*/
function borrarTweets(id){
    tweets = tweets.filter( tweets => tweets.id !== id );

    //vuelve a iterar sobre tweets en y refreca la sesión
    crearHTML();
}
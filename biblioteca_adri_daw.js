function Biblioteca(nombre) {
    this.nombre = nombre;
    this.ejemplares = [];
    this.publicaciones = [];
    this.lectores = [];
    this.prestamos = [];
    // Actualización objetos
    this.nuevaPublicacion = function(isbn, titulo) {
        let nuevaPublicacion = new Publicacion(isbn, titulo);
        this.publicaciones.push(nuevaPublicacion);
        console.log(`Publicación ${isbn} - ${titulo} añadida a la colección`);
        return nuevaPublicacion;
    }
    this.nuevoEjemplar = (signatura, publicacion, ubicacion) => {
        let nuevoEjemplar = new Ejemplar(signatura, publicacion, ubicacion);
        this.ejemplares.push(nuevoEjemplar);
        console.log(`Ejemplar ${signatura} - ${publicacion.titulo} añadido a la colección`);
        return nuevoEjemplar;
    }
    this.nuevoLector = (dni, nombre) =>  { 
        let nuevoLector = new Lector(dni,nombre);
        this.lectores.push(nuevoLector);
        console.log(`Lector ${nombre} registrado en la biblioteca`);
        return nuevoLector;
    };
    // Operaciones de préstamo
    this.nuevoPrestamo = (ejemplar, lector) =>{
        if (ejemplar.disponible) {
            let nuevoPrestamo = new Prestamo(ejemplar, lector);
            this.prestamos.push(nuevoPrestamo);
            console.log(`Préstamo registrado para el ejemplar ${ejemplar.signatura} - ${ejemplar.publicacion.titulo} y lector ${lector.nombre}`);
            return nuevoPrestamo;
        }
        else {
            console.error(`Lo siento, la publicación ${titulo} no está disponible`);
            return null;
        }
    } 
    this.procesaPrestamo = (titulo, lector) => {
        // buscamos el primer ejemplar disponible para el titulo solicitado por el lector
        let ejemplar = this.ejemplares.find(ejemplar => ejemplar.publicacion.titulo === titulo && ejemplar.disponible);
        
        if (ejemplar === undefined) { // No hay ninguno disponible
            console.error(`Lo siento, la publicación ${titulo} no está disponible`);
            return null;
        } else
        {
            nuevoPrestamo = this.nuevoPrestamo(ejemplar,lector);
            console.log(`Se ha procesado el préstamo del ${titulo} con la signatura ${ejemplar.signatura} en el día ${nuevoPrestamo.fechaInicio}` );
            return this.nuevoPrestamo;     
        } 
    };
    this.devuelvePrestamo = (signatura) => {
        let prestamo = this.prestamos.find(prestamo => prestamo.ejemplar.signatura === signatura && !prestamo.ejemplar.disponible);
        if (prestamo === undefined) {
            console.error(`Esa signatura:${signatura} no tiene ningún préstamo activo`);
        } else {
            prestamo.fechaFinal = new Date();
            prestamo.ejemplar.disponible = true;
            console.log(`Se ha devuelto el préstamo del ${prestamo.ejemplar.publicacion.titulo} con la signatura ${signatura} en el día ${prestamo.fechaFinal}`);
        }
    }
 
    // 
    //OBTENER CONSULTAS Biblioteca
    //
            
    this.ejemplaresTitulo = (titulo) => this.ejemplares.filter(ejemplar => ejemplar.publicacion.titulo === titulo);
    this.ejemplaresDisponiblesTitulo = (titulo) => this.ejemplares.filter(ejemplar => ejemplar.publicacion.titulo === titulo && ejemplar.disponible);
    this.seleccionarEjemplar = (signatura) => this.ejemplares.find(ejemplar => ejemplar.signatura === signatura);
    //
    // Listados
    //oBTENER LISTADOS BIBLIOTECA
    this.listarEjemplares = (coleccion = this.ejemplares) => coleccion.forEach(ejemplar => 
             console.log(ejemplar.signatura, ejemplar.publicacion.titulo, ejemplar.disponible, ejemplar.ubicacion)             
     )

    this.listarLectores = () => (console.table(this.lectores));
    this.listarPrestamos = (ejemplar) => {
        let prestamosEjemplar = this.prestamos.filter(prestamo => prestamo.ejemplar.signatura === ejemplar.signatura);
        let salidaPrestamos = [];        
        prestamosEjemplar.forEach(prestamo => salidaPrestamos.push( {
            signatura: prestamo.ejemplar.signatura,
            titulo: prestamo.ejemplar.publicacion.titulo,
            lector: prestamo.lector.dni + " " + prestamo.lector.nombre,
            'fecha inicio': prestamo.fechaInicio,
            'fecha final': prestamo.fechaFinal,
            }
        ))
                                                                           
        console.table(salidaPrestamos);
    }
}
//
    //FUNCION PRESTAMO DE UN LIBRO EXISTENTE
//
function Prestamo(ejemplar, lector) {
    this.ejemplar = ejemplar;
    this.lector = lector;
    this.fechaInicio = new Date();
    this.fechaFinal = '';
    this.ejemplar.disponible = false;
}
//
    //FUNCION MOSTRAR CONSOLA PUBLICACIÓN
//
function Publicacion(ISBN, titulo, autores=[]) {
    this.ISBN = ISBN;
    this.titulo = titulo;
    this.autores = autores;
    this.nuevoAutor = (codigo, nombre) => this.autores.push(new Autor(codigo,nombre));
    this.nuevoEjemplar = (signatura, ubicacion) => this.autores.push(new Ejemplar(signatura,ubicacion)); 
    this.mostrar = function() {
        for (let atributo in this) {
            console.log(`${atributo} => ${this[atributo]}`);
        }
    }
}
//
    //FUNCION OBTENER VALORES DE UN EJEMPLAR(signatura,titulo,ubicacion,disponible)
//
function Ejemplar(signatura, publicacion, ubicacion) {
    this.signatura = signatura;
    this.publicacion = publicacion;
    this.ubicacion = ubicacion;
    this.disponible = true;
    this.ficha = () =>  {
        console.log("Signatura: ", this.signatura);
        console.log("Título: ", this.publicacion.titulo );
        console.log("Ubicación: ", this.ubicacion);
        console.log("Disponible: ", this.disponible ? 'Sí' : 'No');
    }
    
}
//
    //CONSTRUCTORES LECTOR
//
function Lector(dni, nombre) {
    this.dni = dni;
    this.nombre = nombre;
    this.fechaAlta = new Date();
}
//
    //FUNCION MOSTRAR CONSOLA AUTOR
//
function Autor(codigo, nombre){
    this.codigo = codigo;
    this.nombre = nombre;
    this.mostrar = function() {
        for (let atributo in this) {
            console.log(`${atributo} => ${this[atributo]}`);
        }
    }
}

////
            //DATOS EN EL SISTEMA SOBRE LIBROS/AUTORES/LECTORES
////
const biblioGijon = new Biblioteca("Gijón");

let publicacion = biblioGijon.nuevaPublicacion('0131103628','Introducción al ecomerce de la mano de kikegtr');
//AGREGAR AUTOR
publicacion.nuevoAutor(1, 'PABLO ANDRÉ HODEL ACHA');
publicacion.nuevoAutor(2, 'Enrique Morris ');
//AGREGAR EJEMPLAR <biblio gijon>
biblioGijon.nuevoEjemplar("C/12", publicacion, "b12-n");
biblioGijon.nuevoEjemplar("C/13", publicacion, "b13-n");
biblioGijon.nuevoEjemplar("C/14", publicacion, "b14-n");
biblioGijon.nuevoEjemplar("C/15", publicacion, "b15-n");
//
publicacion = biblioGijon.nuevaPublicacion('97818479411007', 'Pablo ANDRÉ: La guerra de precios', ['big_jowi']);
//AGREGAR EJEMPLAR
biblioGijon.nuevoEjemplar("A/08", publicacion, "a08-x");
biblioGijon.nuevoEjemplar("C/09", publicacion, "a09-z");
//VER EJEMPLARES <biblio gijon>
biblioGijon.listarEjemplares();
biblioGijon.listarEjemplares(biblioGijon.ejemplaresDisponiblesTitulo('Introducción al ecomerce de la mano de kikegtr'));
//SELECCIONAR EJEMPLAR
let ejemplar = biblioGijon.seleccionarEjemplar('C/12');
//SACAR FICHA EJEMPLAR SELECCIONADO
ejemplar.ficha();
//
    //LECTORES 
//
const maria = biblioGijon.nuevoLector("aaaaaaaaa", 'Pablo Segón');
const pedro = biblioGijon.nuevoLector("bbbbbbbbb", 'Ainara Crusat');
const juan = biblioGijon.nuevoLector("ccccccccc", 'Alba Gomez');
const luisa = biblioGijon.nuevoLector("dddddddd", 'Cristian Vidal');
//VER LECTORES
biblioGijon.listarLectores();
//PROCESAR PRESTAMO 1
biblioGijon.procesaPrestamo('Introducción al ecomerce de la mano de kikegtr', maria);
//VER PRESTAMO 1 PROCESADO
biblioGijon.listarPrestamos(ejemplar);
//VER EJEMPLARES
biblioGijon.listarEjemplares();
//PROCESAR PRESTAMOS
biblioGijon.procesaPrestamo('Introducción al ecomerce de la mano de kikegtr', juan);
biblioGijon.procesaPrestamo('PABLO ANDRÉ: La guerra de precios', juan);
biblioGijon.procesaPrestamo('Pablo ANDRÉ: La guerra de precios', luisa);
biblioGijon.procesaPrestamo('Pablo ANDRÉ: La guerra de precios', pedro);
biblioGijon.procesaPrestamo('Introducción al ecomerce de la mano de kikegtr', pedro);
//DEVOLUCION DE LIBROS PRESTADOS <cancelación del prestamo>
biblioGijon.devuelvePrestamo('C/14');
biblioGijon.devuelvePrestamo('C/15');
biblioGijon.devuelvePrestamo('C');
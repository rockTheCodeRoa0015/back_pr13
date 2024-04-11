Proyecto de backend

direccion del despliegue del back: https://vercel.com/jesus-projects-60733300/back-pr13

En esta parte del proyecto estan todas las llamadas al backend y los ficharos de carga de la bdd para hacer pruebas.

Los fichero se colocaran en la raiz de C: y se ejecutaran desde consola los script de carga, los ficheros estan en la carperta de fihcerosCSV del proyecto, para ejecutarlos desde la raiz del proyecto llamaremos a los scripts correspondientes, 
los cuales estan en el package.json.

El backend consta de 5 modelos que seran las 5 colecciones en mongo, los modelos son user (los datos del usuario), book (los datos de los libros), categories (la categorias de los libros), sales (la ventas de los libros) y cart (la cesta de la compra).

Funciones de user
register: para registrar usuario
login: para iniciar sesión
getUsers: recuperar todos los usuarios
getUserById: recuperar usuario por id de mongo
getUserByUserId: recuperar usuario por identificador unico creado como campo (esto esta asi para poder simular una bdd relacion para la carga de datos desde los ficheros)
getUserByUsernameAndMail: recuperar usuario por nombre y mail
getNextUser: recupera el ultimo identificador unico creado como campo
updateUsers: modificar usuario
updateUsersPass: modificar pass
deleteUser: borrar usuario

Funciones de book
getBooks: recuperar todos los libros
getBookById: recuperar un libro por id de mongo
getBookByPersonalId: recuperar libro por identificador unico creado como campo (esto esta asi para poder simular una bdd relacion para la carga de datos desde los ficheros)
getBookByCategorie: recuperar libros por categoria
getBookByTitle: recuperar libro por titulo
getBookTopSales: recuperar top 5 libros por ventas
getBookLastAdd: recuperar top 5 libros ultimos añadidos
postBook: añadir libro
updateBook: modificar libro
deleteBook: eliminar libro

funciones categorie
getCategories: recuperar todas las categorias
getCategorieById: recuperar categorias por id de mongo
getCategoriesSelect: recuperar todas las categorias menos infantil y manga para los selectores de la app
getCategorieByPersonalId: recuperar una categorias por identificador unico creado como campo (esto esta asi para poder simular una bdd relacion para la carga de datos desde los ficheros)
postCategorie: añadir categoria
updateCategorie: modificar categoria
deleteCategorie: eliminar categoria

funciones sales
getSales: recuperar todas las ventas
getSalesById: recuperar una venta por id de mongo
getSalesByUser: recuperar las ventas de un usuario por identificador unico creado como campo
getNextSales: recupar el siguiente identificador unico creado como campo
postSale: añadir venta
updateSale: modificar venta
deleteSale: borrar venta

funciones cart
getCart: recuperar todas las cestas
getCartById: recuperar una cesta por id de mongo
getCartByUser: recuperar la cesta de un usuario por identificador unico creado como campo
getCartByUserAndBook: recuperar la cesta de un usuario y libro por identificador unico creado como campo
postCart: añadir a la cesta
updateCart: modificar la cesta
deleteCart: borrar la cesta

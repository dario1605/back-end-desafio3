import express from "express" //Importo el modulo express
import ProductManager from "./components/ProductManager.js" //importo la class ProductManager

const app = express() //Creo una const y llamo a express
app.use(express.urlencoded({extended : true})) // Permito a nuestro servidor express datos codificados en URL

const productos = new ProductManager //Llamo a ProductMannager dentro de la const productos
const readProducts = productos.readProducts() //readProducts trae todos los productos de mi archivo productos.txt

app.get("/products", async (req, res) => { //Este metodo solicita nuestros productos directo a products
    const limit = parseInt(req.query.limit);    //Guardo en la variable limit lo que se escriba despues de nuestro /products en ruta y parseo
    if(!limit) return res.send(await readProducts) //Sino encuentra a limit retorno todos los productos
    const allProducts = await readProducts //Como readProducts es una promesa con await espero 
    const productLimit = allProducts.slice(0, limit) // Y en aca llamo directo a allProducts y con slice le paso por parametros desde donde comienza hasta el fin(limit)
    res.send(productLimit)    //Ejecuto los productos  y los muestro en el navegador
})

app.get("/products/:id", async (req, res) => { //solicito los productos y una nueva ruta para llamar al objeto por id
    const id = parseInt(req.params.id) // Guardo en la variable id el valor despues de que ejectua en la ruta /products/ y parseo
    const allProducts = await readProducts  // Como es una promesa dentro de allproducts utilizo await para esperar 
    const productById = allProducts.find(product => product.id === id) // Con .find selecciono y muestro el producto llamado por el id
    res.send(productById) // y ejecuto el producto llamado por id :D

})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Express por local Host ${server.address().port}`) //Creamos nuestro servidor
})
server.on("error", (error) => console.log(`Error del servidor ${error}`)) //Ejecutamos nuestro servidor. Si hay error nos lo consologea

import fs from 'fs'

export default class ProductManager {
    constructor()  {
        this.patch = "./productos.txt"
        this.products = []
    }
    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)
        
        await fs.promises.writeFile(this.patch, JSON.stringify(this.products))
    }
    
    readProducts = async () => {
        let respuesta = await fs.promises.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return  console.log(respuesta2)
     }

     getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)){
            console.log('No existe el producto')
        } else{
            console.log(respuesta3.find((product) => product.id === id))
        }
     }


     deleteProducts = async (id) => {
        let respuesta3 = await this.readProducts()
        let filterRespuesta3 = respuesta3.filter(products => products.id != id)
        await fs.promises.writeFile(this.patch, JSON.stringify(filterRespuesta3))
        console.log('Producto Eliminado con Exito')
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let productsModif = [ {id, ...producto}, ...productOld]
        await fs.promises.writeFile(this.patch, JSON.stringify(productsModif))
    }


}




//const productManager = new ProductManager
//productManager.addProduct('Cordoba', '1 Litro', 400, 'https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3100656_f.jpg', 1000, 1000)
//productManager.addProduct('Quilmes', '1 Litro', 450, 'https://masonlineprod.vtexassets.com/arquivos/ids/272997-800-auto?v=638116617849200000&width=800&height=auto&aspect=true', 2000, 1100)
//productManager.addProduct('Brahma', '1 Litro', 550, 'https://masonlineprod.vtexassets.com/arquivos/ids/155943/Cerveza-Brahma-Retornable-1-Lt-2-1551.jpg?v=637835121505000000', 3000, 1200)
//productManager.addProduct('Andes', '1 Litro', 560, 'https://almacenfamily.com/productos/7792798002115-355-5ee921024bc57.jpg', 4000, 1300) 
//productManager.addProduct('Imperial', '1 Litro', 600, 'https://http2.mlstatic.com/D_NQ_NP_981069-MLA50973672855_082022-O.webp', 5000, 1400)
//productManager.addProduct('Corona', '1 Litro', 1250, 'https://http2.mlstatic.com/D_NQ_NP_977571-MLA46459474198_062021-V.jpg', 6000, 1500)
//productManager.addProduct('Heineken', '1 Litro', 1150, 'https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000000/3157_1.jpg', 7000, 1600)
//productManager.addProduct('Stella', '1 Litro', 1150, 'https://rankea.com.ar/wp-content/uploads/2020/10/stella-artois-1-litro.jpg', 8000, 1700)

//productManager.getProducts()

//productManager.getProductsById(1)

//productManager.deleteProducts(2)

/*productManager.updateProducts({
    title: 'Cordoba',
    description: '1 Litro',
    price: 380,
    thumbnail: 'https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3100656_f.jpg',
    code: 1000,
    stock: 1000,
    id: 1
})*/

//
interface Product {
    id:number;
    name: string;
    price: number;
    description: string;
}

const products: Product[] = [];

export default products;


// input bhanyeko parameter ho yesma ani omit ley chai yeuta type ligxa ani tesko k chij chainna teo hattai dinxa.

export function createProduct (input: Omit<Product, "id">){
    const newProduct = {
        id: products.length +1,
        name: input.name,
        price: input.price,
        description: input.description,
    };
    products.push (newProduct);
    return newProduct;

}
export function getAllProduct()
{
    return products;
}

export function getProductById(id:number)
{
    const product = products.find((p) => p.id === id);
    return product;
}

export function updateProductById(input : Product)
{
    const index = products.findIndex((p) => p.id === input.id);
    products[index] = {...products[index],
        name: input.name,
        price: input.price,
        description: input.description,
    
    };
    return products[index];
}

export function deleteProductById( id : number){
    const productIndex = products.findIndex((p) => p.id == id);
    const deletedProducts = products.splice(productIndex,1);
    if(productIndex == -1){
        return null;
    }
    return deletedProducts;
}
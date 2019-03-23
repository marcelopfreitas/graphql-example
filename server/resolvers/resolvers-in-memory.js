
let products = [

    {
        "id":1,
        "name":"notebook"
    },
    {
        "id":2,
        "name":"book"
    },
    {
        "id":3,
        "name":"pen"
    }        
];

let orders = [
    {
        "id":1,
        "total":100.0,
        "products":[products[0]]
    },
    {
        "id":2,
        "total":10.15,
        "products":[products[2]]
    },
    {
        "id":3,
        "total":200.0,
        "products":[products[1]]
    }
];


let clients =[
    {
        "id":1,
        "name":"client-1",
        "orders":[orders[0],orders[2]]
    },
    {
        "id":2,
        "name":"client-2",
        "orders":[orders[1]]
    }
];



const resolvers = {
    Query : {
        clients: ()=> {
            return clients;
        },
        products: ()=> {
            return products;
        },

        clientById: (root, args)=> {
            return clients.find( (client)=> {
                return client.id === Number.parseInt(args.id);
            });
        },
        productById: (root, args)=> {
            return products.find( (product)=> {
                return product.id ===  Number.parseInt(args.id);
            });
        }
    },
    
    Mutation: {
        addProduct: (root, args)=> {

            const product = {
                id: ( products.length + 1 ),
                name : args.name
            } ;

            products.push(product);

            return product;
            
        },
        addClient: (root, args)=> {

            const client = {
                id: ( clients.length + 1 ),
                name : args.name
            } ;

            clients.push(client);

            return client;
        },
        deleteProduct: (root, args)=> {

            let deletedProduct;

            products = products.filter( (product)=> {
                if(product.id === Number.parseInt(args.id)) {
                    deletedProduct = product;
                    return false;
                } else {
                    return true;
                }
            });
            
            return deletedProduct;
        },
        deleteClient: (root, args)=> {

            let deletedClient;

            clients = clients.filter( (client)=> {
                if(client.id === Number.parseInt(args.id)) {
                    deletedClient = client;
                    return false;
                }
                else {
                    return true;
                }
            });

            return deletedClient;            

        }                  

    }
};


module.exports = resolvers;
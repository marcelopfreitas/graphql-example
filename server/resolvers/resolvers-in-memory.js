class Clients {
    constructor (){
        this.list = [
            {        
                "id":1,
        
                "name": "client-1",
            },
            {
                "id":2,
                "name":"client-2"
            }
        ];
    }
    getAll() {
        return this.list.map( (client)=> {
                return new Client(client.id, client.name);
        });
    }
    getById(id) {
        return list.find( (client)=> {
            return client.id === id;
        });
    }
    add(name) {
        const client = {
            id: ( this.list.length + 1 ),
            name : name
        } ;
        this.list.push(client);
        return client;        
    }
    delete(id){
        let deletedClient;
        this.list = this.list.filter( (client)=> {
            if(client.id === Number.parseInt(id)) {
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

class Client {
    constructor(id , name){
        this.id = id;
        this.name = name;
        this.orders = new Orders();
    }
    findOrderByDate(args) {
        return this.orders.getByClientPeriod(this.id, args.period.start, args.period.end);
    }
}
class Order {
    
    constructor( id , total, data , products) {
        this.id     = id;
        this.total  = total;
        this.data   = data;
        this.products = products;
    }
    products() {
        return this.productIds.map( (order) => {
            return new Order(order.id,order.total,order.data,order.products.map((id)=>{
                return products.getById(Number.parseInt(id));
            }));
        });
    }
    
}

class Orders {
    constructor() {
        this.list = [
            {
                "id":1,
                "id_client":1,
                "total":100.0,
                "data":'2019-01-01',
                "products":[1]
            },
            {
                "id":2,
                "id_client":2,
                "total":10.15,
                "data":'2019-02-01',
                "products":[3]
            },
            {
                "id":3,
                "id_client":1,
                "total":200.0,
                "data":'2019-03-01',
                "products":[2, 3]
            }
        ];
    }

    getByClientPeriod(clientId, start, end){

        const startDate = new Date(start);
        const endtDate  = new Date(end);
        const products  = new Products();
        
        return this.list.filter( (order) => {
            const currentDate = new Date(order.data)
            return order.id_client ===  clientId  && ( currentDate >= startDate && currentDate <=endtDate );
       }).map( (order) => {
            return new Order(order.id,order.total,order.data,order.products.map((id)=>{
                                                                return products.getById(Number.parseInt(id));
                                                            }));
        });
    }

}
class Products {
    constructor() {
        this.list= [
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
    }
    getAll () {
        return this.list;
    }
    getById(id) {
        return this.list.find( (product)=> {
            return product.id ===  id;
        });
    }
    add(name) {
        const product = {
            id: ( this.list.length + 1 ),
            name : name
        } ;
        this.list.push(product);
        return product;
    }
    delete (id) {
        let deletedProduct;
        this.list = this.list.filter( (product)=> {
            if(product.id === Number.parseInt(id)) {
                deletedProduct = product;
                return false;
            } else {
                return true;
            }
        });
        return deletedProduct;
    }
}

const db = {
        clients  :  new Clients(),
        products :  new Products(),
        orders :    new Orders()
};

/**
 *  Resolver starts here
 */

const resolvers = {
    Query : {
        clients: (obj, args, context, info)=> {
            return db.clients.getAll();
        },
        products: (obj, args, context, info)=> {
            return db.products.getAll();
        },
        clientById: (obj, args, context, info)=> {
            return db.clients.getById(Number.parseInt(args.id));
        },
        productById: (obj, args, context, info)=> {
            return db.products.getById(Number.parseInt(args.id))
        },

    },
    Mutation: {
        addProduct: (root, args)=> {
            return db.products.add(args.name);
        },
        addClient: (root, args)=> {
            return db.clients.add(args.name);
        },
        deleteProduct: (root, args)=> {
            return db.products.delete(Number.parseInt(args.id));
        },
        deleteClient: (root, args)=> {
            return db.clients.delete(Number.parseInt(args.id));
        }                  

    }
};


module.exports = resolvers;
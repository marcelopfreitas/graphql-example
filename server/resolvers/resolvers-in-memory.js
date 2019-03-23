
const products = [

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

const orders = [
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


const clients =[
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
        }

    }
};


module.exports = resolvers;
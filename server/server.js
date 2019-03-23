const express                               = require('express');
const {graphqlExpress, graphiqlExpress}     = require('graphql-server-express');
const bodyParser                            = require('body-parser');
const schema                                = require( './schema');


const port = 4000;

const server = express();

server.get('/', (req, res)=>{
    res.send("<a href='/graphiql'>Please user GraphiQL inteface</a>");
});

server.listen(port, ()=> {
        console.log(`Graphql is running on ${port}`);
});

server.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

server.use('/graphiql', graphiqlExpress({endpointURL:'/graphql'}));
import * as path from 'path';
import * as fs from 'fs';
import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers/resolvers'
const jwt = require('jsonwebtoken');

interface UserInfo {
    account: string;
    password: string;
    name?: string;
    birthday?:string;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, './schema/schema.graphql'),
      'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        const token: string = req.headers.authorization || '';
        if(token !== ''){
            try{
                let user: UserInfo = jwt.verify(token, 'shhhhh');
                return {user}
            }catch(error){
                return null
            }
        }else{
            return null
        }
    }
});

server
.listen()
.then(({ url }) => {
    console.log(`Server is running on ${url}`)
});
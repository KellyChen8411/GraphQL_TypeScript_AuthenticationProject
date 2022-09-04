const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

interface UserInfo {
    account: string;
    password: string;
    name?: string;
    birthday?:string;
}

const users: UserInfo[] = [
    {
        account: "test123@test.com",
        password: "$2b$10$EMuMM7Mw312.jvbBnfSauecActxAnnWc8efqKWRy/MPwPeLvdGaK2",
        name: "Kelly",
        birthday: "1997/08/24",
    },
    {
        account: "test456@test.com",
        password: "$2b$10$9ERaMXJXk2OfUDcXF4.pbuIFFljWc4ymXW4TIeSvzrF46TIBzr/La",
        name: "Duke",
        birthday: "1995/07/30",
    }
]

export const resolvers = {
    Query: {
        me: (parent: undefined, args: null, context: {user: UserInfo}): UserInfo => {
            const userInfo = context.user;
            if(userInfo){
                return userInfo;
            }else{
                throw new Error('You are not authenticated!');
            }
        }
    },
    Mutation: {
        login: (parent: undefined, args: {userInput: UserInfo}): string => {
            const userinfo: UserInfo = args.userInput;
            const { account, password }:  UserInfo = userinfo;
            const userIndex: number = users.findIndex((user) => user.account === account);
            
            if(userIndex === -1){
                throw new Error('User is not exist!') 
            }
            const passwordHashed: string = users[userIndex].password;
            if(!bcrypt.compareSync(password, passwordHashed)){
                throw new Error('Wrong password') 
            }
            const token: string = jwt.sign(users[userIndex], 'shhhhh');
            return token;
        }
    }
  }
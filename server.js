var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const { buildSchema, graphql } = require("graphql");

const userData = require("./db/users.json");

let fakeDB = {};
let spaceFakeDB = [
  { id: 1, name: "office", rent: "$25" ,status:"available"},
  { id: 2, name: "co-working", rent: "$12.50",status:"unavailable" }
]

const schema = buildSchema(`
type Person{ 
  name:String
  email:String
  pet:String
  petName:String
}
enum SPACESTATUS{
  available
  unavailable
}
type Space{ 
  name:String
  rent:String
  status:SPACESTATUS
}
type Developer{  
  profile:Person,
  experience:Int
}
type Query{
    users:[Person],
    user(id:Int):Person
    employee:Developer,  
    isDeveloper:Boolean
    getMsg:String
    getSpace(id:ID !):Space !
    spaces:[Space!]!
}

input SpaceInput{
  name:String,
  rent:String,
  status:SPACESTATUS
}
type Mutation{
  addMsg(msg:String):String
  createSpace(input:SpaceInput):Space !
  updateSpace(id:ID!,input:SpaceInput):Space !
}
`
);

const resolver = {
  name: () => {
    return "hridoy";
  },
  email: () => {
    return "hridoymahmud71@gmail.com";
  },
  employee: () => {
    return {
      profile: {
        name: "Mahmud",
        email: "hrim11@gmail.com"
      },
      experience: 6
    };
  },

  users: () => {
    return userData;

  },
  user: ({ id }) => userData.find((user) => user.id === id),
  addMsg: ({ msg }) => fakeDB.message = msg,
  getMsg: () => fakeDB.message,
  createSpace: ({ name, input }) => (spaceFakeDB[spaceFakeDB.length] = { id: spaceFakeDB.length, ...input }),
  updateSpace: ({ id, input }) => {
    const index = id - 1;
    spaceFakeDB[index] = { id, ...input }
    return spaceFakeDB[index];
  },
  getSpace: ({ id }) => spaceFakeDB.find((space) => space.id == id),
  spaces: () => spaceFakeDB,
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

// graphql({schema, source:"{name,email}",resolver}).then((res) => {
//   console.log(res);
// });
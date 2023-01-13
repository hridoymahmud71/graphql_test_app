var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const { buildSchema, graphql } = require("graphql");

const userData = require("./db/users.json");

const schema = buildSchema(`
type Person{ 
  name:String
  email:String
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
}`);

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
  users: ({id}) => userData.find((user) => user.id === id)

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
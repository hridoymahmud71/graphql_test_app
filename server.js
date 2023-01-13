const { buildSchema, graphql } = require("graphql");

const schema = buildSchema(`
type Query{
     name:String
     email:String
}`);

const resolver = {
    name: () => {
        return "hridoy";
    },
    email: () => {
        return "hridoymahmud71@gmail.com";
    }
}

graphql({schema, source:"{name,email}",resolver}).then((res) => {
  console.log(res);
});
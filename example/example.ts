import { Gql2ts } from "../src";
const gql = `
    type User {
        id: ID! @unique
        name: String!
    }
    union Result = Book | User
    type Book {
        id: ID! @unique
        title: String!
        pages: Int!
        author: User!
    }
`;

Gql2ts.compile(gql);

import { Gql2ts } from "../src";
const gql = `
    
    # add support for enum
    enum Rules {
        ADMIN
        USER
    }

    # add support for interfaces
    interface User {
        id: ID!
        name: String!
    }

`;

Gql2ts.compile(gql);

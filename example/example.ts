import { Gql2ts } from "../src";
const gql = `
    
    # add support for enum
    enum RolesEnum {
        ADMIN
        USER
    }

    # add support for interfaces
    interface User {
        id: ID!
        name: String!
    }

    interface Admin {
        id: ID!
        name: String!
        age: Int!
    }

    # add support for union
    union RolesUnion = User | Admin

`;

Gql2ts.compile(gql);

import { Gql2ts } from "../src";
const gql = `
    
    # add support for enum
    enum RolesEnum {
        ADMIN
        USER
    }

    # add support for interfaces
    interface UserInterface {
        id: ID!
        name: String
    }

    interface AdminInterface {
        id: ID!
        name: String!
        age: Int!
    }

    interface SpecialInterface {
        special: Boolean!
    }

    # add support for union
    union RolesUnion = UserInterface | AdminInterface

    # add support for object
    type UserType implements UserInterface & SpecialInterface {
        age: Float!
    }

    # add support for scalar
    scalar MyCustomScalar

    # add support for input
    input createUserInput {
        id: ID!
        age: Float
    }

`;

console.log(Gql2ts.compile(gql));

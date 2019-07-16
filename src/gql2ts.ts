import {
  parse,
  EnumTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  UnionTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  InputObjectTypeDefinitionNode
} from "graphql";

export class Gql2ts {
  private constructor(private readonly code: string) {}

  public static compile(code: string): void {
    const gql2ts = new Gql2ts(code);
    gql2ts.parse();
  }

  private parse() {
    const ast = parse(this.code).definitions;
    for (const definition of ast) {
      switch (definition.kind) {
        case "EnumTypeDefinition":
          this.enum(definition);
          break;
      }
    }
  }

  private enum(def: EnumTypeDefinitionNode): string {
    return ``;
  }

  private interface(def: InterfaceTypeDefinitionNode): string {
    return ``;
  }

  private union(def: UnionTypeDefinitionNode): string {
    return ``;
  }

  private object(def: ObjectTypeDefinitionNode): string {
    return ``;
  }

  private scalar(def: ScalarTypeDefinitionNode): string {
    return ``;
  }

  private input(def: InputObjectTypeDefinitionNode): string {
    return ``;
  }
}

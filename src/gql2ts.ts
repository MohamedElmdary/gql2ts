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
    console.log(gql2ts.parse());
  }

  private parse(): string {
    const ast = parse(this.code).definitions;
    let result = "";
    for (const definition of ast) {
      switch (definition.kind) {
        case "EnumTypeDefinition":
          result += this.enum(definition);
          break;
        case "InterfaceTypeDefinition":
          result += this.interface(definition);
          break;
        case "UnionTypeDefinition":
          result += this.union(definition);
          break;
        case "ObjectTypeDefinition":
          result += this.object(definition);
          break;
        case "ScalarTypeDefinition":
          result += this.scalar(definition);
          break;
        case "InputObjectTypeDefinition":
          result += this.input(definition);
          break;
      }
    }
    return result;
  }

  private enum(def: EnumTypeDefinitionNode): string {
    return `\nenum ${def.name.value} { ${(def.values || [])
      .map(v => v.name.value)
      .join(", ")} }\n`;
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

import {
  parse,
  EnumTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  UnionTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  InputObjectTypeDefinitionNode
} from "graphql";
import { getType } from "./lib";
import { getInterfaces } from "./lib/getInterfaces.helpers";

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
    return `enum ${def.name.value} { ${(def.values || [])
      .map(v => v.name.value)
      .join(", ")} }\n`;
  }

  private interface(def: InterfaceTypeDefinitionNode): string {
    return `interface ${def.name.value} { ${(def.fields || [])
      .map(field => field.name.value + getType(field))
      .join("; ")} }\n`;
  }

  private union(def: UnionTypeDefinitionNode): string {
    return `type ${def.name.value} = ${(def.types || [])
      .map(type => type.name.value)
      .join(" | ")};\n`;
  }

  private object(def: ObjectTypeDefinitionNode): string {
    return `interface ${def.name.value} ${getInterfaces(
      (def.interfaces || []).slice()
    )} { ${(def.fields || [])
      .map(field => field.name.value + getType(field))
      .join("; ")} }\n`;
  }

  private scalar(def: ScalarTypeDefinitionNode): string {
    return `type ${def.name.value} { };\n`;
  }

  private input(def: InputObjectTypeDefinitionNode): string {
    return ``;
  }
}

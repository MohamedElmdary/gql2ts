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
import { getName } from "./lib/getName.helper";

export class Gql2ts {
  private constructor(private readonly code: string) {}

  public static compile(code: string): string {
    const gql2ts = new Gql2ts(code);
    return gql2ts.parse();
  }

  private parse(): string {
    const ast = parse(this.code).definitions;
    let result = "";
    for (const definition of ast) {
      switch (definition.kind) {
        // case
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
    return `enum ${def.name.value} {\n  ${(def.values || [])
      .map(v => v.name.value)
      .join(",\n  ")} \n}\n\n`;
  }

  private interface(def: InterfaceTypeDefinitionNode): string {
    return `interface ${def.name.value} {\n  ${(def.fields || [])
      .map(field => field.name.value + getType(field))
      .join(";\n  ")} \n}\n\n`;
  }

  private union(def: UnionTypeDefinitionNode): string {
    return `type ${def.name.value} = ${(def.types || [])
      .map(type => type.name.value)
      .join(" | ")};\n\n`;
  }

  private object(def: ObjectTypeDefinitionNode): string {
    return `interface ${def.name.value} ${getInterfaces(
      (def.interfaces || []).slice()
    )} {\n  ${(def.fields || [])
      .map(field => getName(field) + getType(field))
      .join(";\n  ")} \n}\n\n`;
  }

  private scalar(def: ScalarTypeDefinitionNode): string {
    return `type ${def.name.value} { };\n\n`;
  }

  private input(def: InputObjectTypeDefinitionNode): string {
    return `interface ${def.name.value} {\n  ${(def.fields || [])
      .map(field => field.name.value + getType(field))
      .join(";\n  ")} \n}\n\n`;
  }
}

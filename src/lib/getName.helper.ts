import { FieldDefinitionNode, InputValueDefinitionNode } from "graphql";
import { getType } from "./getType.helper";

export function getName(field: FieldDefinitionNode /*  & any */): string {
  if (!(field.arguments || []).length) {
    return field.name.value;
  }
  return `${
    field.name.value
  }(${(field.arguments as InputValueDefinitionNode[])
    .map(arg => arg.name.value + getType(arg))
    .join(", ")})`;
}

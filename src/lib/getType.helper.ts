import { FieldDefinitionNode } from "graphql";

export const types: any = {
  ID: "string",
  String: "string",
  Int: "number",
  Float: "number",
  Boolean: "boolean"
};

export function getType(field: FieldDefinitionNode & any): string {
  const { kind, type } = field.type;
  const fieldType: string = type.name.value;
  let res = kind === "NonNullType" ? ": " : "?: ";
  return res + types[fieldType];
}

import { FieldDefinitionNode } from "graphql";

export const types: any = {
  ID: "string",
  String: "string",
  Int: "number",
  Float: "number",
  Boolean: "boolean"
};

export function getType(field: FieldDefinitionNode & any): string {
  try {
    const { kind, type } = field.type;
    const fieldType: string = type.name.value; // if not throw error so it's NonNullType
    return ": " + (types[fieldType] || fieldType);
  } catch (e) {
    return (
      ": " + (types[field.type.name.value] || field.type.name.value) + " | null"
    );
  }
}

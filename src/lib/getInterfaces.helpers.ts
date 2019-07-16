import { NamedTypeNode } from "graphql";

export function getInterfaces(interfaces: NamedTypeNode[]): string {
  if (!interfaces.length) return "";
  return (
    "extends " + interfaces.map(_interface => _interface.name.value).join(", ")
  );
}

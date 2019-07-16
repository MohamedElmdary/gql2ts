export class Gql2ts {
  private constructor(private readonly code: string) {}

  public static compile(code: string): void {
    new Gql2ts(code);
  }

  private enum() {}

  private interface() {}

  private type() {}

  private union() {}

  private parser() {}
}

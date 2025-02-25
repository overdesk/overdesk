export class Messenger {
  private connection: WebSocket | null = null;

  public connect(url: string) {
    const connection = new WebSocket(url);
    this.connection = connection;
  }

  public hasConnection() {
    return this.connection !== null;
  }
}

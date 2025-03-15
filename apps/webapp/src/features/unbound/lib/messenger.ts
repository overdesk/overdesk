// FIXME (@hoontae24) make as entity
export interface Message {
  body: string;
  username: string;
}

export class Messenger {
  private connection: WebSocket | null = null;
  private subscribers: ((message: Message) => void)[] = [];

  public async connect(url: string) {
    const connection = this.createConnection(url);

    connection.addEventListener('close', async (event) => {
      await new Promise((res) => setTimeout(res, 3000));
      this.disconnect();
      this.connect(url);
    });

    connection.addEventListener('message', async (event) => {
      let message: Message | null = null;
      if (event.data instanceof Blob) {
        message = JSON.parse(await event.data.text());
      } else if (typeof event.data === 'string') {
        message = JSON.parse(event.data);
      }

      if (message) {
        this.receive(message);
      }
    });

    this.connection = connection;
  }

  public disconnect() {
    this.connection?.close();
  }

  public hasConnection() {
    return this.connection !== null;
  }

  public send(message: Message) {
    if (!this.connection) {
      throw new Error('No connection');
    }
    this.connection.send(JSON.stringify(message));
  }

  public subscribe(subscriber: (message: Message) => void): () => void {
    this.subscribers.push(subscriber);

    return () => {
      this.unsubscribe(subscriber);
    };
  }

  public unsubscribe(subscriber: (message: Message) => void) {
    this.subscribers = this.subscribers.filter((s) => s !== subscriber);
  }

  private createConnection(url: string) {
    const connection = new WebSocket(url);
    console.log('WebSocket connection established:', url);
    return connection;
  }

  private receive(message: Message) {
    this.subscribers.forEach((subscriber) => subscriber(message));
  }
}

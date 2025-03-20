export class SerializationError extends Error {
  public name = 'SerializationError';

  constructor(
    public message: string,
    public data?: unknown,
  ) {
    super(message);
  }
}

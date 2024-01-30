class ResponseError extends Error {
  constructor(status: any, message: any, ) {
    super(message);
    //@ts-ignore
    this.status = status;
    // this.stack = stack;
  }
}

export { ResponseError };

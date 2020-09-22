export class Exception {
  message: string

  constructor(msg: string) {
    this.message = msg
  }

  toString() {
    return `Error: ${this.message}`
  }
}

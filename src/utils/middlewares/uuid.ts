const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
var short = require('short-uuid')(alphabet)

export function uuid(): string {
  return short.new()
}

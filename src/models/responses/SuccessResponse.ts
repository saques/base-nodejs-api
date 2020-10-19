import { StatusType } from './StatusType'

export class SuccessResponse {
  status: StatusType

  constructor(body?: object) {
    Object.assign(this, body)
    this.status = 'success'
  }
}

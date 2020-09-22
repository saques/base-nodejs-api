import { PingFacade } from '../facades/PingFacade'

const facade = new PingFacade()

/**
 * A Helper is what the Controller uses to
 * execute its logic.
 */
export class PingHelper {
  async getGreeting(id: string) {
    const ans = await facade.get(id)

    return `Hello, ${ans}`
  }
}

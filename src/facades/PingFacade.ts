import { AcmeStorage } from '../storages/AcmeStorage'

const storage = new AcmeStorage()

/**
 * A Facade is used as an intermediary between
 * the Helper and the Storage. It's often used
 * to reduce database query forming complexity
 * from the Helper's perspective
 */
export class PingFacade {
  async get(id: string) {
    return await storage.get(id)
  }
}

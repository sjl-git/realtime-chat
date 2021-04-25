
import { config } from 'dotenv'

class Config {
  private config: any

  public constructor() {
    this.config = config({ path: './.env' }).parsed
    return
  }

  public get(name: string) {
    const value = this.config[name]
    if (!value) {
      return new Error(`${name} is not declared`)
    }
    return value
  }
}

export default new Config()
import f = require('./formatters')
import { SolidityType } from './type'

export class SolidityTypeAddress extends SolidityType {
  constructor() {
    super({
      inputFormatter: f.formatInputInt,
      outputFormatter: f.formatOutputAddress
    })
  }
  isType(name) {
    return !!name.match(/address(\[([0-9]*)\])?/)
  }
}

/**
 * @fileoverview Extends BadiDate class with Luxon accessor properties
 *
 */

import { BadiDate } from 'badidate'

export default class BadiDateAPI extends BadiDate {
  plus (object) {
    let date = this.gregorianDate.plus(object)
    return new BadiDateAPI(date)
  }
  get locale () {
    return this.gregorianDate.locale
  }
}

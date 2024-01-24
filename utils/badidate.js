/**
 * @fileoverview Extends BadiDate class with Luxon accessor properties
 *
 */

import { BadiDate } from 'badidate'

export default class BadiDateAPI extends BadiDate {
  constructor (date) {
    if (date === undefined) {
      date = new Date()
    }
    super(date)
  }
  // TODO: refactor to natively support date addition on BadiDate
  plus (object) {
    let date = this.gregorianDate.plus(object)
    return new BadiDateAPI(date)
  }
  get locale () {
    return this.gregorianDate.locale
  }
  toISODate () {
    return this.gregorianDate.toISODate()
  }
}

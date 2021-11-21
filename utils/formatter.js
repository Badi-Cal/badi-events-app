/**
 * @fileoverview Map formatting tokens to predefined keys
 */

const tokensLuxon = {
  MONTH_YEAR: { month: 'long', year: 'numeric' },
  MONTH_SHORT_DAY: { month: 'short', day: 'numeric' },
  MONTH_SHORT_DAY_YEAR: { month: 'short', day: 'numeric', year: 'numeric' },
  WEEKDAY_SHORT: { weekday: 'short' },
  DAY_NUMBER: { day: 'numeric' },
  DATE_FULL: { dateStyle: 'full' }
}

const tokensBadi = {
  MONTH_YEAR: 'MM+ yy',
  MONTH_SHORT_DAY: 'M d',
  MONTH_SHORT_DAY_YEAR: 'M d, y',
  WEEKDAY_SHORT: 'W',
  DAY_NUMBER: 'd',
  DATE_FULL: 'WW, MM d, y'
}

export { tokensBadi, tokensLuxon }

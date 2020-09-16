/**
 * @fileoverview Custom node.js loader to ignore imported CSS files.
 * @see https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_experimental_loaders
 */

import { URL, pathToFileURL } from 'url';

const extensionsRegex = /\.css$/;
const baseURL = pathToFileURL(`${process.cwd()}/`).href;

/**
 * @param {string} specifier
 * @param {{
 *   conditions: !Array<string>,
 *   parentURL: !(string | undefined),
 * }} context
 * @param {Function} defaultResolve
 * 
 * @returns {Promise<{ url: string }>}
 */
export function resolve(specifier, context, defaultResolve) {
  const { parentURL = baseURL } = context;

  // return a URL for specifiers ending in the CSS extension
  if (extensionsRegex.test(specifier)) {
    return {
      url: new URL(specifier, parentURL).href
    };
  }

  // Let Node.js handle all other specifiers.
  return defaultResolve(specifier, context, defaultResolve);
}

/**
 * @param {string} url
 * @param {Object} context (currently empty)
 * @param {Function} defaultGetFormat
 * 
 * @returns {Promise<{ format: string }>}
 */
export function getFormat(url, context, defaultGetFormat) {
  // For the purposes of this loader, all CSS URLs are ES modules.
  if (extensionsRegex.test(url)) {
    return {
      format: 'module'
    };
  }

  // Let Node.js handle all other URLs.
  return defaultGetFormat(url, context, defaultGetFormat);
}

/**
 * @param {string} url
 * @param {{ format: string }} context
 * @param {Function} defaultGetSource
 * 
 * @returns {Promise<{ source: !(string | SharedArrayBuffer | Uint8Array) }>}
 */
export function getSource(url, context, defaultGetSource) {
  if ( extensionsRegex.test(url) ) {
    // Return noop for CSS URLs
    return {
      source: `export default function () {return;}`,
    };
  }
  // Defer to Node.js for all other URLs.
  return defaultGetSource(url, context, defaultGetSource);
}

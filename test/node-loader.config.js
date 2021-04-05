import * as importMapLoader from "@node-loader/import-maps";
import * as cssLoader from '../lib/css-loader.mjs';

export default {
  loaders: [cssLoader, importMapLoader]
};
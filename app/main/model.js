/**
 * @fileoverview Instantiates and configures Backbone Model
 * @see https://backbonejs.org/#Model
 */

import Backbone from 'backbone';
import 'backbone.localstorage/build/backbone.localStorage';

const {Model, Collection} = Backbone;

var Event = Model.extend({
  // TODO: configure REST requests
});

export default Collection.extend({
  model: Event,
  localStorage: new Backbone.LocalStorage("events-backbone")
});

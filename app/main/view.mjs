/* eslint-disable no-unused-vars */
/**
 * @fileoverview Custom View to handle adding and editing events. 
 * @see https://backbonejs.org/#View
 */

import Backbone from 'backbone';

const { View } = Backbone;

export var AppView = View.extend({

  /**
   * Init calendar and add events
   *  
   * @param {Object} options 
   */
  initialize: function(options) {
    this.listenTo(this.collection, 'reset', this.addAll);

    this.calendar = options.calendar;

    this.addAll();
  },

  /**
   * Renders calendar
   * 
   * @returns Instance of calendar
   */
  render: function() {
    this.calendar.render();
    return this;
  },

  /**
   * Add all events to the calendar at once
   */
  addAll: function() {
    this.calendar.addEventSource( this.collection.toJSON() );
  },
});

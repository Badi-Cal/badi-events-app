import $ from 'jquery';
import _ from 'underscore';
import Calendar from './cal';
import {View} from 'backbone';

/**
 * Custom View to handle adding and editing events. 
 * 
 * Then pass to Fullcalendar to render.
 * 
 * @see https://backbonejs.org/#View
 */
export var AppView = View.extend({
  initialize: function(options) {
    this.listenTo(this.collection, 'reset', this.addAll);

    this.calendar = Calendar(this.el);

    this.addAll();
  },

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

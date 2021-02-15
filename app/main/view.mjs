/**
 * @fileoverview Custom View to handle adding and editing events. 
 * @see https://backbonejs.org/#View
 */

import $ from 'jquery';
import Backbone from 'backbone';
import 'bootstrap/js/src/popover';

import _template from '../../lib/template';

const { View } = Backbone;

export var AppView = View.extend({

  // intended to be loosely translateable to mustache easily
  quicktmpl: _template( $('#tmpl').get(0).innerHTML ),

  events: {
    'click .js-cal-prev': 'calPrev',
    'click .js-cal-next': 'calNext',
    'click .calendar-event': 'calEvent',
    'click .js-cal-option': 'calOption'
  },

  /**
   * Init calendar and add events
   *  
   * @param {Object} options 
   */
  initialize: function(options) {
    this.options = options || {};
  },
  
  /**
   * Renders calendar
   * 
   * @returns Instance of calendar
   */
  render: function() {
    this.$el.html( this.quicktmpl( this.options ));
      // potential optimization (untested), this object could be keyed into a dictionary 
      // on the dateclass string; the object would need to be reset and the first entry 
      // would have to be made here
      $('.' + (new Date()).toDateCssClass()).addClass('today');
      if ( this.options.data && this.options.data.length) {
        if ( this.options.mode === 'year') {
          this.yearAddEvents( this.options.data, this.options.date.getFullYear());
        } else if ( this.options.mode === 'month' || this.options.mode === 'week') {
          this.options.data.forEach( ( event, index ) => this.monthAddEvent( index, event ));
        } else {
          this.options.data.forEach( ( event, index ) => this.dayAddEvent( index, event ))
        }
      }
    return this;
  },

  /**
   * Renders day view.
   * 
   * @param {integer} index 
   * @param {Object} event 
   * 
   * @returns {Backbone.View} Instance of View
   */
  dayAddEvent: function(index, event) {
    if (event.allDay) {
      this.monthAddEvent(index, event);
      return this;
    }
    var $event = $('<div/>', {'class': 'calendar-event', text: event.title, title: event.title, 'data-index': index}),
        start = event.start,
        end = event.end || start,
        time = event.start.toTimeString(),
        hour = start.getHours(),
        timeclass = '.time-22-0',
        startint = start.toDateInt(),
        dateint = this.options.date.toDateInt(),
        endint = end.toDateInt();
    if (startint > dateint || endint < dateint) { return this; }
    
    if (time) {
      $event.html('<strong>' + time + '</strong> ' + $event.html());
    }
    $event.toggleClass('begin', startint === dateint);
    $event.toggleClass('end', endint === dateint);
    if (hour < 6) {
      timeclass = '.time-0-0';
    }
    if (hour < 22) {
      timeclass = '.time-' + hour + '-' + (start.getMinutes() < 30 ? '0' : '30');
    }
    $(timeclass).append($event);
    return this;
  },

  /**
   * Renders month and week view.
   * 
   * @param {integer} index 
   * @param {Object} event 
   * 
   * @returns {Backbone.View} Instance of View
   */
  monthAddEvent: function(index, event) {
    var $event = $('<div/>', {'class': 'calendar-event', text: event.title, title: event.title, 'data-index': index}),
        e = new Date(event.start),
        dateclass = e.toDateCssClass(),
        day = $('.' + e.toDateCssClass()),
        empty = $('<div/>', {'class':'clear calendar-event', html:'&nbsp;'}), 
        numbevents = 0, 
        time = event.start.toTimeString(),
        endday = event.end && $('.' + event.end.toDateCssClass()).length > 0,
        checkanyway = new Date(e.getFullYear(), e.getMonth(), e.getDate()+40),
        existing,
        i;
    $event.toggleClass('all-day', !!event.allDay);
    if (time) {
      $event.html('<strong>' + time + '</strong> ' + $event.html());
    }
    if (!event.end) {
      $event.addClass('begin end');
      $('.' + event.start.toDateCssClass()).append($event);
      return this;
    }
          
    while (e <= event.end && (day.length || endday || this.options.date < checkanyway)) {
      if(day.length) { 
        existing = day.find('.calendar-event').length;
        numbevents = Math.max(numbevents, existing);
        for(i = 0; i < numbevents - existing; i++) {
          day.append(empty.clone());
        }
        day.append(
          $event.
          toggleClass('begin', dateclass === event.start.toDateCssClass()).
          toggleClass('end', dateclass === event.end.toDateCssClass())
        );
        $event = $event.clone();
        $event.html('&nbsp;');
      }
      e.setDate(e.getDate() + 1);
      dateclass = e.toDateCssClass();
      day = $('.' + dateclass);
    }
    return this;
  },

  /**
   * Renders year view
   * 
   * @param {Array<Object>} events Array of event objects
   * @param {string} year Year of events to render
   * 
   * @returns {Backbone.View} Instance of View
   */
  yearAddEvents: function(events, year) {
    var counts = [0,0,0,0,0,0,0,0,0,0,0,0];
    $.each(events, function (i, v) {
      if (v.start.getFullYear() === year) {
          counts[v.start.getMonth()]++;
      }
    });
    $.each(counts, function (i, v) {
      if (v!==0) {
          $('.month-'+i).append('<span class="badge badge-pill badge-secondary">'+v+'</span>');
      }
    });
    return this;
  },

  /**
   * Callback that handles subtracting dates and rendering view.
   * 
   */
  calPrev: function() {
    switch(this.options.mode) {
    case 'year': this.options.date.setFullYear(this.options.date.getFullYear() - 1); break;
    case 'month': this.options.date.setMonth(this.options.date.getMonth() - 1); break;
    case 'week': this.options.date.setDate(this.options.date.getDate() - 7); break;
    case 'day':  this.options.date.setDate(this.options.date.getDate() - 1); break;
    }
    this.render();
  },

  /**
   * Callback that handels adding dates and rendering views.
   * 
   */
  calNext: function() {
      switch(this.options.mode) {
      case 'year': this.options.date.setFullYear(this.options.date.getFullYear() + 1); break;
      case 'month': this.options.date.setMonth(this.options.date.getMonth() + 1); break;
      case 'week': this.options.date.setDate(this.options.date.getDate() + 7); break;
      case 'day':  this.options.date.setDate(this.options.date.getDate() + 1); break;
      }
      this.render();
  },

  /**
   * Callback that handles rendering calendar views.
   * 
   * @param {Event} event 
   * @return {boolean} true|false
   */
  calOption: function( event ) {
      var $t = $(event.target), o = $t.data();
      if (o.date) { o.date = new Date(o.date); }
      $.extend(this.options, o);
      this.render();
  },

  /**
   * Callback that handles displaying calendar event popover.
   * 
   * @param {Event} event 
   * @return {boolean} true|false
   */
  calEvent: function( event ) {
    let $t = $(event.target), 
        index = +($t.attr('data-index')), 
        haspop = $t.data('popover'),
        data, time;
    
    // get data for the object and add popover
    if (haspop || isNaN(index)) { return true; }
    data = this.options.data[index];
    time = data.start.toTimeString();
    if (time && data.end) { time = time + ' - ' + data.end.toTimeString(); }
    $t.data('popover',true);
    $t.popover({content: '<p><strong>' + time + '</strong></p>'+data.text, html: true, placement: 'auto'}).popover('toggle');
    return false;
  },
});

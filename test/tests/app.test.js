import 'chai/register-expect.js';

import {AppView} from '../../app/main/view';
import Events from '../../app/main/model';

import events from '../fixtures/events.fixture.js';

describe('App View', function() {

  before('hooks', function () {
    this.fixtures = new Object();
    var fixtures = this.fixtures;

    fixtures.element = document.getElementById('app');
    fixtures.events = events;
  });

  // describe('Add all events', function() {

  //   beforeEach('hooks', function() {
  //     var fixtures = this.fixtures;

  //     var eventCollection = new Events(fixtures.events);
  //     var data = fixtures.events.map(function(event) {

  //     });
  //     // var cal = new Calendar(fixtures.element);
  //     var app = new AppView({
  //       el: fixtures.element,
  //       collection: eventCollection,
  //       //calendar: cal
  //       days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  //       months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  //       shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //       date: new Date(),
  //       daycss: ["c-sunday", "", "", "", "", "", "c-saturday"],
  //       todayname: "Today",
  //       thismonthcss: "current",
  //       lastmonthcss: "outside",
  //       nextmonthcss: "outside",
  //       mode: "month",
  //       data: data,
  //     });

  //     var eventObjects = cal.getEvents();
  //     fixtures.eventObjects = eventObjects.map((event) => {
  //       return event.toPlainObject();
  //     });
  //     fixtures.eventsJSON = eventCollection.toJSON();
  //   });

  //   it('should pass an array containing all events to the calendar', function() {
  //     var fixtures = this.fixtures;
  //     expect(fixtures.eventObjects).to.have.lengthOf(fixtures.eventsJSON.length);
  //   });
  // });
});

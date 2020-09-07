import { AppView } from './main/view';
import Events from './main/model';
import Calendar from './main/cal';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/styles.css'; // our app's CSS

// Create our collection of events
var events = new Events([
  {
    title: 'All Day Event',
    start: '2018-01-01',
  },
  {
    title: 'Long Event',
    start: '2018-01-07',
    end: '2018-01-10'
  },
  {
    groupId: 999,
    title: 'Repeating Event',
    start: '2018-01-09T16:00:00'
  },
  {
    groupId: 999,
    title: 'Repeating Event',
    start: '2018-01-16T16:00:00'
  },
  {
    title: 'Conference',
    start: '2018-01-11',
    end: '2018-01-13'
  },
  {
    title: 'Meeting',
    start: '2018-01-12T10:30:00',
    end: '2018-01-12T12:30:00'
  },
  {
    title: 'Lunch',
    start: '2018-01-12T12:00:00'
  },
  {
    title: 'Meeting',
    start: '2018-01-12T14:30:00'
  },
  {
    title: 'Happy Hour',
    start: '2018-01-12T17:30:00'
  },
  {
    title: 'Dinner',
    start: '2018-01-12T20:00:00'
  },
  {
    title: 'Birthday Party',
    start: '2018-01-13T07:00:00'
  },
  {
    title: 'Click for Google',
    url: 'http://google.com/',
    start: '2018-01-28'
  }
]);

var element = document.getElementById('app');
var fullCal = new Calendar(element);

// let backbone handle adding events
new AppView({
  el: element,
  collection: events,
  calendar: fullCal
}).render();

import jQuery from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/styles.css'; // our app's CSS

import { AppView } from './main/view';
import Events from './main/model';

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

var jQuerycurrentPopover = null;
jQuery(document).on('shown.bs.popover', function (ev) {
  var jQuerytarget = jQuery(ev.target);
  if (jQuerycurrentPopover && (jQuerycurrentPopover.get(0) != jQuerytarget.get(0))) {
    jQuerycurrentPopover.popover('toggle');
  }
  jQuerycurrentPopover = jQuerytarget;
}).on('hidden.bs.popover', function (ev) {
  var jQuerytarget = jQuery(ev.target);
  if (jQuerycurrentPopover && (jQuerycurrentPopover.get(0) == jQuerytarget.get(0))) {
    jQuerycurrentPopover = null;
  }
});

jQuery.extend(Date.prototype, {
  //provides a string that is _year_month_day, intended to be widely usable as a css class
  toDateCssClass:  function () { 
    return '_' + this.getFullYear() + '_' + (this.getMonth() + 1) + '_' + this.getDate(); 
  },
  //this generates a number useful for comparing two dates; 
  toDateInt: function () { 
    return ((this.getFullYear()*12) + this.getMonth())*32 + this.getDate(); 
  },
  toTimeString: function() {
    var hours = this.getHours(),
        minutes = this.getMinutes(),
        hour = (hours > 12) ? (hours - 12) : hours,
        ampm = (hours >= 12) ? ' pm' : ' am';
    if (hours === 0 && minutes===0) { return ''; }
    if (minutes > 0) {
      return hour + ':' + minutes + ampm;
    }
    return hour + ampm;
  }
});

var element = document.getElementById('app');

var data = [],
    date = new Date(),
    d = date.getDate(),
    d1 = d,
    m = date.getMonth(),
    y = date.getFullYear(),
    i,
    end, 
    j, 
    c = 1063, 
    c1 = 3329,
    h, 
    names = ['All Day Event', 'Long Event', 'Birthday Party', 'Repeating Event', 'Training', 'Meeting', 'Mr. Behnke', 'Date', 'Ms. Tubbs'],
    slipsum = ["Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.", "You see? It's curious. Ted did figure it out - time travel. And when we get back, we gonna tell everyone. How it's possible, how it's done, what the dangers are. But then why fifty years in the future when the spacecraft encounters a black hole does the computer call it an 'unknown entry event'? Why don't they know? If they don't know, that means we never told anyone. And if we never told anyone it means we never made it back. Hence we die down here. Just as a matter of deductive logic.", "Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.", "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.", "Yeah, I like animals better than people sometimes... Especially dogs. Dogs are the best. Every time you come home, they act like they haven't seen you in a year. And the good thing about dogs... is they got different dogs for different people. Like pit bulls. The dog of dogs. Pit bull can be the right man's best friend... or the wrong man's worst enemy. You going to give me a dog for a pet, give me a pit bull. Give me... Raoul. Right, Omar? Give me Raoul.", "Like you, I used to think the world was this great place where everybody lived by the same standards I did, then some kid with a nail showed me I was living in his world, a world where chaos rules not order, a world where righteousness is not rewarded. That's Cesar's world, and if you're not willing to play by his rules, then you're gonna have to pay the price.", "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man.", "You see? It's curious. Ted did figure it out - time travel. And when we get back, we gonna tell everyone. How it's possible, how it's done, what the dangers are. But then why fifty years in the future when the spacecraft encounters a black hole does the computer call it an 'unknown entry event'? Why don't they know? If they don't know, that means we never told anyone. And if we never told anyone it means we never made it back. Hence we die down here. Just as a matter of deductive logic.", "Like you, I used to think the world was this great place where everybody lived by the same standards I did, then some kid with a nail showed me I was living in his world, a world where chaos rules not order, a world where righteousness is not rewarded. That's Cesar's world, and if you're not willing to play by his rules, then you're gonna have to pay the price.", "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man."];

for(i = 0; i < 500; i++) {
  j = Math.max(i % 15 - 10, 0);
  //c and c1 jump around to provide an illusion of random data
  c = (c * 1063) % 1061; 
  c1 = (c1 * 3329) % 3331;
  d = (d1 + c + c1) % 839 - 440;
  h = i % 36;
  m = (i % 4) * 15;
  if (h < 18) { h = 0; m = 0; } else { h = Math.max(h - 24, 0) + 8; }
  end = !j ? null : new Date(y, m, d + j, h + 2, m);
  data.push({ title: names[c1 % names.length], start: new Date(y, m, d, h, m), end: end, allDay: !(i % 6), text: slipsum[c % slipsum.length ]  });
}

data.sort(function(a,b) { return (+a.start) - (+b.start); });
  
new AppView({
  el: element,
  collection: events,
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  date: new Date(),
  daycss: ["c-sunday", "", "", "", "", "", "c-saturday"],
  todayname: "Today",
  thismonthcss: "current",
  lastmonthcss: "outside",
  nextmonthcss: "outside",
  mode: "month",
  data: data,
}).render();

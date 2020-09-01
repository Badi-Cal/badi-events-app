import { AppView } from './main/view';
import events from './main/model';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/styles.css'; // our app's CSS

// let backbone handle adding events
new AppView({
  el: document.getElementById('app'),
  collection: events
}).render();

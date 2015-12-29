import { djangoCSRFInit } from 'DjangoUtils.js';
import 'uikit';
import 'uikit.almost-flat.css';
import ReactDOM from 'react-dom';
import Home from 'Home.jsx';

djangoCSRFInit();

ReactDOM.render(
  <Home />,
  document.getElementsByTagName('main')[0]
);

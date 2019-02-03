import '@babel/polyfill';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDom from 'react-dom';
import AppComp from './appComponent';

import './reset.scss';
import './styles.scss';

const Wrapper = (
    <Router >
      <AppComp />
    </Router>
);

ReactDom.render(Wrapper, document.getElementById('app'));

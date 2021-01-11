import React from 'react';
import { IntlProvider } from 'react-intl';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import Overview from './OverviewPage/Overview';

function App() {
  return (
    <IntlProvider locale={navigator.language}>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/overview/:name' component={Overview} />
      </Switch>
    </IntlProvider>
  );
}

export default App;
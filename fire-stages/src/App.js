import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';



import Emergency from './containers/Stage1/Stage1';
import Dispatch from './containers/Stage2/Stage2';
import FireHome from './containers/Stage3/Stage3';
import PostAccident from './containers/Stage4/Stage4';
import FiremenInfo from './containers/Stage3/FiremenInfo';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route path="/emergency" exact component={Emergency} />
        <Route path="/myResponders" exact component={Dispatch} />
        <Route path="/mission" exact component={FireHome} />
        <Route path="/mission/command" exact component={FiremenInfo} />
        <Route path="/post" exact component={PostAccident} />
        <Redirect from="/" to="/emergency" />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

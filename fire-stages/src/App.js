import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';



import Emergency from './containers/Stage1/Stage1';
import Notify from './containers/Stage2/Stage2';
import Dispatch from './containers/Stage3/Stage3';
import FireHome from './containers/Stage4/Stage4';
import PostAccident from './containers/Stage5/Stage5';
import FiremenInfo from './containers/Stage4/FiremenInfo';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        {/* <PrivateRoute path="/vendorForm" component={Post} /> */}
        <Route path="/emergency" exact component={Emergency} />
        <Route path="/notify" exact component={Notify} />
        <Route path="/dispatch" exact component={Dispatch} />
        <Route path="/mission" exact component={FireHome} />
        <Route path="/mission/command" exact component={FiremenInfo} />
        <Route path="/post" exact component={PostAccident} />
        {/* <Route path="/mission/:id" exact component={FiremenIoT} /> */}
        <Redirect from="/" to="/emergency" />
        {/* <Route path="/adventures" exact component={Adventures} />
        <Route path="/login" exact component={LogIn} /> */}
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

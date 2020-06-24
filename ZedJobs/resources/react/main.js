import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom';

//Components
import Nav from './components/Nav';
import App from './App';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import Organizations from './pages/Organizations';
import Files from './pages/Files';
import Explore from './pages/Explore';
import NoMatch from './pages/NoMatch';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import SignUp from './pages/SignUp';



ReactDOM.render(
    //Switch renders the first route that matches the request
    <HashRouter>
        <div>
            <Nav/>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/home" component={App}/>
                <Route path="/jobs" component={Jobs}/>
                <Route path="/notifications" component={Notifications}/>
                <Route path="/Profile" component={Profile}/>
                <Route path="/messages" component={Messages}/>
                <Route path="/organizations" component={Organizations}/>
                <Route path="/files" component={Files}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/signout" component={SignOut}/>
                <Route path="/signup" component={SignUp}/>


                {/* No match 4.0.4 */}
                <Route component={NoMatch}/>
            </Switch>
        </div>
    </HashRouter>, 
document.getElementById('app'));



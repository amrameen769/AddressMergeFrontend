import React from 'react'
import {Route, HashRouter, Switch} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Home from "./Home";
import NavBar from "./NavBar";
import GetStarted from "./GetStarted";
import BackToTop from "./BackToTop";
import Editor from "../components/editor/Editor";
import Register from "../components/client/Register";
import Login from "../components/client/Login";
import DashboardMerger from "../components/client/DashboardMerger";
import AddressBook from "./AddressBook";
import ResetPassword from "../components/client/ResetPassword";
import ProfileSettings from "../components/client/ProfileSettings";

export default props => (
    <HashRouter>
        <ScrollToTop>
            <NavBar/>
            <Switch>
                <Route exact path ={"/"} component={Home}/>
                <Route exact path ={"/get-started"} component={GetStarted}/>
                <Route exact path ={"/editor"} component={Editor} />
                <Route exact path={"/register"} component={Register}/>
                <Route exact path={"/login"} component={Login}/>
                <Route exact path={"/dashboard"} component={DashboardMerger}/>
                <Route exact path={"/address-book"} component={AddressBook}/>
                <Route exact path={"/reset-password"} component={ResetPassword}/>
                <Route exact path={"/profile-settings"} component={ProfileSettings}/>
            </Switch>
            <BackToTop {...props}/>
        </ScrollToTop>
    </HashRouter>
)
import React from "react";
import { Switch, Route } from "react-router";
import Navbar from "../Navbar/Navbar";
import SidebarSettings from "../Sidebar/Sidebar";
import ChangePassword from "./Pages/ChangePassword";
import Myprofile from "./Pages/Myprofile";
import ChangeProfile from "./Pages/ChangeProfile";

function SettingsRouter({ match }: { match: any }) {
    return (
        <>
            <Navbar />
            <div className="settings-grid">
                <div className="settings-sidebar">
                    <SidebarSettings />
                </div>
                <Switch>
                    <Route exact path={match.path + '/myprofile'} component={Myprofile} />
                    <Route exact path={match.path + '/changepassword'} component={ChangePassword} />
                    <Route exact path={match.path + '/changeprofile'} component={ChangeProfile} />
                </Switch>
            </div>
        </>
    )
}


export default SettingsRouter;
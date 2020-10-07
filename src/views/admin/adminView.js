import React, {Component} from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import AdminUsers from './adminUsers';
import AdminComments from './adminComments';
import AdminLogin from './adminLogin';
import AdminProfile from './adminProfile';
import Footer from '../../components/footer';
import withToastNotificationHOC from '../../HOCs/notificationHOC';

class AdminView extends Component {

    render() {
        return (
            <>
                <Switch>
                    <Route exact path={`${this.props.match.path}`}>
                        <AdminLogin />
                    </Route>
                    <Route path={`${this.props.match.path}/users`}>
                        <AdminUsers />
                    </Route>
                    <Route path={`${this.props.match.path}/messages`}>
                        <AdminComments />
                    </Route>
                    <Route path={`${this.props.match.path}/profile`}>
                        <AdminProfile />
                    </Route>
                </Switch>
            <Footer/>
            </>
        );
    }
}

export default withRouter(withToastNotificationHOC(AdminView));
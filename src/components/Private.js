import {Route,redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = !!localStorage.getItem('access_token');

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    redirect('/login')
                )
            }
        />
    );
}

export default PrivateRoute;
import React from 'react';
import { withRouter } from 'react-router';

export default function requireAuth(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if ( ! this.props.session) {
        const location = this.props.location;
        const redirect = location.pathname + location.search;

        this.props.router.push(`/login?redirect=${redirect}`);
      }
    }

    render() {
      return this.props.session
        ? <Component { ...this.props } />
        : null;
    }

  }

  return withRouter(AuthenticatedComponent);
}
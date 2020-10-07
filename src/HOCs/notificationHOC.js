import React from 'react';
import { useToasts } from 'react-toast-notifications';

const withToastNotificationHOC = (Component) => {
    return function WrappedComponent(props) {
        const { addToast } = useToasts();
      return <Component {...props}  addToast={addToast} />;
    }
  }

export default withToastNotificationHOC;
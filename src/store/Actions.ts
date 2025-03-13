import { createAction } from '@reduxjs/toolkit';

// Define an action to show a notification
export const showNotification = createAction('notification/show', message => {
  return {
    payload: {
      message
    }
  };
});

// Define an action to hide the notification
export const hideNotification = createAction('notification/hide');


export const resetAll = createAction('RESET_ALL')

// Usage in a component or Redux logic
// dispatch(showNotification('Welcome to the app!'));
// dispatch(hideNotification());
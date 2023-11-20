import './global.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import { translator } from './utils/translator';
import { Preview } from './components/Preview';
import { initFirebase } from './utils/firebase';

(async () => {
  await translator();
  await initFirebase();

  ReactDOM.render(<Preview />, document.getElementById('main-container'));
})();

// authUI.start('#main-container', {
//   popupMode: true,
//   signInFlow: 'popup',
//   signInSuccessUrl: '',
//   siteName: 'Test',
//   //
//   signInOptions: [
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       signInMethod: firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
//       // requireDisplayName: false,
//       disableSignUp: { status: true, adminEmail: 'saifurrehmanx@mail.com' },
//     },
//   ],
//   //
//   callbacks: {
//     signInSuccessWithAuthResult: function (authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       console.log('success');
//       return false;
//     },
//     uiShown: function () {
//       // The widget is rendered.
//       // Hide the loader.
//       // document.getElementById('loader').style.display = 'none';
//     },
//   },
// });

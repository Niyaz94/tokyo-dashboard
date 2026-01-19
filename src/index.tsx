// import ReactDOM from 'react-dom'; 
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import React from "react";

import 'nprogress/nprogress.css';
import 'src/index.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import {store,persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <SidebarProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SidebarProvider>
          </HelmetProvider>
        </PersistGate>
      </Provider>
  </React.StrictMode>
  
);

serviceWorker.unregister();

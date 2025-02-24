import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import {store} from "./app/store.ts";
import {Provider} from "react-redux";
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer autoClose={1000}/>
      <CssBaseline/>
      <App />
    </BrowserRouter>
  </Provider>

)


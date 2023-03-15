import './App.css';
import { BrowserRouter as Router, Route, RouterProvider, Switch } from 'react-router-dom';

import { routes } from './Routes/Routes.js';


function App() {
  return (
    <div>
      <RouterProvider router={routes} >
      </RouterProvider>
    </div>
  );
}

export default App;

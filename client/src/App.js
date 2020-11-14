import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Chat from "./components/Chat/Chat";

function App() {
  return (
          <Router>
              <Route path="/" exact component={Chat} />
          </Router>
  );
}

export default App;

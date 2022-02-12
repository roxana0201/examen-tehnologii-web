
import './App.css';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import Book from "./components/Book";
import VirtualShelf from "./components/VirtualShelf";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/book/:id">
              <Book />
          </Route>
          <Route path="/">
              <VirtualShelf/>
          </Route>

        </Switch>
      </Router>
  );
}

export default App;

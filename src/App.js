import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BookPage from "./pages/BookPage/BookPage";
import BookDetailsPage from "./pages/BookDetailsPage/BookDetailsPage";

import "./App.css";
import imgBooks from "../src/assets/books (1).png";
import imgHouse from "../src/assets/house.png";

class App extends Component {
  render() {
    const HouseImg = imgHouse;
    const booksImg = imgBooks;
    return (
      <div className="app">
        <Router>
          <div>
            <header className="app-header">
              <NavLink exact activeClassName="selected" to="/">
                <img
                  width="40"
                  src={HouseImg}
                  alt="Home Page"
                  title="Home Page"
                />
              </NavLink>
              <NavLink activeClassName="selected" to="/books">
                <img
                  width="40"
                  src={booksImg}
                  alt="Book List"
                  title="Book List"
                />
              </NavLink>
            </header>

            <div className="app-content">
              <Switch>
                <Route path="/books/:id" component={BookDetailsPage} />
                <Route path="/books" component={BookPage} />
                <Route path="/" component={HomePage} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

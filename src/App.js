import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import AppProvider from "./context";
import { HashRouter, Route, Switch } from "react-router-dom";
import Content from "./Content";
import Genres from "./Genres";
import Favorite from "./Favorite";

function App() {
  return (
    <HashRouter basename="/">
      <AppProvider>
        <Header />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/favorite" component={Favorite}></Route>
          <Route path="/genres/movie" component={Genres}></Route>
          <Route path="/genres/tv" component={Genres}></Route>
          <Route path="/:type/:id" component={Content}></Route>
        </Switch>
        <Footer />
      </AppProvider>
    </HashRouter>
  );
}

export default App;

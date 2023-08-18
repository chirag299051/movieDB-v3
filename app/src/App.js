import "./App.css";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Home from "./HomePage/Home";
import { HashRouter, Route, Switch } from "react-router-dom";
import Content from "./ContentPage/Content";
import Genres from "./GenrePage/Genres";
import Profile from "./ProfilePage/Profile";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Subscribe from "./shared/Subscribe";

function App() {
  return (
    <HashRouter basename="/">
      <Header />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/profile/:id" component={Profile}></Route>
        <Route path="/genres/:type" component={Genres}></Route>
        <Route path="/:type/:id" component={Content}></Route>
        <Route path="/subscribe" component={Subscribe}></Route>
      </Switch>
      <Footer />
      {/* <ToastContainer /> */}
    </HashRouter>
  );
}

export default App;

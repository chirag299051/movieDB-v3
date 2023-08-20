import "./App.css";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Home from "./HomePage/Home";
import { HashRouter, Route, Switch } from "react-router-dom";
import Content from "./ContentPage/Content";
import Genres from "./GenrePage/Genres";
import Profile from "./ProfilePage/Profile";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./store/actions/appActions";
import { useEffect } from "react";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);

  useEffect(() => {
    dispatch(setTheme("dark"));
  }, [theme]);

  return (
    <HashRouter basename="/">
      <Header />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/profile/:id" component={Profile}></Route>
        <Route path="/genres/:type" component={Genres}></Route>
        <Route path="/:type/:id" component={Content}></Route>
      </Switch>
      <Footer />
    </HashRouter>
  );
}

export default App;

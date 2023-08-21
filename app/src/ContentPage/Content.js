import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import List from "../shared/List";
import ReactPlayer from "react-player/youtube";
import Review from "./Review";
import Badge from "react-bootstrap/Badge";
import { HiArrowNarrowDown } from "react-icons/hi";
import { BsStarFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Accordion from "react-bootstrap/Accordion";
import { useFetch } from "../shared/useFetch";
import { addToWatchlist } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const KEY = "092e8cb2fdfe2fa5f210c9f2a932d024";
const contentURL = "https://api.themoviedb.org/3/";
const omdbURL = `https://www.omdbapi.com/?apikey=b9e96893&t=`;
const STREAM_URL = `https://api.themoviedb.org/3/`;

const GRADIENT = `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,.35) 50%, rgba(0,0,0,1) 100%)`;

const Content = () => {
  const ref = useRef(null);
  const [content, setContent] = useState({});
  const [reviews, setReviews] = useState([]);
  const [stream, setStream] = useState([]);
  const [omdb, setOmdb] = useState({});
  const [ytKeys, setYtKeys] = useState();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const { type, id } = useParams();

  const backdropURL =
    content &&
    `url(https://image.tmdb.org/t/p/original${content.backdrop_path})`;

  const { data: similar } = useFetch(
    content &&
      `${contentURL}/${type}/${id}/recommendations?api_key=${KEY}&language=en-US&page=1`
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          `${contentURL}/${type}/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`
        );
        const result1 = await res1.json();
        setContent(result1);
        const res2 = await fetch(omdbURL + (content.name || content.title));
        const result2 = await res2.json();
        setOmdb(result2);
        const res3 = await fetch(
          `${contentURL}/${type}/${id}/reviews?api_key=${KEY}&language=en-US&page=1`
        );
        const result3 = await res3.json();
        content && setReviews(result3.results);
        const res4 = await fetch(
          `${STREAM_URL}${type}/${id}/watch/providers?api_key=${KEY}`
        );
        const result4 = await res4.json();
        setStream(result4.results.IN.flatrate);
      } catch (e) {
        console.log("Err", e);
      }
    };
    fetchData();
  }, [content.name, content.title, type, id]);

  useEffect(() => {
    const keys =
      content.videos &&
      content.videos.results
        .filter((x) => x.type === "Trailer")
        .reverse()
        .map((x) => "https://www.youtube.com/watch?v=" + x.key);
    setYtKeys(keys);
  }, [content, type, id]);

  useEffect(() => {
    next();
  }, [id]);

  const next = () => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const addToList = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    user && dispatch(addToWatchlist(user.id, item));
  };

  return (
    <section className="">
      <div className="player-wrapper">
        <ReactPlayer
          width="100%"
          height="100vh"
          key={ytKeys}
          url={ytKeys}
          className="react-player"
          controls
          playing
          loop
          muted
          origin="http://localhost:3000/"
        />
      </div>
      <div className="arrow-wrapper" onClick={next}>
        <HiArrowNarrowDown className="arrow" size="50" />
      </div>
      <div className="div"></div>
      {content && omdb && (
        <div ref={ref} className="content">
          <h1 className="content-title">{content.name || content.title}</h1>
          <div
            className="backdrop"
            style={{ backgroundImage: `${GRADIENT},${backdropURL}` }}
          >
            <div className="stream-wrapper">
              {stream &&
                stream.map((x) => (
                  <img
                    class="stream-logo"
                    key={x.display_priority}
                    src={`https://image.tmdb.org/t/p/original/${x.logo_path}`}
                    alt=""
                  />
                ))}
            </div>
            <p className="awards">{omdb && omdb.Awards}</p>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <h4>{content.release_date && content.release_date.substr(0, 4)}</h4>
            <h4>
              {content.first_air_date && content.first_air_date.substr(0, 4)}
              &nbsp; |
            </h4>
            <h4>&nbsp; {omdb && omdb.Runtime}</h4>&nbsp;
            <FaHeart
              className={"heart"}
              onClick={(e) => addToList(e, content)}
              size={30}
            />
            <div className="vote">
              {omdb.imdbRating}{" "}
              <BsStarFill
                color="goldenrod"
                size="25"
                style={{ margin: "5px" }}
              />
            </div>
            <div className="genre">
              {omdb &&
                omdb.Genre &&
                omdb.Genre.split(", ").map((x, index) => (
                  <Badge
                    style={{ margin: "10px 5px", color: "#707d8a" }}
                    key={index}
                    bg="dark"
                  >
                    {x}
                  </Badge>
                ))}
            </div>
            <div className="actors">
              {omdb.Actors &&
                omdb.Actors.split(", ").map((x, index) => (
                  <p key={index}>
                    <i>{x}</i>
                  </p>
                ))}
              <p>
                <i>- {omdb && (omdb.Director || omdb.Writer)} </i>
              </p>
            </div>
            <div className="overview">
              <div>{content.overview}</div>
            </div>
          </div>
        </div>
      )}
      <Accordion className="reviews">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h1>Reviews</h1>
          </Accordion.Header>
          <Accordion.Body>
            {reviews.length > 0 &&
              Array.isArray(reviews) &&
              reviews.map((x, index) => <Review key={index} data={x} />)}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <List list={similar} head="More like this" type={type} />
    </section>
  );
};

export default Content;

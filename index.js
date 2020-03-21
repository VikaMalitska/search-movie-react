import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const movie = {
  title: "My movie",
  vote_average: 10,
  src: "https://image.tmdb.org/t/p/w500//db32LaOibwEliAmSL2jjDF6oDdj.jpg",
  owerview: "this is owerview"
};
function Image(props) {
  return <img width="100%" src={props.src} alt={props.alt} />;
}

class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      like: false,
      time: new Date()
    };
  }

  tick() {
    this.setState({ time: new Date() });
  }

  handlerLike = () => {
    this.setState({ like: !this.state.like });
  };

  handlerShowOwerw = () => {
    this.setState({ show: !this.state.show });
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const {
      data: { title, vote_average, src, owerview }
    } = this.props;

    return (
      <div style={{ width: "300px" }}>
        <Image src={src} alt={title} />
        <p>{title}</p>
        <p>{vote_average}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button type="button" onClick={this.handlerShowOwerw}>
            {this.state.show ? "hide" : "show"}
          </button>

          <button
            type="button"
            onClick={this.handlerLike}
            className={this.state.like ? "btn-like" : ""}
          >
            {this.state.like ? "dislike" : "like"}
          </button>
        </div>
        {this.state.show ? <p>{owerview}</p> : null}
        {this.state.show ? <p>{this.state.time.toLocaleTimeString()}</p> : null}
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <MovieItem data={movie} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

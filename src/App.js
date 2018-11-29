import React, { Component } from 'react';
import Slider from "react-slick";
import './App.css';
import Counter from "./Counter"
import star from "./images/star.svg"

const pictures = [
  'https://www.pronovias.com/media/catalog/product/cache/image/9df78eab33525d08d6e5fb8d27136e95/N/A/NAITA_B.jpg',
  'https://www.pronovias.com/media/catalog/product/cache/image/9df78eab33525d08d6e5fb8d27136e95/N/E/NELSON_B.jpg',
  'https://www.pronovias.com/media/catalog/product/cache/image/9df78eab33525d08d6e5fb8d27136e95/N/E/NEVADA_B.jpg',
  'https://www.pronovias.com/media/catalog/product/cache/image/9df78eab33525d08d6e5fb8d27136e95/N/E/NERI_B.jpg',
];

const scoreStyle = {
  0: { border: 0, margin: 2 },
  1: { borderColor: 'yellow' },
  2: { borderColor: 'green' },
  3: { borderColor: 'red' },
}

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  accesibility: true,
  responsive: [{
    breakpoint: 640,
    settings: {
      slidesToShow: 1,
    },
  }],
};

export default class Responsive extends Component {
  constructor(props) {
    super(props)
    this._timers = new Set();
    this.state = {
      score0: 0,
      score1: 0,
      score2: 0,
      score3: 0,
    }
  }

  onChangeScore = (index, value) => {
    const reqScore = this.state[`score${index % 4}`] + value;
    const safeScore = Math.max(Math.min(reqScore, 3), 0);
    const alertTooHigh = reqScore > safeScore;
    const alertTooLow = reqScore < safeScore;
    this.setState({
      [`score${index % 4}`]: safeScore,
      alert: [alertTooHigh, alertTooLow].some(Boolean),
      alertTooHigh,
      alertTooLow,
      ...(reqScore > this.state[`score${index % 4}`] && {
        [`star${index % 4}`]: true,
      }),
    });
  }

  setTimeout(fn, delay) {
    this._timers.add(setTimeout(fn, delay));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.alert) {
      this.setTimeout(() => {
        this.setState({
          alert: false,
          alertTooHigh: false,
          alertTooLow: false,
        });
      }, 5000);
    }
    [0, 1, 2, 3].forEach((i) => {
      if (this.state[`score${i}`] <= prevState[`score${i}`]) {
        return;
      }
      this.setTimeout(() => {
        this.setState({
          [`star${i}`]: false,
        });
      }, 1000);
    });
  }

  componentWillUnmount() {
    this._timers.forEach(id => clearTimeout(id));
  }

  render() {
    const { alert, alertTooLow, alertTooHigh } = this.state;

    return (
      <div className="app-wrapper">
        <p className="app-header">Wedding.pl</p>
        {alert && (
          <div className="app-paragraph">
            {alertTooLow && (
              <p>Nie można zwiększyć liczby like'ów poniżej 0</p>
            )}
            {alertTooHigh && (
              <p>Nie można zwiększyć liczby like'ów powyżej 3</p>
            )}
          </div>
        )}
        <Slider {...sliderSettings}>
          {[...pictures, ...pictures].map((pictureSrc, index) => (
            <div key={index}>
              <div className="app-img-wrapper">
                <img
                  className="app-img"
                  alt={pictureSrc}
                  src={pictureSrc}
                  style={scoreStyle[this.state[`score${index % 4}`]]}
                />
                {this.state[`star${index % 4}`] && (
                  <div class="app-img-star">
                    <img
                      alt="star"
                      src={star}
                    />
                  </div>
                )}
                <Counter
                  value={this.state[`score${index % 4}`]}
                  onMinus={() => this.onChangeScore(index, -1)}
                  onPlus={() => this.onChangeScore(index, 1)}
                />                
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

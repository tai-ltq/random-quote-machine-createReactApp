import React from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

import ChangeQuote from './ChangeQuote';

class ListQuotes extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      colorIndex: 0,
      quotes: [],
      colors: [],
      appearQuote: true,
      style: {
        body: {
          backgroundColor: null,
          color: null,
        },
        backgroundColor: {
          backgroundColor: null,
        },
        color: {
          color: null,
        }
      },
    };
  }

  componentWillMount() {
    this.getQuotes();
    this.getColors();
  }

  async getQuotes() {
    let res = await axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
    const { quotes } = res.data;
    this.setState({
      index: Math.round(Math.random() * (quotes.length - 1)),
      quotes,
    });
  }

  changeQuote() {
    const { appearQuote, quotes, colors } = this.state;
    let index;
    do {
      index = Math.round(Math.random() * (quotes.length - 1));
    } while (index === this.state.index);

    let colorIndex;
    do {
      const random = Math.random();
      colorIndex = Math.round(random * (colors.length - 1));
    } while (colorIndex === this.state.colorIndex);
    const style = this.changeColor(this.state.colors, colorIndex);

    this.setState({
      appearQuote: !appearQuote,
      index,
      colorIndex,
      style
    }, () => {
      this.changeThemeColor();
    });
  }

  getColors() {
    const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
    const index = Math.round(Math.random() * (colors.length - 1));
    this.setState({
      colorIndex: index,
      colors,
      style: this.changeColor(colors, index),
    }, () => {
      this.changeThemeColor();
    });
  }

  changeColor(colors, index) {
    return {
      body: {
        backgroundColor: colors[index],
        color: colors[index],
      },
      backgroundColor: {
        backgroundColor: colors[index],
      },
      color: {
        color: colors[index],
      },
    }
  }

  changeThemeColor() {
    for (let i in this.state.style.body) {
      document.body.style[i] = this.state.style.body[i];
    }
  }

  render() {
    const { appearQuote, quotes, style } = this.state;
    const { quote, author } = quotes[this.state.index] || {};

    const twitterLink = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(`"${quote}"${author}`)}`;
    const tumblrLink = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(quote)}&content=${encodeURIComponent(quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
    return (
      <div className="quote-box" style={style.color}>
        <CSSTransition
          in={appearQuote}
          appear={true}
          timeout={500}
          classNames="fade">
          <div className="quote">
            <h1>
              <i className="fa fa-quote-left"/>
              <span className="content">{quote}</span>
            </h1>
            <p className="author">- {author}</p>
          </div>
        </CSSTransition>
        <div className="buttons">
          <div className="buttons__social">
            <a style={style.backgroundColor} href={twitterLink} rel="noopener noreferrer" target="_blank">
              <i className="fa fa-twitter" />
            </a>
            <a style={style.backgroundColor} href={tumblrLink} rel="noopener noreferrer" target="_blank">
              <i className="fa fa-tumblr" />
            </a>
          </div>
          <ChangeQuote changeQuote={this.changeQuote.bind(this)} backgroundColor={style.backgroundColor} />
        </div>
      </div>
    );
  }
}

export default ListQuotes;

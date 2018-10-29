import React from 'react';
import ListQuotes from './modules/Quotes/ListQuotes';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      quotes: [],
    };
  }

  render() {
    return (
      <div className="App">
        <ListQuotes quotes={this.state.quotes} />
      </div>
    );
  }
}

export default App;

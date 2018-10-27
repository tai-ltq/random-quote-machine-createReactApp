import React from 'react';
import Quotes from './modules/Quotes/Quotes';

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
        <Quotes quotes={this.state.quotes} />
      </div>
    );
  }
}

export default App;

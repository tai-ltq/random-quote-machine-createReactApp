import React from 'react';

class ChangeQuote extends React.Component {
  render() {
    return (
      <button className="buttons__change" onClick={this.props.changeQuote} style={this.props.backgroundColor}>New quote</button>
    );
  }
}

export default ChangeQuote;

import React, { Component } from 'react';

const arr = [
  {"name" : "a"},
  {"name" : "a"},
  {"name" : "a"},
  {"name" : "a"},
  {"name" : "a"},
  {"name" : "a"},
  {"name" : "a"},
  {"name" : "a"},
  {"name" : "a"},
  {"name" : "a"},
  {"name" : "a"},
  {"name": "aa"},
  {"name": "aa"},
  {"name": "aa"},
  {"name": "b"},
  {"name": "b"}
]

export default class AutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      result: []
    }
  }

  handleChange(e) {
    this.setState({
      result: arr.filter(x => x.name === e.target.value)
    })
  }

  render() {
    let resultDiv;
    if(this.state.result.length !== 0) {
      resultDiv = (
        <div className="josim">
          {
            this.state.result.map(
              (x,index) => <div className="item" key={index}>{x.name}</div>
            )
          }
        </div>
      );
    }

    return(
      <div>
        <input onChange={this.handleChange} />
        {resultDiv}
      </div>
    );
  }
}

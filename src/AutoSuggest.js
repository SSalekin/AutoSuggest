import React, { Component } from 'react';

const arr = [
  {"name" : "aslam", "age": 108},
  {"name" : "bosir", "age": 107},
  {"name" : "chacha", "age": 106},
  {"name" : "delwar", "age": 105},
  {"name" : "ehsan", "age": 104},
  {"name" : "foysal", "age": 103},
  {"name" : "hasem", "age": 102},
  {"name" : "gobor", "age": 101}
]

export default class AutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      result: [],
      selected: {}
    }
  }

  handleChange(e) {
    this.setState({
      result: arr.filter(x => x.name.includes(e.target.value))
    })
  }

  handleSelect(product) {
    this.setState({
      result: [],
      selected: product
    });

    this.term.value = product.name;
  }

  render() {
    let resultDiv;
    if(this.state.result.length !== 0) {
      resultDiv = (
        <div className="josim">
          {
            this.state.result.map(
              (x,index) => <div
                             className="item"
                             onClick={() => this.handleSelect(x)}
                             key={index}>
                             {x.name}
                           </div>
            )
          }
        </div>
      );
    }

    return(
      <div>
        <input
          type="text"
          ref={input => this.term = input}
          defaultValue={this.state.selected.name}
          onChange={this.handleChange} />
        {resultDiv}
        <p>hello</p>
      </div>
    );
  }
}

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
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      result: [],
      selected: {}
    }
  }

  handleChange(e) {
    if(e.target.value !== "") {
      this.setState({
        result: arr.filter(x => x.name.includes(e.target.value))
      })
    } else {
      this.setState({
        result: []
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if(e.target.value !== "") {
      this.handleSelect(this.state.result[0]);
    }
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
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          ref={input => this.term = input}
          defaultValue={this.state.selected.name}
          onChange={this.handleChange} />
        {resultDiv}
        <p>hello</p>
      </form>
    );
  }
}

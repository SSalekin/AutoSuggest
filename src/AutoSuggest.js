import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';

export default class AutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getResult = this.getResult.bind(this);
    this.handleFormClear = this.handleFormClear.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);

    this.state = {
      result: [],
      selected: {},
      visibility : false
    }
  }

  handleFormClear() {
    this.setState({
      result: [],
      selected: {},
      visibility: false
    });

    this.term.value = "";
  }

  handleChange(e) {
    if(e.target.value !== "" ) {
      this.getResult(e.target.value)
    }
  }

  getResult(param) {
    let config = {
      headers: {'Authorization': '4cc47fe3-a711-4932-90fd-ceb27dd94e42'}
    };

    axios.get(
      `http://192.168.1.230:9000/product/searchProductByName/${param}`,
      config
    ).then(
      response => {
        this.setState({
          result: response.data.data,
          visibility: true
        })
      }
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    if(e.target.value !== "") {
      this.handleSelect(this.state.result[0]);
    }
  }

  handleSelect(item) {
    this.setState({
      visibility : false,
      selected: item
    });

    this.term.value = item.productName;
  }

  toggleVisibility(){
    if(!this.state.visibility) {
      this.setState({
        visibility: true
      })
    }
  }

  render() {
    let resultDiv;
    if(this.state.result.length !== 0 && this.state.visibility) {
      resultDiv = (
        <div className="suggestion-list">
          {
            this.state.result.map(
              (item, index) => (
                <div
                  className="item"
                  onClick={() => this.handleSelect(item)}
                  key={index}>
                  <div>
                    <span className="item-name">
                      {item.productName}
                    </span>
                    <br />
                    <span className="item-detail">
                      <code>{item.productId}</code>
                    </span>
                  </div>
                </div>
              )
            )
          }
        </div>
      );
    }

    return(
      <form className="autosuggest-div" onSubmit={this.handleSubmit}>
        <div className="form-group has-feedback">
          <input
            type="text"
            placeholder="type to search"
            onClick={this.toggleVisibility}
            className="form-control"
            ref={input => this.term = input}
            defaultValue={this.state.selected.productName}
            onChange={this.handleChange} />
          <span
            className="close-icon"
            onClick={this.handleFormClear} />
          {resultDiv}
        </div>
      </form>
    );
  }
}

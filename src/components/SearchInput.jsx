import React, {Component} from "react";
import "../assets/css/SearchInput.css";

class SearchInput extends Component {
  state = {
    input: "",
  }
  onInputChange = (evt) => {
    this.setState({
      input: evt.target.value
    })
  }
  onEnterKeyPress = (evt) => {
    const redirectToHome = sessionStorage.getItem("redirectToHome");

    sessionStorage.setItem("lastSearch", this.input);
    if (redirectToHome) {
      sessionStorage.removeItem("redirectToHome");
    }
    
    this.props.onEnterKey(evt, this.state.input);
  }
  render() {
    return (
      <div className={ this.props.container?"container search-input":"search-input"}>
        <input
          type="text"
          placeholder="search city or location"
          name="search-input"
          className={this.props.cssClass}
          value={this.state.input}
          onChange={this.onInputChange}
          onKeyDown={this.onEnterKeyPress}
        />
      </div>
    );
  }
}

export default SearchInput;
import React, { Component, createContext } from "react";

export const MainContext = createContext();
export default class MainContextProvider extends Component {
  state = {
    userType: "",
  };
  updateState = (state, value) => {
    this.setState({ [state]: value });
  };
  render() {
    return (
      <MainContext.Provider
        value={{ ...this.state, updateState: this.updateState }}
      >
        {this.props.children}
      </MainContext.Provider>
    );
  }
}

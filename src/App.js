import React from "react";
import Header from "./header/header.js";
import Main from "./main/main.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}

export default App;

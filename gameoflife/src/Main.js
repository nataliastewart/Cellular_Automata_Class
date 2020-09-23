import React from "react";
// import ReactDOM from "react-dom";

class Grid extends React.Component {
  render() {
    return <div>Hi from GRID</div>;
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      generation: 0,
    };
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <Grid />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

export default Main;

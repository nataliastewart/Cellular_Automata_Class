import React from "react";
import "./Main.css";
import { ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  };

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

class Grid extends React.Component {
  render() {
    const width = this.props.cols * 14;
    var rowsArr = [];
    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.rows; j++) {
        let boxId = i + "_" + j;

        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          //pushing a bunch of ox into the array
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }
    return (
      //calling the array of boxes down here {rowsArr}
      <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
    );
  }
}

class Buttons extends React.Component {
  handleSelect = (evt) => {
    this.props.gridSize(evt);
  };

  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.playButton}>
            Play
          </button>
          <button className="btn btn-default" onClick={this.props.pauseButton}>
            Pause
          </button>
          <button className="btn btn-default" onClick={this.props.clear}>
            Clear
          </button>
          <button className="btn btn-default" onClick={this.props.slow}>
            Slow
          </button>
          <button className="btn btn-default" onClick={this.props.fast}>
            Fast
          </button>
          <button className="btn btn-default" onClick={this.props.seed}>
            Seed
          </button>
          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <Dropdown eventKey="1">20x10</Dropdown>
            <Dropdown eventKey="2">50x30</Dropdown>
            <Dropdown eventKey="3">70x50</Dropdown>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    this.state = {
      generation: 0,
      //array big as rows variable and fill that with map. cretae another array and each element in that array is false. start grid cell turn off
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy,
    });
  };

  radom = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy,
    });
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1)
          if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1,
    });
  };

  componentDidMount() {
    this.radom();
    this.playButton();
  }
  render() {
    return (
      /* passing variables as props to Grid component */
      <div>
        <h1>Hello</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />

        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}
export default Main;

var BreakLength = React.createClass({
  render: function() {
    return (
      <div className="break">
        <input
          type="button"
          defaultValue="-"
          id="minus"
          onClick={this.props.onClickBreak}
        />
        <input
          type="text"
          size={1}
          value={this.props.breakLengthInput}
          onChange={this.props.onChangeBreakLengthInput}
        />
        <input
          type="button"
          defaultValue="+"
          id="plus"
          onClick={this.props.onClickBreak}
        />
      </div>
    );
  }
});

var TimeLength = React.createClass({
  render: function() {
    return (
      <div className="time">
        <input
          type="button"
          defaultValue="-"
          id="minus"
          onClick={this.props.onClickTime}
        />
        <input
          type="text"
          size={1}
          value={this.props.timeLengthInput}
          onChange={this.props.onChangeTimeLengthInput}
        />
        <input
          type="button"
          defaultValue="+"
          id="plus"
          onClick={this.props.onClickTime}
        />
      </div>
    );
  }
});

var Clock = React.createClass({
  render: function() {
    return (
      <div className="clock">
        <h1 className="zamanlama">
          {this.props.minutes < 10
            ? "0" + this.props.minutes
            : this.props.minutes}:{this.props.seconds < 10
            ? "0" + this.props.seconds
            : this.props.seconds}
        </h1>
      </div>
    );
  }
});

var StartButton = React.createClass({
  render: function() {
    render: return (
      <div className="startbutton">
        <button className="but" onClick={this.props.start}>
          {this.props.buttonText}
        </button>
      </div>
    );
  }
});

var Pomodoro = React.createClass({
  getInitialState: function() {
    return {
      breakLengthInput: 5,
      timeLengthInput: 25,
      seconds: 0,
      minutes: 25,
      sil: 5, //breakLengthInput kopyası
      intervalID: 0,
      tik: 2,
      buttonText: "Start"
    };
  },
  componentDidUpdate() {
    let min = this.state.minutes;
    let sec = this.state.seconds;
    let minSil = this.state.sil;

    if (sec == 0 && min == 0 && minSil == 0) {
     let clear = clearInterval(this.state.intervalID);

        this.setState({
        breakLengthInput: this.state.breakLengthInput,
        timeLengthInput: this.state.timeLengthInput,
        seconds: 0,
        minutes: this.state.timeLengthInput,
        sil: this.state.breakLengthInput, //breakLengthInput kopyası
        intervalID: 0,
        button: false,
        buttonText: "Start",

        tik: 2
      });

    }
  },

  start: function() {
    console.log(this.state.intervalID);

    let tik = this.state.tik;
    if (tik != 1) {
      let interval = setInterval(this.tick, 1000);
      this.setState({
        intervalID: interval,
        buttonText: "in Session ",

        tik: 1
      });
    } else {
      this.setState({
        buttonText: "Start",

        tik: 2
      });

      return clearInterval(this.state.intervalID);
    }
  },

  tick: function() {
    let min = this.state.minutes;
    let sec = this.state.seconds;
    let minSil = this.state.sil;
    let buttonText = this.state.buttonText;

    if (sec == 0) {
      min = min - 1;
      sec = 60;
    }

    if (sec < 61) {
      sec = sec - 1;
    }
    if (sec == 0 && min == 0 && minSil != 0) {
      min = minSil;

      minSil = 0;
      buttonText = "in Break";
    }

    this.setState({
      seconds: sec,
      minutes: min,
      sil: minSil,
      buttonText: buttonText
    });
  },

  onChangeBreakLengthInput: function(event) {
    const value = Number(event.target.value);
    if (value < 100 && value > 0) {
      this.setState({ breakLengthInput: value, sil: value });
    }
  },

  onChangeTimeLengthInput: function(event) {
    const value = Number(event.target.value);
    if (value < 100 && value > 0) {
      this.setState({ timeLengthInput: value, minutes: value });
    }
  },
  onClickBreak: function(event) {
    let value = event.target.value;
    let minb = this.state.breakLengthInput;
    let minSil = this.state.sil;
    if (value == "+" && minb < 99 && minb > 1) {
      this.setState({
        breakLengthInput: minb + 1,
        sil: minSil + 1
      });
    }
    if (value == "-" && minb < 100 && minb > 0) {
      this.setState({
        breakLengthInput: minb - 1,
        sil: minSil - 1
      });
    }
  },

  onClickTime: function(event) {
    let mint = this.state.timeLengthInput;
    let minute = this.state.minutes;
    let value = event.target.value;
    if (value == "+" && mint < 99 && mint > 1) {
      this.setState({
        timeLengthInput: mint + 1,
        minutes: minute + 1
      });
    }
    if (value == "-" && mint < 99 && mint > 1) {
      this.setState({
        timeLengthInput: mint - 1,
        minutes: minute - 1
      });
    }
  },

  render: function() {
    return (
      <div className="container">
        <div className="header">
        <h2>POMODORO CLOCK</h2>
        </div>
        <div className="breaklength">
          <h3>Break Length</h3>
        </div>
        <div className="timelength">
          <h3>Session Length</h3>
        </div>
        <BreakLength
          breakLengthInput={this.state.breakLengthInput}
          onClickBreak={this.onClickBreak}
          onChangeBreakLengthInput={this.onChangeBreakLengthInput}
        />
        <TimeLength
          timeLengthInput={this.state.timeLengthInput}
          onClickTime={this.onClickTime}
          onChangeTimeLengthInput={this.onChangeTimeLengthInput}
        />
        <Clock
          seconds={this.state.seconds}
          timeLengthInput={this.state.timeLengthInput}
          minutes={this.state.minutes}
        />
        <StartButton start={this.start} buttonText={this.state.buttonText} />
      </div>
    );
  }
});
ReactDOM.render(<Pomodoro />, document.getElementById("concon"));

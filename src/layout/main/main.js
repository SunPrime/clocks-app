import React, { Component } from "react"
import Clock from "react-clock"
import Button from "../../component/button/button"
import Input from "../../component/input/input"

import "./main.css"

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            timeLondon:    "",
            timeKyiv:      "",
            timeKathmandu: "",
            input:         ""
        };

        this.flagSetInterval = null;
        this.fladSetIntervalCustom = null;
    }

    componentDidMount() {
        this.setState({
            timeLondon: new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/London"})),
            timeKyiv: new Date(),
            timeKathmandu: new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kathmandu"})),
        });
        this.currentTime()
    }

    componentWillUnmount() {
        this.flagSetInterval = null;
        this.fladSetIntervalCustom = null;
    }

    currentTime() {
        this.flagSetInterval = setInterval(
            () =>
                this.setState({
                    timeLondon: new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/London"})),
                    timeKyiv: new Date(),
                    timeKathmandu: new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kathmandu"})),
                }),
            1000
        )
    }

    currentCustomTime(date) {
        let currentDate = date;
        this.fladSetIntervalCustom = setInterval(
            () => {
                this.setState({
                    timeLondon: new Date(currentDate.toLocaleString("en-US", {timeZone: "Europe/London"})),
                    timeKyiv: currentDate,
                    timeKathmandu: new Date(currentDate.toLocaleString("en-US", {timeZone: "Asia/Kathmandu"})),
                });
                currentDate =  new Date(currentDate.getTime() + 1000);
            },
            1000
        )
    }

    handleInput(event){
        console.log("INPUT", event.target.value);
        let currentValue = event.target.value;
        this.setState({
            input: currentValue
        });
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDay();
        let timeHours = currentValue.split(":")[0];
        let timeMin = currentValue.split(":")[1];
        let newTime =  new Date(year, month, day, timeHours, timeMin);
        clearTimeout(this.flagSetInterval);
        this.currentCustomTime(newTime);
    }

    handleClick(event){
        clearInterval(this.fladSetIntervalCustom);
        this.currentTime();
        this.setState({
            input: ""
        })
    }

    render() {
        const { timeLondon, timeKyiv, timeKathmandu, input } = this.state;

        return (
            <div className="main">
                <Button onClick={this.handleClick.bind(this)}>
                    Current time</Button>
                <div className="wrapper-clocks">
                    <div className="clock">
                        <h4>London</h4>
                        <Clock
                            renderNumbers={true}
                            value={timeLondon}
                        />
                    </div>
                    <div className="clock">
                        <h4>Kyiv</h4>
                        <Clock
                            renderNumbers={true}
                            value={timeKyiv}
                        />
                        <Input
                            id="time"
                            type="time"
                            value={input}
                            onChange={this.handleInput.bind(this)}
                        />
                    </div>
                    <div className="clock">
                        <h4>Kathmandu</h4>
                        <Clock
                            renderNumbers={true}
                            value={timeKathmandu}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Main
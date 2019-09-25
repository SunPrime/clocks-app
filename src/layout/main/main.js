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
        }
    }

    componentDidMount() {
        this.currentTime()
    }

    currentTime(){
        setInterval(
            () => this.setState({
                timeLondon: new Date(),
                timeKyiv: new Date(),
                timeKathmandu: new Date(),
            }),
            1000
        )
    }

    handleInput(event){
        console.log("INPUT", event)
    }

    handleClick(event){
        this.currentTime();
    }

    render() {
        const { timeLondon, timeKyiv, timeKathmandu } = this.state;

        return (
            <div className="main">
                <div className="clock">
                    <h4>London</h4>
                    <Clock
                        value={timeLondon}
                    />
                </div>
                <div className="clock">
                    <h4>Kyiv</h4>
                    <Clock
                        value={timeKyiv}
                    />
                    <Input
                        id="time"
                        required="Input time"
                        type="time"
                        onChange={this.handleInput.bind(this)}
                    />
                </div>
                <div className="clock">
                    <h4>Kathmandu</h4>
                    <Clock
                        value={timeKathmandu}
                    />
                </div>
                <br/>
                <Button onClick={this.handleClick.bind(this)}>
                    Current time</Button>
            </div>
        )
    }
}

export default Main
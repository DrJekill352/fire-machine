import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';

const delay = 100;
const previewStyle = {
    height: 240,
    width: 320,
};

export class Scanner extends Component {
    public state = {
        result: 'No result',
    }

    handleScan = (data: string) => {
        this.setState({
            result: data,
        })
    }

    handleError = (err: Error) => {
        console.error(err)
    }

    render() {
        return (
            <div>
                <QrReader
                    delay={delay}
                    style={previewStyle}
                    onError={this.handleError}
                    onScan={this.handleScan}
                />
                <p>{this.state.result}</p>
            </div>
        )
    }
}
import React, { Component } from 'react';

class BackButtonText extends Component {
    state = { text: '' };

    render() {
        return (
            <span>
                <i className="fa fa-arrow-left" /> {this.state.text}
            </span>
        );
    }
}

export default BackButtonText;

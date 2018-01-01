import React, { Component } from 'react';
import isEqual from 'lodash.isequal';

class Particle extends Component {
    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }
    render() {
        const { x, y, color, size = 4 } = this.props;
        return <circle cx={x} cy={y} r={size / 2} fill={color} />;
    }
}

export default Particle;

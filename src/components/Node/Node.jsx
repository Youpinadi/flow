import React, { Component } from 'react';
import './network-node.css';
import { color as d3Color } from 'd3-color';
import numeral from 'numeral';

class Node extends Component {
  constructor() {
    super();
    this.state = {
      scaled: false
    };
  }
  render() {
    const {
      onClick,
      x,
      y,
      radius,
      label,
      throughput,
      color,
      transform
    } = this.props;

    return (
      <g transform={transform} style={{ cursor: 'pointer' }}>
        <circle
          style={{ transition: 'fill 0.6s ease, stroke 0.6s ease' }}
          onClick={onClick}
          cx={x}
          cy={y}
          r={radius}
          fill={color}
          stroke={d3Color(color).brighter(0.35)}
          strokeWidth={radius / 7}
          strokealignment="outer"
        />
        <text
          onClick={onClick}
          fill="#FFFFFF"
          stroke="none"
          fontFamily="Helvetica Neue"
          fontSize={radius / 5}
          textAnchor="middle"
          alignmentBaseline="central"
          x={x}
          y={y - 6}
        >
          {label}
        </text>
        {throughput ? (
          <text
            onClick={onClick}
            fill="#FFFFFF"
            stroke="none"
            fontFamily="Helvetica Neue"
            fontSize={radius / 5}
            textAnchor="middle"
            alignmentBaseline="central"
            x={x}
            y={y + 6}
          >
            {numeral(throughput).format('0.00 b')}/s
          </text>
        ) : null}
      </g>
    );
  }
}

export default Node;

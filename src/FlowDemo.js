import React, { Component } from 'react';
import Flow from './components/Flow';
import sample from 'lodash.sample';
import numeral from 'numeral';

import './FlowDemo.css';
import { palette } from './lib/colors';

const randColor = () => {
    return sample(palette);
};

const width = 1000;

const endX = width;
const minParticles = 10;
const maxParticles = 200;
const maxReference = 20000;

const Example = ({ value, particleSize, colorStart, colorEnd }) => (
    <section className="example">
        <pre>
            {`<Flow 
    value={${value}} 
    particleSize={${particleSize}} 
    colorStart={${colorStart}} 
    colorEnd={${colorEnd}}
/>`}
        </pre>
        <svg width={width} height={50}>
            <Flow
                value={value}
                startX={0}
                startY={10}
                endX={endX}
                endY={10}
                minParticles={minParticles}
                maxParticles={maxParticles}
                particleSize={particleSize}
                maxReference={maxReference}
                colorStart={colorStart}
                colorEnd={colorEnd}
            />
        </svg>
    </section>
);

class FlowDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            particleSize: 10
        };
    }
    componentDidMount() {
        setInterval(this.randomize, 3000);
    }

    randomize = () => {
        const particleSize = sample([6, 10, 14, 18, 22]);
        this.setState({
            particleSize
        });
    };

    render() {
        return (
            <div className="flow-demo">
                <header className="App-header">
                    <h1 className="App-title">
                        FLO<span className="pink">W</span>
                    </h1>
                    <p>React components for flow visualization</p>
                </header>
                <div className="actions">
                    <span>
                        maxParticles:{' '}
                        <span className="pink">{maxParticles}</span>
                    </span>
                    <span>
                        particleSize:{' '}
                        <span className="pink">{this.state.particleSize}</span>
                    </span>
                    <span>
                        maxReference:{' '}
                        <span className="pink">
                            {numeral(maxReference).format('0,0')}
                        </span>
                    </span>
                </div>
                <Example
                    value={100}
                    particleSize={this.state.particleSize}
                    colorStart={randColor()}
                    colorEnd={randColor()}
                />
                <Example
                    value={2000}
                    particleSize={this.state.particleSize}
                    colorStart={randColor()}
                    colorEnd={randColor()}
                />
                <Example
                    value={10000}
                    particleSize={this.state.particleSize}
                    colorStart={randColor()}
                    colorEnd={randColor()}
                />
                <Example
                    value={20000}
                    particleSize={this.state.particleSize}
                    colorStart={randColor()}
                    colorEnd={randColor()}
                />
            </div>
        );
    }
}

export default FlowDemo;

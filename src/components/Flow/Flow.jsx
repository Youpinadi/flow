import React from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';
import { color as d3Color } from 'd3-color';

import Particle from '../Particle';
import flowParams from '../../lib/flow.js';

const distance = (x1, y1, x2, y2) => {
    return Math.hypot(x2 - x1, y2 - y1);
};

class Flow extends React.Component {
    constructor(props) {
        super(props);

        this.fps = 30;
        this.now = 0;
        this.then = Date.now();
        this.interval = 1000 / this.fps;
        this.delta = 0;

        this.state = this.getParticlesState(props);
    }

    getColorScale(colorStart, colorEnd, domainStart, domainEnd) {
        return scaleLinear()
            .range([d3Color(colorStart), d3Color(colorEnd)])
            .domain([domainStart, domainEnd])
            .interpolate(interpolateRgb);
    }

    getParticlesState = props => {
        const {
            value,
            startX,
            startY,
            endX,
            endY,
            spreadLimit = 10,
            minParticles = 5,
            maxParticles = 100,
            particleSize,
            maxReference = 100,
            colorStart,
            colorEnd
        } = props;
        const { speed, nbParticles } = flowParams(
            value,
            maxReference,
            minParticles,
            maxParticles
        );
        const particles = [];

        const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

        const distanceToSource = distance(endX, endY, startX, startY);
        this.colorScale = this.getColorScale(
            colorStart,
            colorEnd,
            0,
            distanceToSource
        );

        for (let i = 0; i < nbParticles; i++) {
            const particleX = Math.round(Math.random() * distanceToSource);
            const randYOffset =
                Math.random() > 0.5
                    ? -Math.random() * spreadLimit
                    : Math.random() * spreadLimit;

            particles.push({
                x: particleX,
                y: startY + randYOffset,
                color: this.colorScale(particleX),
                size: particleSize
            });
        }

        return {
            angle,
            speed,
            nbParticles,
            particles
        };
    };

    componentDidMount() {
        this.draw();
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.maxParticles !== this.props.maxParticles ||
            nextProps.value !== this.props.value ||
            nextProps.particleSize !== this.props.particleSize
        ) {
            this.setState(this.getParticlesState(nextProps));
        }
    }

    moveParticles = particles => {
        const dx = this.state.speed;
        const dy = 0;
        const {
            startX,
            startY,
            endX,
            endY,
            spreadLimit,
            particleSize
        } = this.props;

        const distanceToSource = distance(startX, startY, endX, endY);

        const newParticles = particles.map(p => {
            const shouldReset =
                distance(startX, startY, p.x + dx, p.y + dy) > distanceToSource;

            const particleX = Math.round(shouldReset ? startX : p.x + dx);

            const randYOffset = Math.random() > 0.5 ? -0.3 : 0.3;
            let particleY = shouldReset
                ? startY + randYOffset
                : p.y + dy + randYOffset;

            if (Math.abs(particleY) > startY + spreadLimit) {
                particleY = p.y + dy;
            }

            return {
                x: particleX,
                y: particleY,
                color: this.colorScale(particleX),
                size: p.size
            };
        });
        return newParticles;
    };

    draw = () => {
        requestAnimationFrame(this.draw);

        this.now = Date.now();
        this.delta = this.now - this.then;

        if (this.delta > this.interval) {
            this.then = this.now - this.delta % this.interval;
            if (
                !this.props.paused &&
                !window.location.search.includes('stopped')
            ) {
                this.update();
            }
        }
    };

    update = () => {
        this.setState({
            particles: this.moveParticles(this.state.particles)
        });
    };

    render() {
        const { startX, startY } = this.props;
        return (
            <g
                transform={`translate(${startX}, ${startY}) rotate(${
                    this.state.angle
                })`}
            >
                {this.state.particles.map((p, i) => (
                    <Particle key={i} {...p} />
                ))}
            </g>
        );
    }
}

export default Flow;

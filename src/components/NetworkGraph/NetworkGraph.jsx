import React from 'react';
import Node from '../Node';
import Flow from '../Flow';
import { getColorForString } from '../../lib/colors';
import { Motion, spring } from 'react-motion';

const getNeighbours = (
  limit,
  nodeList,
  centerNode,
  onRoleSelect,
  graphWidth,
  graphHeight,
  centerNodeData,
  loading
) => {
  const radius = graphWidth / 2.7;
  const nodes = [];
  const width = radius * 2 + (graphWidth - radius * 2);
  const height = radius * 2 + (graphHeight - radius * 2);
  let angle;
  let x;
  let y;

  let newNodeList = nodeList.sort((n1, n2) => n2.throughput - n1.throughput);

  let filteredNodes = newNodeList.slice(0, limit);
  if (limit < newNodeList.length) {
    const restNodes = newNodeList.slice(limit, nodeList.length);
    const totalThoughput = restNodes.reduce(
      (memo, value) => memo + value.throughput,
      0
    );

    filteredNodes.push({
      role: `Others`,
      count: restNodes.length,
      throughput: totalThoughput
    });
  }
  const springParams = { stiffness: 60, damping: 8 };

  for (let i = 0; i < filteredNodes.length; i++) {
    const node = filteredNodes[i];
    angle = i / (filteredNodes.length / 2) * Math.PI; // Calculate the angle at which the element will be placed.
    // For a semicircle, we would use (i / numNodes) * Math.PI.
    x = radius * Math.cos(angle) + width / 2; // Calculate the x position of the element.
    y = radius * Math.sin(angle) + height / 2; // Calculate the y position of the element.
    const nodeRadius = 50;
    const label = node.count ? `${node.role} (${node.count})` : node.role;
    nodes.push(
      <g key={i}>
        {!loading ? (
          <Flow
            source={{
              x: centerNodeData.x,
              y: centerNodeData.y
            }}
            target={{ x, y }}
            value={node.throughput}
            colorStart={getColorForString(centerNode)}
            colorEnd={getColorForString(node.role)}
            centerNodeRadius={centerNodeData.radius}
            outerNodeRadius={nodeRadius}
            distanceToSource={radius}
          />
        ) : null}
        <Motion
          defaultStyle={{ x: centerNodeData.x, y: centerNodeData.y }}
          style={{
            x: spring(!loading ? x : centerNodeData.x, springParams),
            y: spring(!loading ? y : centerNodeData.y, springParams)
          }}
        >
          {interpolatingStyle => (
            <Node
              x={interpolatingStyle.x}
              y={interpolatingStyle.y}
              radius={nodeRadius}
              label={label}
              throughput={node.throughput}
              onClick={() => onRoleSelect(node.role)}
              color={getColorForString(node.role)}
            />
          )}
        </Motion>
      </g>
    );
  }

  return nodes;
};

const NetworkGraph = (
  {
    limit,
    width = 700,
    height = 700,
    data = [],
    centerNode,
    onRoleSelect,
    loading
  } = {}
) => {
  const centerNodeData = {
    x: width / 2,
    y: height / 2,
    radius: 80,
    label: centerNode,
    color: getColorForString(centerNode)
  };
  const springParams = { stiffness: 60, damping: 8 };

  return (
    <svg height={height} width={width}>
      <g className="container">
        {getNeighbours(
          limit,
          data,
          centerNode,
          onRoleSelect,
          width,
          height,
          centerNodeData,
          loading
        )}
        <Motion
          defaultStyle={{ scale: 0 }}
          style={{
            scale: spring(!loading ? 1 : 1.2, springParams)
          }}
        >
          {interpolatingStyle => (
            <g
              transform={`scale(${interpolatingStyle.scale})`}
              style={{ transformOrigin: 'center center' }}
            >
              <Node {...centerNodeData} />
            </g>
          )}
        </Motion>
      </g>
    </svg>
  );
};

export default NetworkGraph;

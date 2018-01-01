# Flow

Flow is a set a react components aimed to create some fancy graphs visualisations in a simple and declarative way.
For the moment this is svg, but we could do some other renderer later on.

# Components

## Flow

A flow represents a flow of data, but it could represent anything really.
Given a `maxRef`, it will display any value between 0 and `maxRef` in a deterministic way.
Basically Flow will try to represent accurately streams from a few kB/s to hundreds of MB/s (or more), next to each other, while not displaying not enough or too much particles.

```
<Flow
  maxRef={10000000}
  startX={0}
  startY={0}
  endX={100}
  endY={100}
  maxParticles={100}
  particleSize={3}
  colorStart="#345EAD"
  colorEnd="#EAD345"
  value={10}
/>
```

## Node

A Node can represent anything: a machine, a service, a physical appliance

```
<Node
  size={40}
  name="internet"
  value={345000}
  unit="bytes"
  color={#456edf}
/>
```

## Network (find a better name)

A network consist of a centralNode that have child nodes related to him.
Children nodes will be spread around `centerNode`, and flows will be drawn from the center depending on the values given to the children nodes.

```
const centerNode = <Node
  size={40}
  name="internet"
  value={345000}
  unit="bytes"
  color={#456edf}
/>

<Network centerNode={centerNode} paused={false}/>
  <Node
    size={20}
    name="user1"
    value={345000}
    unit="bytes"
    color={#446edf}
    value={1000}
 />
  <Node
    size={20}
    name="user2"
    value={345000}
    unit="bytes"
    color={#edf446}
    value={5000}
/>
</Network/>
```

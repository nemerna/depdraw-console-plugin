/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  DragDrop,
  Draggable,
  Droppable,
  Split,
  SplitItem,
} from '@patternfly/react-core';
import { RegionsIcon as Icon1 } from '@patternfly/react-icons';
import { FolderOpenIcon as Icon2 } from '@patternfly/react-icons';
import {
  ColaLayout,
  ComponentFactory,
  DefaultEdge,
  DefaultGroup,
  DefaultNode,
  DragObjectWithType,
  Edge,
  EdgeStyle,
  Graph,
  GraphComponent,
  GraphElement,
  graphDropTargetSpec,
  groupDropTargetSpec,
  Layout,
  LayoutFactory,
  Model,
  ModelKind,
  Node,
  nodeDragSourceSpec,
  nodeDropTargetSpec,
  NodeModel,
  NodeShape,
  NodeStatus,
  SELECTION_EVENT,
  Visualization,
  VisualizationProvider,
  VisualizationSurface,
  withDndDrop,
  withDragNode,
  WithDndDropProps,
  WithDragNodeProps,
  withPanZoom,
  withSelection,
  WithSelectionProps,
  withTargetDrag,
} from '@patternfly/react-topology';

const BadgeColors = [
  {
    name: 'A',
    badgeColor: '#ace12e',
    badgeTextColor: '#0f280d',
    badgeBorderColor: '#486b00',
  },
  {
    name: 'B',
    badgeColor: '#F2F0FC',
    badgeTextColor: '#5752d1',
    badgeBorderColor: '#CBC1FF',
  },
];

const initialNodes = [
  { id: 'node-1', content: 'Node 1' },
  { id: 'node-2', content: 'Node 2' },
];
const CustomNode = ({ element, selected, onSelect, ...rest }) => {
  const data = element.getData();
  const Icon = data.icon;
  const badgeColors = BadgeColors.find(
    (badgeColor) => badgeColor.name === data.badge,
  );
  return (
    <DefaultNode
      element={element}
      showStatusDecorator
      badge={data.badge}
      badgeColor={badgeColors?.badgeColor}
      badgeTextColor={badgeColors?.badgeTextColor}
      badgeBorderColor={badgeColors?.badgeBorderColor}
      onSelect={onSelect}
      selected={selected}
      {...rest}
    >
      <g transform={`translate(25, 25)`}>
        <Icon
          style={{
            color: '#393F44',
          }}
          width={25}
          height={25}
        />
      </g>
    </DefaultNode>
  );
};
const customLayoutFactory = (type, graph) =>
  new ColaLayout(graph, {
    layoutOnDrag: false,
  });
const CONNECTOR_TARGET_DROP = 'connector-target-drop';
const customComponentFactory = (kind, type) => {
  switch (type) {
    case 'group':
      return withDndDrop(groupDropTargetSpec)(
        withDragNode(nodeDragSourceSpec('group'))(
          withSelection()(DefaultGroup),
        ),
      );
    default:
      switch (kind) {
        case ModelKind.graph:
          return withDndDrop(graphDropTargetSpec())(
            withPanZoom()(GraphComponent),
          );
        case ModelKind.node:
          return withDndDrop(nodeDropTargetSpec([CONNECTOR_TARGET_DROP]))(
            withDragNode(nodeDragSourceSpec('node', true, true))(CustomNode),
          );
        case ModelKind.edge:
          return withTargetDrag({
            item: {
              type: CONNECTOR_TARGET_DROP,
            },
            begin: (monitor, props) => {
              props.element.raise();
              return props.element;
            },
            drag: (event, monitor, props) => {
              props.element.setEndPoint(event.x, event.y);
            },
            end: (dropResult, monitor, props) => {
              if (monitor.didDrop() && dropResult && props) {
                props.element.setTarget(dropResult);
              }
              props.element.setEndPoint();
            },
            collect: (monitor) => ({
              dragging: monitor.isDragging(),
            }),
          })(DefaultEdge);
        default:
          return undefined;
      }
  }
};
const NODE_DIAMETER = 75;
const NODES = [
  {
    id: 'node-0',
    type: 'node',
    label: 'Node 0',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.ellipse,
    status: NodeStatus.danger,
    data: {
      badge: 'B',
      icon: Icon1,
    },
  },
  {
    id: 'node-1',
    type: 'node',
    label: 'Node 1',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.hexagon,
    status: NodeStatus.warning,
    data: {
      badge: 'B',
      icon: Icon1,
    },
  },
  {
    id: 'node-2',
    type: 'node',
    label: 'Node 2',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.octagon,
    status: NodeStatus.success,
    data: {
      badge: 'A',
      icon: Icon1,
    },
  },
  {
    id: 'node-3',
    type: 'node',
    label: 'Node 3',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.rhombus,
    status: NodeStatus.info,
    data: {
      badge: 'A',
      icon: Icon1,
    },
  },
  {
    id: 'node-4',
    type: 'node',
    label: 'Node 4',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.hexagon,
    status: NodeStatus.default,
    data: {
      badge: 'C',
      icon: Icon2,
    },
  },
  {
    id: 'node-5',
    type: 'node',
    label: 'Node 5',
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    shape: NodeShape.rect,
    data: {
      badge: 'C',
      icon: Icon1,
    },
  },
  {
    id: 'Group-1',
    children: ['node-0', 'node-1', 'node-2'],
    type: 'group',
    group: true,
    label: 'Group-1',
    style: {
      padding: 40,
    },
  },
];
const EDGES = [
  {
    id: 'edge-node-4-node-5',
    type: 'edge',
    source: 'node-4',
    target: 'node-5',
    edgeStyle: EdgeStyle.default,
  },
  {
    id: 'edge-node-0-node-2',
    type: 'edge',
    source: 'node-0',
    target: 'node-2',
    edgeStyle: EdgeStyle.default,
  },
];

const SidebarNode = ({ id, label }) => {
  return (
    <Draggable
      key={id}
      id={id}
      type="node" // <-- Add this
      draggableData={{ id, label }}
      style={{ padding: '8px' }}
    >
      {label}
    </Draggable>
  );
};


export const SidebarTopologyDragDrop = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [topologyNodes, setTopologyNodes] = useState(NODES); // Initial nodes for the topology

  const controller = React.useMemo(() => {
    const model = {
      nodes: topologyNodes,
      edges: EDGES,
      graph: {
        id: 'g1',
        type: 'graph',
        layout: 'Cola',
      },
    };
    const newController = new Visualization();
    newController.registerLayoutFactory(customLayoutFactory);
    newController.registerComponentFactory(customComponentFactory);
    newController.addEventListener(SELECTION_EVENT, setSelectedIds);
    newController.fromModel(model, false);
    return newController;
  }, [topologyNodes]);

  function onDrop(source, dest) {
    if (dest && dest.droppableId === 'topology') {
      const newNode = {
        id: source.id,
        type: 'node',
        label: source.label,
        width: NODE_DIAMETER,
        height: NODE_DIAMETER,
        shape: NodeShape.ellipse,
        status: NodeStatus.danger,
        data: {
          badge: 'B',
          icon: Icon1,
        },
      };
      setTopologyNodes((prevNodes) => [...prevNodes, newNode]);
      return true;
    }
    return false;
  }

  return (
    <DragDrop>
      <Split hasGutter>
        {/* Sidebar */}
        <SplitItem>
          <div
            style={{
              padding: '8px',
              backgroundColor: '#f0f0f0',
              height: '100vh',
            }}
          >
            <h3>Sidebar</h3>
            <SidebarNode id="node-6" label="Node 6" />
            <SidebarNode id="node-7" label="Node 7" />
          </div>
        </SplitItem>

        {/* Topology */}
        <SplitItem>
          <div
            style={{
              padding: '8px',
              backgroundColor: '#e0e8ff',
              height: '100vh',
              position: 'relative',
            }}
          >
            <h3>Topology</h3>
            <Droppable
              droppableId="topology"
              type = 'node'
              onDrop={onDrop}
            >
              <VisualizationProvider controller={controller}>
                <VisualizationSurface state={{ selectedIds }} />
              </VisualizationProvider>
            </Droppable>
          </div>
        </SplitItem>
      </Split>
    </DragDrop>
  );
};

export default SidebarTopologyDragDrop;
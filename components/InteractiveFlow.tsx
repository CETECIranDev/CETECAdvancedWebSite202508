import React from 'react';
import ReactFlow, {
    Background,
    Edge,
    Node,
    ReactFlowProvider,
    BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Cpu, Database, BrainCircuit, BarChart, HardDrive, UploadCloud, Rocket, Users, Route, Bot, Shield, Gauge, GitBranch, Server } from 'lucide-react';
import CustomNode from './flow/CustomNode';
import CustomEdge from './flow/CustomEdge';

const nodeTypes = {
    custom: CustomNode,
};

const edgeTypes = {
    custom: CustomEdge,
};

const nodeSize = { width: 140, height: 140 };

const initialNodes: Node[] = [
    // Input Layer
    { id: 'n1', type: 'custom', data: { icon: <Users size={24} />, label: 'شمارش افراد' }, position: { x: 0, y: 150 }, style: nodeSize },
    { id: 'n2', type: 'custom', data: { icon: <Route size={24} />, label: 'تردد جاده‌ای' }, position: { x: 50, y: 350 }, style: nodeSize },
    { id: 'n3', type: 'custom', data: { icon: <Rocket size={24} />, label: 'داده پهپاد' }, position: { x: 0, y: 550 }, style: nodeSize },
    { id: 'n4', type: 'custom', data: { icon: <Database size={24} />, label: 'سنسورهای صنعتی' }, position: { x: 150, y: 0 }, style: nodeSize },

    // Hardware Layer
    { id: 'n5', type: 'custom', data: { icon: <HardDrive size={24} />, label: 'دیتالاگرها' }, position: { x: 350, y: 200 }, style: nodeSize },
    { id: 'n6', type: 'custom', data: { icon: <Server size={24} />, label: 'گیت‌وی IoT' }, position: { x: 350, y: 500 }, style: nodeSize },

    // Cloud Layer
    { id: 'n7', type: 'custom', data: { icon: <UploadCloud size={24} />, label: 'پلتفرم ابری' }, position: { x: 600, y: 350 }, style: nodeSize },

    // AI Core Layer
    { id: 'n8', type: 'custom', data: { icon: <Cpu size={24} />, label: 'هسته پردازش' }, position: { x: 850, y: 200 }, style: nodeSize },
    { id: 'n9', type: 'custom', data: { icon: <BrainCircuit size={24} />, label: 'هسته هوش مصنوعی' }, position: { x: 850, y: 500 }, style: nodeSize },

    // AI Models Sub-layer
    { id: 'n10', type: 'custom', data: { icon: <Bot size={24} />, label: 'تشخیص اشیا' }, position: { x: 1100, y: 50 }, style: nodeSize },
    { id: 'n11', type: 'custom', data: { icon: <Shield size={24} />, label: 'تحلیل امنیتی' }, position: { x: 1100, y: 200 }, style: nodeSize },
    { id: 'n12', type: 'custom', data: { icon: <Gauge size={24} />, label: 'پیش‌بینی' }, position: { x: 1100, y: 350 }, style: nodeSize },
    { id: 'n13', type: 'custom', data: { icon: <GitBranch size={24} />, label: 'یادگیری ماشین' }, position: { x: 1100, y: 500 }, style: nodeSize },

    // Output Layer
    { id: 'n14', type: 'custom', data: { icon: <BarChart size={24} />, label: 'داشبورد تحلیلی' }, position: { x: 1350, y: 350 }, style: nodeSize },
];

const initialEdges: Edge[] = [
    // ... (Edges remain the same)
    { id: 'e1-5', source: 'n1', target: 'n5', type: 'custom', animated: true },
    { id: 'e2-5', source: 'n2', target: 'n5', type: 'custom', animated: true },
    { id: 'e3-6', source: 'n3', target: 'n6', type: 'custom', animated: true },
    { id: 'e4-5', source: 'n4', target: 'n5', type: 'custom', animated: true },
    { id: 'e5-7', source: 'n5', target: 'n7', type: 'custom', animated: true },
    { id: 'e6-7', source: 'n6', target: 'n7', type: 'custom', animated: true },
    { id: 'e7-8', source: 'n7', target: 'n8', type: 'custom', animated: true },
    { id: 'e7-9', source: 'n7', target: 'n9', type: 'custom', animated: true },
    { id: 'e8-10', source: 'n8', target: 'n10', type: 'custom', animated: true },
    { id: 'e8-11', source: 'n8', target: 'n11', type: 'custom', animated: true },
    { id: 'e9-12', source: 'n9', target: 'n12', type: 'custom', animated: true },
    { id: 'e9-13', source: 'n9', target: 'n13', type: 'custom', animated: true },
    { id: 'e10-14', source: 'n10', target: 'n14', type: 'custom', animated: true },
    { id: 'e11-14', source: 'n11', target: 'n14', type: 'custom', animated: true },
    { id: 'e12-14', source: 'n12', target: 'n14', type: 'custom', animated: true },
    { id: 'e13-14', source: 'n13', target: 'n14', type: 'custom', animated: true },
];

const proOptions = { hideAttribution: true };

const InteractiveFlow = () => {
    return (
        <ReactFlowProvider>
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                proOptions={proOptions}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnDoubleClick={false}
                fitView
                // --- THIS IS THE CHANGE ---
                // 'maxZoom' is reduced to make the overall view larger.
                fitViewOptions={{
                    padding: 0.1,
                    maxZoom: 0.6  // <-- Changed from 0.7 to 0.6 for more zoom
                }}
            >
                <Background variant={BackgroundVariant.Dots} gap={32} size={1.5} className="opacity-50" />
            </ReactFlow>
        </ReactFlowProvider>
    );
};

export default InteractiveFlow;
// components/InteractiveFlow.tsx (New Version with Curved Edges)
import React from 'react';
import ReactFlow, {
    Background,
    Edge,
    Node,
    ReactFlowProvider,
    BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Cpu, Database, BrainCircuit, BarChart, HardDrive, UploadCloud, Rocket, Users, Route } from 'lucide-react';
import CustomNode from './flow/CustomNode';
import CustomEdge from './flow/CustomEdge'; // <-- یال سفارشی را import کنید

const nodeTypes = {
    custom: CustomNode,
};

const edgeTypes = {
    custom: CustomEdge, // <-- یال سفارشی را ثبت کنید
};

// New, wider layout with more nodes
const initialNodes: Node[] = [
    // Inputs Layer
    { id: 'people', type: 'custom', data: { icon: <Users size={24} />, label: 'شمارش افراد' }, position: { x: 0, y: 150 } },
    { id: 'traffic', type: 'custom', data: { icon: <Route size={24} />, label: 'تردد جاده‌ای' }, position: { x: 100, y: 350 } },
    { id: 'drone', type: 'custom', data: { icon: <Rocket size={24} />, label: 'داده پهپاد' }, position: { x: 0, y: 550 } },

    // Hardware Layer
    { id: 'datalogger', type: 'custom', data: { icon: <HardDrive size={24} />, label: 'دیتالاگرها' }, position: { x: 300, y: 250 } },
    { id: 'sensors', type: 'custom', data: { icon: <Database size={24} />, label: 'سنسورهای صنعتی' }, position: { x: 300, y: 450 } },

    // Cloud & Processing Layer
    { id: 'cloud', type: 'custom', data: { icon: <UploadCloud size={24} />, label: 'پردازش ابری' }, position: { x: 600, y: 350 } },

    // AI Layer
    { id: 'ai-core', type: 'custom', data: { icon: <BrainCircuit size={24} />, label: 'هسته هوش مصنوعی' }, position: { x: 850, y: 350 } },

    // Output Layer
    { id: 'dashboard', type: 'custom', data: { icon: <BarChart size={24} />, label: 'داشبورد تحلیلی' }, position: { x: 1100, y: 350 } },
];

const initialEdges: Edge[] = [
    { id: 'e1', source: 'people', target: 'datalogger', type: 'custom', animated: true },
    { id: 'e2', source: 'traffic', target: 'datalogger', type: 'custom', animated: true },
    { id: 'e3', source: 'drone', target: 'datalogger', type: 'custom', animated: true },
    { id: 'e4', source: 'sensors', target: 'datalogger', type: 'custom', animated: true },
    { id: 'e5', source: 'datalogger', target: 'cloud', type: 'custom', animated: true },
    { id: 'e6', source: 'cloud', target: 'ai-core', type: 'custom', animated: true },
    { id: 'e7', source: 'ai-core', target: 'dashboard', type: 'custom', animated: true },
];

const proOptions = { hideAttribution: true };

const InteractiveFlow = () => {
    return (
        <ReactFlowProvider>
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes} // <-- نوع یال سفارشی را به React Flow معرفی کنید
                proOptions={proOptions}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnDoubleClick={false}
                fitView // This will automatically fit all nodes into the view
                fitViewOptions={{ padding: 0.1 }}
            >
                <Background variant={BackgroundVariant.Dots} gap={32} size={1.5} className="opacity-50" />
            </ReactFlow>
        </ReactFlowProvider>
    );
};

export default InteractiveFlow;
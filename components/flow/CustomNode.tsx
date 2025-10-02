// components/flow/CustomNode.tsx
import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';

const CustomNode: React.FC<NodeProps> = ({ data }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: Math.random() * 0.5 }}
            className="bg-card/50 backdrop-blur-lg border-2 border-border rounded-full flex flex-col items-center justify-center text-center p-2 shadow-lg"
        >
            {/*<div className="text-primary mb-1">{data.icon}</div>*/}
            {/*<div className="text-xs font-semibold text-foreground">{data.label}</div>*/}
            {/* You might want to adjust icon size and text size as well */}
            <div className="text-primary mb-2">{React.cloneElement(data.icon, { size: '35%' })}</div>
            <div className="text-sm font-semibold text-foreground">{data.label}</div>
            <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
            <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
        </motion.div>
    );
};

export default CustomNode;
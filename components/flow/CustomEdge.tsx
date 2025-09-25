import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

const CustomEdge: React.FC<EdgeProps> = ({
                                             id,
                                             sourceX,
                                             sourceY,
                                             targetX,
                                             targetY,
                                             sourcePosition,
                                             targetPosition,
                                             style = {},
                                         }) => {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <path
            id={id}
            style={{ ...style, strokeWidth: 2 }}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd="url(#arrow)" // Optional: add an arrowhead
        />
    );
};

export default CustomEdge;
import React from 'react';
import { EdgeProps, Position } from 'reactflow';

// A custom path calculation function for more dramatic curves
function getCustomCurvedPath({
                                 sourceX,
                                 sourceY,
                                 targetX,
                                 targetY,
                             }: {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
}): string {
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const curveIntensity = 0.3; // Increase this value for more curve

    const cx1 = sourceX + dx * curveIntensity;
    const cy1 = sourceY + dy * curveIntensity - Math.abs(dx) * curveIntensity;
    const cx2 = targetX - dx * curveIntensity;
    const cy2 = targetY - dy * curveIntensity + Math.abs(dx) * curveIntensity;

    return `M ${sourceX},${sourceY} C ${cx1},${cy1} ${cx2},${cy2} ${targetX},${targetY}`;
}

const CustomEdge: React.FC<EdgeProps> = ({
                                             id,
                                             sourceX,
                                             sourceY,
                                             targetX,
                                             targetY,
                                             style = {},
                                         }) => {
    const edgePath = getCustomCurvedPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <path
            id={id}
            style={style}
            className="react-flow__edge-path"
            d={edgePath}
        />
    );
};

export default CustomEdge;
"use client";

import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/floating/GlassCard";

// Custom Glass Node Component
const GlassNode = ({ data, selected }: any) => {
  return (
    <div className={`px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
      selected ? "bg-accent/20 border-accent shadow-[0_0_20px_rgba(250,204,21,0.4)]" : "bg-[#0a0a0f]/60 border-white/10 shadow-lg"
    }`}>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex items-center gap-3">
        {data.icon && <span className="text-xl">{data.icon}</span>}
        <span className={`font-medium ${selected ? "text-accent" : "text-white"}`}>{data.label}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

const nodeTypes = { glass: GlassNode };

const initialNodes: Node[] = [
  { id: "center", type: "glass", position: { x: 400, y: 300 }, data: { label: "Meteor", icon: "🦇" } },
  { id: "n1", type: "glass", position: { x: 200, y: 150 }, data: { label: "JEE 2027 & The Forge", desc: "[PLACEHOLDER FOR JEE]" } },
  { id: "n2", type: "glass", position: { x: 600, y: 150 }, data: { label: "Generative AI & Agents", desc: "[PLACEHOLDER FOR AI]" } },
  { id: "n3", type: "glass", position: { x: 100, y: 300 }, data: { label: "Vibe Link", desc: "[PLACEHOLDER FOR VIBE LINK]" } },
  { id: "n4", type: "glass", position: { x: 700, y: 300 }, data: { label: "Future Builds", desc: "[PLACEHOLDER FOR BUILDS]" } },
  { id: "n5", type: "glass", position: { x: 200, y: 450 }, data: { label: "The Vessel", desc: "[PLACEHOLDER FOR VESSEL]" } },
  { id: "n6", type: "glass", position: { x: 400, y: 500 }, data: { label: "The Codex", desc: "[PLACEHOLDER FOR CODEX]" } },
  { id: "n7", type: "glass", position: { x: 600, y: 450 }, data: { label: "The Frequency", desc: "[PLACEHOLDER FOR FREQUENCY]" } },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "center", target: "n1", animated: true, style: { stroke: "#facc15", strokeWidth: 2, opacity: 0.6 } },
  { id: "e2", source: "center", target: "n2", animated: true, style: { stroke: "#facc15", strokeWidth: 2, opacity: 0.6 } },
  { id: "e3", source: "center", target: "n3", animated: true, style: { stroke: "#facc15", strokeWidth: 2, opacity: 0.6 } },
  { id: "e4", source: "center", target: "n4", animated: true, style: { stroke: "#facc15", strokeWidth: 2, opacity: 0.6 } },
  { id: "e5", source: "center", target: "n5", animated: true, style: { stroke: "#facc15", strokeWidth: 2, opacity: 0.6 } },
  { id: "e6", source: "center", target: "n6", animated: true, style: { stroke: "#facc15", strokeWidth: 2, opacity: 0.6 } },
  { id: "e7", source: "center", target: "n7", animated: true, style: { stroke: "#facc15", strokeWidth: 2, opacity: 0.6 } },
];

export default function WebPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeNode, setActiveNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#facc15", strokeWidth: 2 } }, eds)),
    [setEdges],
  );

  const onNodeClick = (_: any, node: Node) => {
    if (node.id === "center") return;
    setActiveNode(node);
  };

  return (
    <div className="relative w-full h-[100svh] flex flex-col pt-24 overflow-hidden pointer-events-none">
      
      {/* Floating Header */}
      <motion.div 
        className="absolute top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-xl">
          The <span className="text-accent drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">Meteor Web</span>
        </h1>
      </motion.div>

      {/* Main Transparent Canvas */}
      <div className="flex-1 w-full h-full relative z-10 pointer-events-auto">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="dark-theme-flow"
          style={{ background: "transparent" }}
        >
          <Controls className="!bg-[#0a0a0f]/40 !backdrop-blur-xl !border-white/10 !fill-white shadow-2xl" />
        </ReactFlow>
      </div>

      {/* Node Details Modal */}
      <AnimatePresence>
        {activeNode && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute top-40 right-6 lg:right-12 z-50 w-80 pointer-events-auto"
          >
            <GlassCard glow>
              <h3 className="text-xl font-bold text-accent mb-4">{activeNode.data.label as string}</h3>
              <p className="text-white/80 font-light text-sm leading-relaxed mb-6">
                {activeNode.data.desc as string}
              </p>
              <button 
                onClick={() => setActiveNode(null)}
                className="text-xs text-white/50 hover:text-white uppercase tracking-widest transition-colors"
              >
                Close Connection
              </button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

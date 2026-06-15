"use client";

import React, { useCallback } from "react";
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
  NodeProps,
  Connection,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/floating/GlassCard";

type GlassNodeData = {
  label: string;
  icon?: string;
  desc?: string;
  link?: string;
  linkText?: string;
  isExpanded?: boolean;
};

// Custom Glass Node Component
const GlassNode = ({ id, data }: NodeProps<Node<GlassNodeData>>) => {
  const { setNodes } = useReactFlow();

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nds) => 
      nds.map(n => n.id === id ? { ...n, data: { ...n.data, isExpanded: false } } : n)
    );
  };

  return (
    <div className={`relative px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 z-50 ${
      data.isExpanded ? "bg-accent/20 border-accent shadow-[0_0_20px_rgba(250,204,21,0.4)]" : "bg-[#0a0a0f]/60 border-white/10 shadow-lg"
    }`}>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex items-center gap-3 relative z-10">
        {data.icon && <span className="text-xl">{data.icon}</span>}
        <span className={`font-medium ${data.isExpanded ? "text-accent" : "text-white"}`}>{data.label}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />

      {/* In-place Pop-up */}
      <AnimatePresence>
        {data.isExpanded && data.desc && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 md:w-80 z-[100] cursor-default"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
          >
            <GlassCard glow className="p-5 shadow-2xl">
              <h3 className="text-lg font-bold text-accent mb-3">{data.label}</h3>
              <p className="text-white/80 font-light text-xs md:text-sm leading-relaxed mb-4">
                {data.desc}
              </p>
              {typeof data.link === "string" && (
                <a 
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 rounded-xl bg-accent/20 hover:bg-accent/30 text-accent font-medium text-xs md:text-sm transition-all mb-3 focus:outline-none focus:ring-1 focus:ring-accent/40"
                >
                  {data.linkText || "Launch Project"}
                </a>
              )}
              <button 
                onClick={handleClose}
                className="text-[10px] md:text-xs text-white/50 hover:text-white uppercase tracking-widest transition-colors w-full text-left focus:outline-none"
              >
                Close Connection
              </button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const nodeTypes = { glass: GlassNode };

const initialNodes: Node[] = [
  { id: "center", type: "glass", position: { x: 400, y: 300 }, data: { label: "Meteor", icon: "🦇" } },
  { id: "n1", type: "glass", position: { x: 200, y: 150 }, data: { label: "JEE 2027 & The Forge", desc: "Deep academic preparation. Mastering Physics, Chemistry, and Mathematics for the JEE 2027. Building a razor-sharp analytical foundation under quiet discipline." } },
  { id: "n2", type: "glass", position: { x: 600, y: 150 }, data: { label: "Generative AI & Agents", desc: "Researching and building autonomous agentic systems. Combining custom LLM pipelines, prompt design, and real-time execution layers." } },
  { id: "n3", type: "glass", position: { x: 100, y: 300 }, data: { label: "Vibe Link", desc: "My first full AI chatbot built completely from scratch. Dark cyber theme, glassmorphic UI, looping background video, thunder effects, and Groq API. Ship fast, refine continuously.", link: "https://vibe-link-delta.vercel.app", linkText: "Launch Vibe Link" } },
  { id: "n4", type: "glass", position: { x: 700, y: 300 }, data: { label: "Future Builds", desc: "Next-generation software applications and automated systems. Moving ideas from conceptual architectures to production-ready builds." } },
  { id: "n5", type: "glass", position: { x: 200, y: 450 }, data: { label: "The Vessel", desc: "Building a strong physical frame. Height 6'2\" with strict discipline around fitness, weight training, and OMAD (One Meal A Day) protocol." } },
  { id: "n6", type: "glass", position: { x: 400, y: 500 }, data: { label: "The Codex", desc: "The unbreakable rules: Build strong fundamentals, ship anyway, and manage the dual mission (JEE + building) without compromise." } },
  { id: "n7", type: "glass", position: { x: 600, y: 450 }, data: { label: "The Frequency", desc: "Late-night music, coding during stormy nights, cars, and deep conversations about systems. Reaching out to fellow builders who operate on the same wavelength." } },
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

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#facc15", strokeWidth: 2 } }, eds)),
    [setEdges],
  );

  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    if (node.id === "center") return;
    setNodes((nds) => 
      nds.map((n) => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              isExpanded: !n.data.isExpanded
            }
          };
        }
        return n;
      })
    );
  };

  const hasExpandedNodes = nodes.some(n => n.data.isExpanded);

  return (
    <div className="relative w-full h-[100svh] flex flex-col pt-24 overflow-hidden pointer-events-none transition-all duration-500">
      
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
          className={`dark-theme-flow ${hasExpandedNodes ? "has-expanded-nodes" : ""}`}
          style={{ background: "transparent" }}
        >
          <Controls className="!bg-[#0a0a0f]/40 !backdrop-blur-xl !border-white/10 !fill-white shadow-2xl" />
        </ReactFlow>
      </div>
    </div>
  );
}

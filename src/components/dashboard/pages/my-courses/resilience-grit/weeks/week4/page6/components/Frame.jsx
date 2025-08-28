
import { useState } from 'react';
import QuestionBox from "../../../../components/QuestionBox";
import "./frame.css"

const Frame = () => {
  // Converted from 800x500 to percentage coordinates for responsiveness
  const [nodes, setNodes] = useState([
    { id: '1', text: '', borderColor: '#ef4444', x: 50, y: 10 },   // top (red)
    { id: '2', text: '', borderColor: '#f59e0b', x: 18.75, y: 30 }, // top-left (orange)
    { id: '3', text: '', borderColor: '#10b981', x: 20, y: 50 },    // bottom-left (green)
    { id: '4', text: '', borderColor: '#3b82f6', x: 78.75, y: 30 }, // top-right (blue)
    { id: '5', text: '', borderColor: '#8b5cf6', x: 80, y: 50 },  // bottom-right (purple)
  ]);

  const centerX = 50;
  const centerY = 50;

  const updateNodeText = (id, text) => {
    setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, text } : node)));
  };

  return (
    <QuestionBox>
      <div className="mm-outer">
        <div className="mm-map">
          {/* Connection Lines (percentage-based, scales responsively) */}
          <svg className="mm-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {nodes.map((node) => (
              <line
                key={`line-${node.id}`}
                x1={centerX}
                y1={centerY}
                x2={node.x}
                y2={node.y}
              />
            ))}
          </svg>

          {/* Central Node */}
          <div className="mm-center">
            <div className="mm-center-circle">
              <h2 className="mm-center-text">you</h2>
            </div>
          </div>

          {/* Input Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="mm-node"
              style={
                {
                  // Per-node variables for position and border color
                  '--x': node.x,
                  '--y': node.y,
                  '--border': node.borderColor,
                }
              }
            >
              <input
                type="text"
                className="mm-input"
                placeholder="Type here..."
                value={node.text}
                onChange={(e) => updateNodeText(node.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

    </QuestionBox>

  );
};

export default Frame;

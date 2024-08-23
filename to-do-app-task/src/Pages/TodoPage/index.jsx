
import Header from "../../components/Header";
import Todo from "../../components/Todo";
import './style.css';

import React, { useEffect } from 'react';
import {
    ReactFlow,
    useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useSelector } from "react-redux";
const ToDoPage = () => {
    const title = useSelector((state) => state.title);
    const list = useSelector((state) => state.list);
    const selectList= useSelector((state) => state.selectList);
    const initialNodes = title.map((item, index) => ({
        id: `node-${index}`,
        position: { x: 0, y: 100 * index },
        data: { label: item, content: list[index] },
        type: 'custom', 
    }));

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

    useEffect(() => {
        const newNodes = title.map((item, index) => ({
            id: `node-${index}`,
            position: { x: 0, y: 200 * index },
            data: { label: item, content: list[index] ,additionalInfo: selectList[index] , idx:index },
            type: 'custom',
        }));
        setNodes(newNodes);
    }, [title, list]);
    // useEffect(() => {
    //     dispatch(refreshAllComponents());
    //   }, []);

    return ( 
        <div className="to-do-page"      >
            <Header />
            <div className="todos">
            <h1>to do </h1>
            <div className="notes">
            
            <div className="todonote">
                <h2>to do</h2>
            </div>
            <div className="todonote">
                <h2>doing</h2>
            </div>
            <div className="todonote">
                <h2>done</h2>
            </div>
            

            </div>
        <ReactFlow
            className="react-flow-to-do-page"
            style={{
                width: "100vw",
                height: "100vh"
            }}
            nodes={nodes}
            onNodesChange={onNodesChange}
            nodeTypes={{ custom: Todo }} 
        >
            
        </ReactFlow>
        </div>
        </div>
    );
};

export default ToDoPage;


import React from 'react';
import './style.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { updaEditContent,updateEdited,updaEditTitle, editIndexNote } from '../../Store';
import { deleteSelectList } from '../../Store';
const Todo = ({ data }) => {

    const dispatch =useDispatch()
    const handleChage=(e)=>{
        e.target.nextSibling.classList.toggle('done')
    }
    const deleteItem=()=>{
        dispatch(deleteSelectList(data.idx))
        console.log("delete item" , data.idx);
    }
    const editNote=()=>{
        dispatch(updaEditTitle(data.label))
        dispatch(updaEditContent(data.content))
        dispatch(updateEdited(true))
        dispatch(editIndexNote(data.idx))
        console.log("edit item" , data.idx);
    }
    return (
        <div className="card"  >
            <h3>{data.label}</h3>
            <div style={{ display: "flex" }}>
                {data.additionalInfo === "todo" && (
                    <input type="checkbox" name="todo" style={{ marginRight: "5px" }} onChange={handleChage} />
                )}
                <p>{data.content}</p>
            </div>
            <div className="btns">
                <button className='delete' onClick={deleteItem}><i class="fa-solid fa-trash"></i></button>
                <button className='edit' onClick={editNote}><i class="fa-solid fa-pen"></i></button>
            </div>
            
        </div>
    );
};

export default Todo;
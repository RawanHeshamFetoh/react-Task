import './style.css'
import { useDispatch , useSelector } from 'react-redux'
import { updateList, updateSelectList, updateTitle , editNote, updateEdited} from '../../Store'
import { useState , useEffect} from 'react'
export default function Header(){
    const [inputTitle , setInputTitle]=useState('')
    const [inputList , setInputList]=useState('')
    const [inputSelect , setInputSelect]=useState('text')
    const selectList = useSelector((state)=>state.selectList)
    let editTitle= useSelector((state)=>state.editTitle);
    let editList= useSelector((state)=>state.editContent);
    let edited = useSelector((state)=>state.edited)
    let editIdx= useSelector((state)=>state.editIndex)
    
    const dispatch = useDispatch()
    useEffect(() => {
        if (edited) {
            setInputTitle(editTitle);
            setInputList(editList);
            setInputSelect(selectList[editIdx] || 'text'); // Adjust based on your selectList
        } else {
            setInputTitle('');
            setInputList('');
            setInputSelect('text');
        }
    }, [edited, editTitle, editList, editIdx, selectList]);
    const handleTitle= (e)=>{
        setInputTitle( e.target.value)
    }
    const handleinputList= (e)=>{
        setInputList( e.target.value)
    }
    const handleSelect=(e)=>{
        setInputSelect(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if (inputTitle.trim() && inputList.trim()){
            if(edited){
                dispatch(editNote({ index: editIdx, title: inputTitle, content: inputList, select: inputSelect }))
                dispatch(updateEdited(false))
                
            }else{
                dispatch(updateTitle(inputTitle))
                dispatch(updateList(inputList))
                dispatch(updateSelectList(inputSelect))
            }
        }
        console.log(selectList)
    }
    
    useEffect(() => {
        console.log(inputSelect);  
    }, [inputSelect]);

    return(
        <header>
            <h1>todo App</h1>
            <form action="#" onSubmit={handleSubmit}>
                <div className="title">
                    <p>title </p>
                    <input type="text" name="title" value={ inputTitle} onChange={handleTitle}  />
                </div>
                <div className="title">
                    <select name="todoType" id="todoType" onChange={handleSelect} >
                        <option value="text" defaultValue> text</option>
                        <option value="todo"> todo</option>
                    </select>
                        <div>
                            <textarea name="todoText" id="todoText" value={inputList} onChange={handleinputList}></textarea>
                        </div>
                </div>
                <input type="submit" value={edited?"edit" :"add"} />
            </form>
        </header>
    )
}
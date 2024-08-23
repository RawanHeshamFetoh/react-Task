import { configureStore , createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const TitleSlice= createSlice({
    name: 'title',
    initialState: {
        title: [],
        list:[],
        selectList:[],
        editTitle:"",
        editContent:"",
        edited:false,
        editIndex:null,
    },
    reducers: {
        updateTitle: (state, action) => {
            state.title = [...state.title,action.payload]
        },
        updateList: (state, action) => {
            state.list = [...state.list,action.payload]
        },
        updateSelectList : (state, action)=>{
            state.selectList= [...state.selectList,action.payload]
        },
         deleteSelectList:(state,action)=>{
            const index= action.payload
            state.title= [
                ...state.title.slice(0, index),
                ...state.title.slice(index + 1)
            ];
            state.list=[
                ...state.list.slice(0, index),
                ...state.list.slice(index + 1)
            ]
         },
         editNote:(state,action)=>{
            const {index, title,content,select}=action.payload
            if (index >= 0 && index < state.title.length) {
                state.title = state.title.map((item, i) => (i === index ? title : item));
                state.list = state.list.map((item, i) => (i === index ? content : item));
                state.selectList = state.selectList.map((item, i) => (i === index ? select : item));
            }
         },
         updaEditTitle:(state,action)=>{
            state.editTitle=action.payload
         },
         updaEditContent:(state,action)=>{
            state.editContent=action.payload
         },
         updateEdited:(state,action)=>{
            state.edited=action.payload
         }, 
         editIndexNote:(state,action)=>{
            state.editIndex=action.payload
         }
    },
})

export const { updateTitle , updateList , updateSelectList ,deleteSelectList,editIndexNote, updaEditContent,updateEdited,updaEditTitle, editNote} = TitleSlice.actions;
export const store = configureStore({
    reducer: TitleSlice.reducer,
    })
    

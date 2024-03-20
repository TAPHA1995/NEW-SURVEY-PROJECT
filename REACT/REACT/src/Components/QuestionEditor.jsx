import {v4 as uuidv4} from "uuid"
import { useState } from "react";
import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function QuestionEditor({
    index=0,
    question,
    addQuestion,
    deleteQuestion,
    questionChange,
}){
    const [model, setModel] = useState({...question});
    const {questionTypes} = useStateContext();
    useEffect(()=>{
        questionChange(model);
    },[model]);

    function upperCaseFirst(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function shouldhaveOption(type = null){
        type = type || model.type
        return ['select', 'radio', 'checkbox'].includes(type)
    }
    function onTypeChange(ev){
        const newModel = {
         ...model,
         type: ev.target.value
        }
        if(!shouldhaveOption(model.type) && shouldhaveOption(ev.target.value))
        {
            if(!model.data.options){
                newModel.data = {
                    options:[
                        {uuid: uuidv4(), text: ''}
                    ]
                };
            }
         
        }
       setModel(newModel)
  
    }
    function addOption(){
        model.data.options.push({
            uuid: uuidv4(),
            text: ''
        })
        setModel({...model})
    }
    function deleteOption(op){
        model.data.options = model.data.options.filter(option => option.uuid != op.uuid)
        setModel({...model})
    }
  return (
   <div>
    <br />
    <section className="mainContainerQuestionEditor">
        <div className="flex justify-between mb-3 ">
            <h4>
                {index + 1}. {model.question}
            </h4>
            <div className="flex items-center">
            <button type="button"
            className="flex items-center text-xs py-1 px-3 mr-2 rounded-ms text-white
            bg-gray-600
            hover:bg-gray-700"
            onClick={()=> addQuestion(index + 1)}
            >
                <PlusIcon className="w-4" />
                add
            </button>
            <button
            type="button"
            className="flex items-center text-xs py-1 px-3 mr-2 rounded-m border border-transparent text-red-500 hover:border-red-600"
            onClick={()=> deleteQuestion(question)}>
            <TrashIcon className="w-4"/>
            Delete
            </button>
            </div>
        </div>
        <div className="flex gap-3 justify-between mb-3 items-center">
        <div className="flex-1">
            <label
            htmlFor="question"
            className="block text-sm front-medium text-gray-700"
            >
                Question
            </label>
            <input 
            type="text"
            name="question"
            value={model.question}
            onChange={(ev)=> setModel({...model, question: ev.target.value})}
            className="mt-1 block w-full rounded-sm py-2 question shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>
        <div>
            <label
            htmlFor="questionType"
            className="block text-sm front-medium text-gray-700"
            >
                Question Type
            </label>
            <select
            id="questionType"
            name="questionType"
            value={model.type}
            onChange={onTypeChange}
            className="mt-1 block w-full rounded-sm questionType  py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
            >
            {questionTypes.map((type)=>(
                <option value={type}  key={type}>
                {upperCaseFirst(type)}
                </option>
                ))}
            </select>
        </div>
        </div> 
        <div className="mb-3">
            <label 
            htmlFor="questionType"
            className="block text-sm front-medium text-gray-700"
            >
            Description
            </label>
            <textarea
            id="questionDescription"
            name="questionDescription"
            value={model.description || ''}
            onChange={(ev)=> setModel({...model, description: ev.target.value})}
            className="mt-1 block w-full rounded-sm questionDescription shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm"
            >

            </textarea>
        </div>

        <div>
        {shouldhaveOption() && 
        <div>
           <h4 className="text-sm font-semibold mb-1 flex justify-between items-center">
            Option
            <button type="button"
            onClick={addOption}
            className="
            flex
            items-center
            text-xs
            py-1
            px-2
            rounded-sm
            text-white
            bg-gray-600
            hover:bg-gray-700
            ">  
            <PlusIcon className="w-4" />
            Add
            </button>
            </h4>
            {model.data.options.length === 0 && <div className="text-xs text-gray-600 text-center py-3">
                You don't have any option defined
                </div>
                }
                {model.data.options.length > 0 &&<div>
                    {model.data.options.map((op, ind) =>(
                    <div key={op.uuid} className="flex items-center mb-1">
                     <span className="w-6 text-sm">{ind + 1}.</span>
                     <input type="text" value={op.text} 
                     onInput={ev =>{op.text = ev.target.value; setModel({...model})}}
                     className="w-full"
                     />
                     <button 
                     onClick={ev => deleteOption(op)}
                     type="button"
                     className="
                     h-6
                     w-6
                     rounded-full
                     flex
                     items-center
                     justify-center
                     border border-transparent
                     transition-colors
                     hover:border-red-100
                     ">
                       <TrashIcon className ='w-3 h-3 text-red-500'/>
                     </button>
                    </div>                  
                  ))}
                </div>
                }
           </div>
          }
        </div>
       { model.type === 'select' && <div>
        </div>}  
     </section>
   </div>
  )
}

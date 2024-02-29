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

  return (
   <div>
     <div className="flex justify-between mb-3">
        <h4>
            {index + 1}. {model.question}
        </h4>
        <div className="flex items-center">
           <button type="button"
           className="flex items-center text-xs py-1 px-3 mr-2 rounded-ms text-white
           bg-gray-600
           hover:bg-gray-700"
           onClick={addQuestion}
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
     <div className="flex gap-3 justify-between mb-3">
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
           className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
        onChange={(ev)=> setModel({...model, type: ev.target.value})}
        className="mt-1 block w-full rounded-sm border-gray-300  py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
        >
            {questionTypes.map((type)=>(
                <option value={type} selected ={model.Type == type}>
                {upperCaseFirst(type)}
                </option>
            ))}
        </select>
       </div>
     </div>
     <div>
        <label 
         htmlFor="questionType"
         className="block text-sm front-medium text-gray-700"
        >
         Description
        </label>
        <textarea
        id="questionDescription"
        name="questionDescription"
        onChange={(ev)=> setModel({...model, description: ev.target.value})}
         className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm"
        >

        </textarea>
     </div>
   </div>
  )
}

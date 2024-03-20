import {v4 as uuidv4} from "uuid"
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosClient from "../axios.js";
import SurveyPublicQuestionView from '../Components/SurveyPublicQuestionView.jsx';



export default function SurveyPublicView() {
    const answers ={};
    const [survey, setSurvey] = useState({
        questions:[]
    });
    const [loading, setLoading] = useState(false);
    const [surveyFinished, setSurveyFinished] = useState(false);
    const {slug}= useParams();

    useEffect(()=>{
        setLoading(true)
        axiosClient.get(`survey/get-by-slug/${slug}`).then(({data})=>{
            setLoading(false)
            setSurvey(data.data);
        }).catch(()=>{
            setLoading(false);
        })
    },[]);
    function answerChanged(question, value){
        answers[question.id] = value
        console.log(question, value)
    }
    function onSubmit(ev){
        ev.preventDefault()
        console.log(answers)
        axiosClient.post(`/survey/${survey.id}/answer`, {
            answers,
        })
        .then((response) => {
            setSurveyFinished(true);
        });
    }




  return (
    <div>
        {loading && <div className='flex justify-center mt-[250px] text-white'>En chargement...</div>}
        {!loading && (
            <div className="flex justify-center mt-3">
            <form  onSubmit={ev => onSubmit(ev)} className="container w-[600px] bg-[#eae8e8] ml-2 p-3">
              
                    <div className=" mt-4">
                        <div className="">
                            <img src={survey.image_url} alt=""className="w-[600px] h-[300px] mt-[-23px]" />
                        </div>
                        <div className="col-span-5">
                            <h1 className="text-3xl mb-3">
                                {survey.title}
                            </h1>
                            <p className="text-gray-500 text-sm mb-3">
                            Date d'expiration : {survey.expire_date}
                            </p>
                            <p className="text-gray-500 text-sm mb-3">
                                {survey.description}
                            </p>
                        </div>
                    </div>
                    {surveyFinished && (
                        <div className="py-3 px-3 text-center bg-emerald-500 text-white w-[300px]  mx-auto">
                          Merci pour votre participation
                        </div>
                    )}
                    {!surveyFinished &&(
                        <>
                    <div>
                        {survey.questions.map((question, index) => (
                            <SurveyPublicQuestionView
                             key={question.id}
                             question={question}
                             index={index}
                             answerChanged={val => answerChanged(question, val)}
                             />
                        ))}
                    </div>
                <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Soumettre
                </button>
                        
                    </>
                    )}
            </form>
            </div>
        )}
        <br />
    </div>
  );
}

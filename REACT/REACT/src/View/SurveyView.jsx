import React, { useEffect, useState } from 'react'
import PageComponent from '../Components/PageComponent'
import { LinkIcon, ShareIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import axiosClient from "../axios.js";
import Tbutton from '../Components/core/Tbutton.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import SurveyQuestions from '../Components/SurveyQuestions.jsx';
import {v4 as uuidv4} from "uuid"
import { useStateContext } from '../Contexts/ContextProvider.jsx';

export default function SurveyView() {
  const {showToast} = useStateContext();
  const navigate = useNavigate();
  const {id} = useParams()
    const [survey, setSurvey] = useState({
        titre:"",
        slug:"",
        status:false,
        description:"",
        image:null,
        image_url:null,
        expire_date:"",
        questions:[],
    });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const onImageChoose =(ev)=>{
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setSurvey({
                ...survey,
                image:file,
                image_url:reader.result,
            });
            ev.target.value = ""
        }
      reader.readAsDataURL(file);
    }
    
    const onSubmit = (ev)=> {
      ev.preventDefault();

      const payload = {...survey};
      if(payload.image){
        payload.image = payload.image_url
      }
      delete payload.image_url;
      let res = null;
      if(id){
        res = axiosClient.put(`/survey/${id}`, payload)
      }else{
        res =axiosClient.post('/survey', payload)
      }
      res.then((res) => {
        console.log(res);
        navigate('/survey')
        if(id)
        {
          showToast('Le formulaire a été bien modifié')
        }else{
          showToast('Le formulaire a été bien créé')
        }
        
      })
     .catch((err)=>{
      if (err && err.response) {
        setError( err.response.data.message)
      }
         console.log(err, err.response);

     })
    
    };

    function onQuestionsUpdate(questions) {
      setSurvey({
        ...survey,
        questions
      })
    }

    const addQuestion = () =>{
      survey.questions.push({
        id:uuidv4(),
        type:"text",
        question:"",
        description:"",
        data:{},
      })
      setSurvey({...survey})
    };
    const onDelete = ()=>{
      
    }
    useEffect(()=>{
      if(id){
        setLoading(true)
        axiosClient.get(`/survey/${id}`).then(({data})=>{
          setSurvey(data.data)
          setLoading(false)

        })
      }
    },[])

    const image_profil={
      display:'flex',
      width:'100px',
      marginLeft:'0px',
      
  }
  const profil={
      display:'flex',
      justifyContent:'left',
      alignItems:'center',
      gap:'20px'
  }
    const form_create_survey={
      display:"flex",
      justifyContent:"center",
      
    }
    const loader={
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'200px',
      color:"white",
      fontSize:'30px'
    }
    const lien={
      fontSize:'10px'
    }
   
  return (
    <PageComponent title={! id ? 'Créer' : 'Modifier'}
    buttons={
     <div className='flex gap-2 item-center bg-sky-600 p-1 rounded text-white'>
      <Tbutton color="green"  href={`/survey/public/${survey.slug}`} >
          <ShareIcon className='h-5 w-5 mr-3' />       
      </Tbutton>
     </div>
    }
     >
      
      <section style={form_create_survey} className='bg-gray-100'>
        {loading && <div style={loader}>En chargement...</div>}
        {!loading &&    
        <form onSubmit={onSubmit} className='bg-white p-4 'action="#" methode="POST">
          
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            {error && (<div className='bg-red-500 text-white py-4 px-3 rounded-lg'>
                {error}
          </div>)}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              
              <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                    <div style={profil}>
                        {survey.image_url &&(<img 
                        src={survey.image_url} style={image_profil}/>
                        )}
                        {!survey.image_url &&(
                        <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                        )}
                    <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        
                    >
                        <input type="file" className='absolute  opacity-0' onChange={onImageChoose} />
                        Changer
                    </button>
                  </div>
                </div>
              </div>  
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12 form_create_survey_input ">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Titre
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="titre"
                    id="titre"
                    value={survey.titre}
                    onChange={(ev)=>setSurvey({ ...survey, titre: ev.target.value})}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="sm:col-span-3"><br />
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    type="text"
                    name="description"
                    id="last-name"
                    value={survey.description}
                    onChange={(ev)=>setSurvey({ ...survey, description: ev.target.value})}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Date d'expiration
                </label>
                <div className="mt-2">
                  <input
                    id="expire_date"
                    name="expire_date"
                    type="date"
                    value={survey.expire_date}
                    onChange={(ev)=>setSurvey({ ...survey, expire_date: ev.target.value})}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <br />
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                 Actif
                </label>
                <div className="mt-2">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    checked={survey.status}
                    onChange={(ev)=>setSurvey({ ...survey, status: ev.target.checked})}
                    autoComplete="email"
                    className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <br />
             <button type='button' onClick={addQuestion}>Ajouter une question</button>
              <SurveyQuestions questions={survey.questions} onQuestionsUpdate={onQuestionsUpdate} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Créer
          </button>
        </div>
      </form>
       }
    </section>
    </PageComponent>
  )
}
import { ArrowTopRightOnSquareIcon, PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import  '../App.css';
import PageComponent from '../Components/PageComponent';
import SurveyListItems from '../Components/SurveyListItems';
import Tbutton from '../Components/core/Tbutton';
import { useStateContext } from '../Contexts/ContextProvider';
import { useEffect, useState } from 'react';
import axiosClient from '../axios';
import PaginationLinks from '../Components/PaginationLinks';

export default function Survey(onDeleteClick ) {
  
  const [survey, setSurvey] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  
  console.log(survey);
 
  const onPageClick = (link)=> {
    getSurvey(link.url)

  }

  const getSurvey = (url) => {
    url= url || '/survey'
    setLoading(true)
    axiosClient.get(url).then(({data})=>{
      setSurvey(data.data)
      setMeta(data.meta)
      setLoading(false)
      })
  }
  // const onDeleteClick = () =>{
  //   console.log("on delete click");
  // }
  useEffect(()=>{
    getSurvey()
     
  },[])

  const loader={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'200px',
    color:"white",
    fontSize:'30px'

  }
  return (
    <>
    <PageComponent title="Survey" buttons={(
      <Tbutton color="green" to="/survey/create" >
        <span className='flex items-center bg-green-700 text-white mr-3 p-1 rounded'>
        <PlusCircleIcon className='h-9 w-9 mr-3'/>
        Create new
        </span>
      </Tbutton>
    )}>
      <br />
      <div>
        {loading &&<div style={loader}>
          En chargement...
        </div>
        }
      </div>
      {(!loading &&<div>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
          {survey.map((survey) => (
            <div className="inner">
                <span className="pricing">
                  ID :
                  <span>
                  {survey.id}
                  </span>
                  </span>
                  <img src={survey.image_url} alt="" />
                  <h2 className="title">Titre : {survey.titre}</h2>
                  <h2 className="title">Description: {survey.description}</h2>
                  <div className='flex gap-5 bg-red-300 justify-center items-center'>
                  <Tbutton to={`/survey/${survey.id}`}>
                      <PencilIcon className='w-5 h-5 mr-2'/>
                  </Tbutton>
                  <Tbutton href={`/view/survey/${survey.slug}`}>
                      <ArrowTopRightOnSquareIcon className='w-7 h-7'/>
                  </Tbutton>
                  {survey.id && (
                  <Tbutton onClick={onDeleteClick} circle link color="red">
                  <TrashIcon className ='w-7 h-7'/>
                  </Tbutton>
                  )}
              </div>
            </div>
          ))}
        </div>
        <PaginationLinks meta={meta} onPageClick={onPageClick}/>a
      </div>
      )}
    </PageComponent>
    </>
  )
}

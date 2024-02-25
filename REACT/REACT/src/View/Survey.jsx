
import { ArrowTopRightOnSquareIcon, PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import  '../App.css';
import PageComponent from '../Components/PageComponent';
import SurveyListItems from '../Components/SurveyListItems';
import Tbutton from '../Components/core/Tbutton';
import { useStateContext } from '../Contexts/ContextProvider';

export default function Survey( ) {
  
  const {survey} = useStateContext();
  console.log(survey);
 

  const onDeleteClick = () =>{
    console.log("on delete click");
  }
  return (
    <PageComponent title="Survey" buttons={(
      <Tbutton color="green" to="/survey/create" >
        <span className='flex items-center bg-green-700 text-white mr-3 p-1 rounded'>
        <PlusCircleIcon className='h-9 w-9 mr-3'/>
        Create new
        </span>
         
      </Tbutton>
    )}>
      <br />
       <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
        {survey.map(survey => (
           <div className="inner">
             <span className="pricing">
             ID :
             <span>
             {survey.id}
             </span>
             </span>
             <h2 className="title">Titre : {survey.titre_sondage}</h2>
             <h2 className="title">Question 1 : {survey.reponse1}</h2>
             <h2 className="title">Question 2 : {survey.reponse2}</h2>
             <h2 className="title">Question 3 : {survey.reponse3}</h2>
             <h2 className="title">Question 4 : {survey.reponse4}</h2>
             <h2 className="title">Question 5 : {survey.reponse5}</h2>
             <div className='flex gap-5 bg-red-300 justify-center items-center'>
                <Tbutton to={`survey/${survey.id}`}>
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
    </PageComponent>
  )
}

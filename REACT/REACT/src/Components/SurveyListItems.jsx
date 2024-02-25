import React from 'react'
import Survey from '../View/Survey';

export default function SurveyListItems(survey) {
  return (
    <div>
        <br />
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
                <div className='flex gap-5 bg-red-300 justify-center'>
                <button to={`survey/${survey.id}`}>
                    Edite
                </button>
                <button href={`/view/survey/${survey.slug}`}>
                    View
                </button>
                {survey.id && (
                <button to={`survey/${survey.id}`}>
                supprimé
                </button>
                )}
            </div>
        </div>
    </div>
  )
}

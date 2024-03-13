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
                <h2 className="title">Titre : {survey.image_url}</h2>
                <h2 className="title">Titre : {survey.titre}</h2>
                <h2 className="title">Question 1 : {survey.description}</h2>
                <h2 className="title">Question 2 : {{ __html:survey.description}}</h2>
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

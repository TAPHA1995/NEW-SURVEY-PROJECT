import PageComponent from "../Components/PageComponent";
import DashboardCard from "../Components/DashboardCard";
import { useEffect, useEffectn, useState } from "react";
import axiosClient from "../axios.js";
import Tbutton from "../Components/core/Tbutton.jsx";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(()=>{
    setLoading(true);
    axiosClient
    .get('/dashboard')
    .then((res)=>{
      setLoading(false);
      setData(res.data);
      return res;
    })
    .catch((error) => {
      setLoading(false);
      return error;
    });
  }, []);
  const chargement={
    fontSize:'30px',
    color:'black',
    display:'flex',
    justifyContent:'center',
    marginTop:'100px'
  }
    return (
    <div>
      <PageComponent title="Tableau de bord">
        <br />
        {loading && <div style={chargement}>En charge...</div>}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 px-2 lg:grid-cols-3 gap-5 text-gray-700">
            <Link to="/Survey">
              <DashboardCard
              title="Total Surveys"
              className="order-1 lg:order-2"
              style="animation-delay: 0.1s"
              >
              <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                {data.totalSurveys}
              </div>
              </DashboardCard>
             </Link>
             <Link to="">
              <DashboardCard
              title="Total Answers"
              className="order-2 lg:order-4"
              style="animation-delay: 0.2s"
              >
              <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.totalAnswers}
              </div>
              </DashboardCard>
            </Link>
            <DashboardCard
            title="Latest Survey"
            className="order-3 lg:order-1 row-span-2"
            style="animation-delay: 0.2s"
            >
              {data.latestSurvey &&(
              <div>
                <img 
                src={data.latestSurvey.image_url}
                className="w-[240px] mx-auto"
                />
                <h3 className="font-bold text-xl mb-3">
                  {data.latestSurvey.title}
                </h3>
                 <div className="flex justify-between text-sm mb-1">
                  <div>Date de création:</div>
                  <div>{data.latestSurvey.created_at}</div>
                 </div>
                 <div className="flex justify-between text-sm mb-1">
                  <div>Date d'expiration:</div>
                  <div>{data.latestSurvey.expire_date}</div>
                 </div>
                 <div className="flex justify-between text-sm mb-1">
                  <div>Status:</div>
                  <div>{data.latestSurvey.status ? "Active" : "Draft"}</div>
                 </div>
                 <div className="flex justify-between text-sm mb-1">
                  <div>Question:</div>
                  <div>{data.latestSurvey.questions}</div>
                 </div>
                 <div className="flex justify-between text-sm mb-3">
                   <div>Réponse:</div>
                   <div>{data.latestSurvey.answers}</div>
                 </div>
                 <div className="flex justify-between">
                  <Tbutton to={`/survey/${data.latestSurvey.id}`}>
                  <span className='flex items-center'>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Editer
                    </span>
                  </Tbutton>
                  <Tbutton Link>
                  <Link to="">
                    <span className='flex items-center'>
                      <EyeIcon className="w-5 h-5 mr-2" />
                      Voir
                    </span>
                  </Link>
                  </Tbutton>
                 </div>
              </div>
              )}
              {!data.latestSurvey  &&(
                <div className="text-gray-600 text-center py-16">
                  Vous avez aucune création
                </div>
              )}
            </DashboardCard>
            <DashboardCard
            title="Latest Answers"
            className="order-4 lg:order-3 row-span-2" 
            >
              {data.latestAnswers.length && (
                <div className="text-left">
                {data.latestAnswers.map((answer) =>(
                <a 
                href="#"
                key={answer.id}
                className="block p-2 hover:bg-gray-100/90"
                >
                <div className="font-semibold">{answer.survey.title}</div>
                <Link to="">
                  <smail>
                    Répondu à : <i className="font-semibold">{answer.end_date}</i>
                  </smail>
                </Link>
                </a>
                ))}
                </div>
              )}
              {!data.latestAnswers.length && (
                <div className="text-gray-600 text-center py-16"
                >
                  Vous avez aucune reponse
                </div>
              )}
            </DashboardCard>
          </div>
        )}
      </PageComponent>
      <br />
    </div>
  )
}

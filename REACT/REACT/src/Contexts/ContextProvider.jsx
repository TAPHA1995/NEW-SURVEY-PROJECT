import { createContext, useState } from "react"
import { useContext } from "react"


const StateContext = createContext({
currentUser:{},
userToken: null,
survey:[],
questionType:[],
setCurrentUser: ()=>{}, 
setUserToken: ()=>{}
})

const tmpSurvey =[

    

//    {
//     "id": 1,
//     "titre_sondage": "Add your name in the body",
//     "reponse1": "Add your name in the body",
//     "reponse2": "Add your name in the body",
//     "reponse3": "Add your name in the body",   
//     "reponse4": "Add your name in the body",   
//     "reponse5": "Add your name in the body",
//    },
//    {
//     "id": 2,
//     "titre_sondage": "Add your name in the body",
//     "reponse1": "Add your name in the body",
//     "reponse2": "Add your name in the body",
//     "reponse3": "Add your name in the body",   
//     "reponse4": "Add your name in the body",   
//     "reponse5": "Add your name in the body",
//    },
//    {
//     "id": 3,
//     "titre_sondage": "Add your name in the body",
//     "reponse1": "Add your name in the body",
//     "reponse2": "Add your name in the body",
//     "reponse3": "Add your name in the body",   
//     "reponse4": "Add your name in the body",   
//     "reponse5": "Add your name in the body",
//    }
]


export const ContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');

    const [survey, setSurvey] = useState(tmpSurvey)
    const [questionTypes] = useState(['text', 'select', 'radio', 'checkbox','textarea'])

    const setUserToken = (token)=>{
     if (token) {
        localStorage.setItem('TOKEN', token)  
     }else{
        localStorage.removeItem('TOKEN')
     }
     _setUserToken(token);
    }

    return(
        <StateContext.Provider value= {{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            survey,
            questionTypes
         
        }}>
            {children}
        </StateContext.Provider>
        )
}
export const useStateContext = ()=>useContext(StateContext)
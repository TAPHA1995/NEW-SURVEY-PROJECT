import React from 'react'
import { useStateContext } from '../Contexts/ContextProvider'

export default function Toasts() {
    const {toast} = useStateContext()
  return (
    <div>
        {toast.show &&  
        <div className='bg-emerald-500 text-white py-1 px-2  fixed right-4 bottom-4 z-50 w-[250px] text-center animate-fade-in-right'>
            {toast.message}
        </div>
        }
    </div>
  )
}

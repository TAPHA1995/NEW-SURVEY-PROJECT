import React from 'react'

export default function PageComponent({title, buttons="", children}) {
  return (
    <div>
        <div className="bg-gray-100 Surveys flex justify-between text-black items-center">
            <h3>{title}</h3>
            {buttons}
        </div>
        <div>
        {children}
        </div>
    </div>
  )
}

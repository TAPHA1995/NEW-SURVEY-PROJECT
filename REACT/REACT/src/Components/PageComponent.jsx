import React from 'react'

export default function PageComponent({title, buttons="", children}) {
  return (
    <div>
        <div className=" flex justify-between text-black items-center mx-4">
            <h4>{title}</h4>
            {buttons}
        </div>
        <div>
        {children}
        </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom';

export default function Tbutton({
    color='indigo',
    to='',
    circle =false,
    href='',
    link='false',
    target = '_blank',
    onClick= ()=>{},
    children

}) {
    let classes =[
        "flex",
        "whitespace-nowrap",
        "text-sm",
        "border",
        "boder-2",
        "border-transparent",
    ];
    if (link){
        classes = [
            ...classes,
            "transition-colors",
        ];
        switch (color){
            case "indigo":
                classes =[
                    ...classes,
                    "text-indigo-500",
                    "focus:border-indigo-500",
                ];
                break;
                case "red":
                    classes = [...classes, "text-red-500", "focus:border-red-500"];
        }
    }else{
        classes =[
            ...classes,
            "text-white",
            "focus:ring-2",
            "focus:ring-offset-2",
        ];
        switch(color){
            case "indigo":
                classes = [
                    "bg-indigo-600",
                    "hover:bg-indigo-700",
                    "focus:ring-indigo-500",
                ];
                breack;
        }
    }

  return (
    <>
      {href && (<a href={href} className={classes.join("")} target={target}>{children}</a>)}
      {to && (<Link to={to} className={classes.join("")}>{children}</Link>)}
      {!to && !href && (<button onClick={onClick} className={classes.join("")}>{children}</button>)}
    </>
  )
}

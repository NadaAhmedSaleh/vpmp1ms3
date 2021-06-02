import React, { useState, createContext, useContext } from 'react'

import{GlobalMotionContext} from './GlobalMotionMethds'
import{GlobalLooksContext} from './GlobalLooksMethods'

import{GlobalEventsContext} from './GlobalEventsMethods'
import { BsReplyAll } from 'react-icons/bs'




export const AppStateContext = createContext()
//const{ changeXBy,changeYBy,balerina1X ,balerina1Y,setX,setY,gotoXY,balerinaRotation,turnBy,pointInDirection} = useContext(GlobalMotionContext)
  //  const { ballerinaSrc,switchCostumeTo,nextCostume,sayBalerinaText,sayBalerinaFlag,say,sayFor,sayOrthinkFlag,thinkFor,think} = useContext(GlobalLooksContext)

export const AppStateProvider = props => {
    

    // sprite:
    /*
    1-ben
    2-ball
    3-goalie
    4-balerina
    */


    //global variables
  
    const[code,setCode]=useState([])

    return (
        <AppStateContext.Provider value={{
             code,setCode}}>
            {props.children}
        </AppStateContext.Provider>
    )
}
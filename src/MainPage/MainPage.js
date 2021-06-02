import React, { Component } from 'react';
import { useEffect, useState,useContext  } from 'react';
import './MainPage.css';
import '../Balerina/Balerina.css'
import{SayComponent} from '../Look/Look';

import {BalerinaComponent} from '../Balerina/Balerina'
import {BsFlagFill} from 'react-icons/bs';

import  backDrop  from '../sprites photos/backdrop/Soccer 2.png';


import { AppStateContext } from '../AppGlobalState'
import{GlobalMotionContext} from '../GlobalMotionMethds'
import{GlobalLooksContext} from '../GlobalLooksMethods'

import{GlobalEventsContext} from '../GlobalEventsMethods'



function MainPage(props) {

    const { ballerinaSrc,switchCostumeTo,nextCostume,sayBalerinaText,sayBalerinaFlag,say,sayFor,sayOrthinkFlag,thinkFor,think} = useContext(GlobalLooksContext)
   const{ changeXBy,changeYBy,balerina1X ,balerina1Y,setX,setY,gotoXY,balerinaRotation,turnBy,pointInDirection} = useContext(GlobalMotionContext)

const{broadcast,recieve,messages} =useContext(GlobalEventsContext)




    return (
     <div className="main-page-container">

       <div className="stage-icon-container">
         <div className="main-stage-container">
           
         <img className="back-drop-photo" src={backDrop} alt="backDrop" />
         <BalerinaComponent balerina1X={balerina1X} balerina1Y={balerina1Y} balerinaRotation={balerinaRotation}
         ballerinaSrc={ballerinaSrc} sayBalerinaText={sayBalerinaText} sayOrthinkFlag={sayOrthinkFlag}
         sayBalerinaFlag={sayBalerinaFlag}/>
         
    
         </div>
         
         <div className="execute-icon-container" 
         onClick={(e)=>nextCostume(4)}
         ><BsFlagFill size="10em"/></div>

         </div>
     </div>
    
        
       
    );
}
 
export default MainPage
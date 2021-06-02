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
import{GlobalControlContext} from '../GlobalControlMethods'


function MainPage(props) {

    const { ballerinaSrc,switchCostumeTo,nextCostume,sayBalerinaText,sayBalerinaFlag,say,sayFor,sayOrthinkFlag,thinkFor,think,waitFor} = useContext(GlobalLooksContext)
   const{ changeXBy,changeYBy,balerina1X ,balerina1Y,setX,setY,gotoXY,balerinaRotation,turnBy,pointInDirection} = useContext(GlobalMotionContext)

const{broadcast,recieve,messages} =useContext(GlobalEventsContext)



const executeOneMethod=(arr,sprite)=>
{
   
    var head = arr[0]
    switch(head){
        // motion
         //[pointindirection,90]
        case "pointindirection":
          
          console.log("ok")
        var dir = parseInt(arr[1])
        console.log(dir)
        pointInDirection(dir,4)
        break;

        //[setx,3]
        case "setx":
        var x = parseInt(arr[1])
        setX(x,sprite)
        break;

        //[sety,-77]
        case "sety":
        var y = parseInt(arr[1])
        setY(y,sprite)
        break;

        //[gotoxy,-156,-18]
        case "gotoxy":
        var x = parseInt(arr[1])
        var y = parseInt(arr[2])
        gotoXY(x,y,sprite)
        break;

        //[turnleft,30] -ve direction
        case "turnleft":
        var dir = -parseInt(arr[1])
        turnBy(dir,sprite)
        break;

       // [changexby,5]
       case "changexby":
       var x = parseInt(arr[1])
       changeXBy(x,sprite)
       break;

       //[changeyby,1]
       case "changeyby":
       var y = parseInt(arr[1])
       changeYBy(y,sprite)
       break;
       

       //[nextcostume]
       case "nextcostume":
         console.log("here")
       nextCostume(4)
       break;

        //[switchcostumeto,ben-a]
        case "switchcostumeto":
        switchCostumeTo(arr[1],sprite)
        break;

      // [sayforsecs,opps,1.5]
      case "sayforsecs":
      var secs =  parseFloat(arr[2])
      sayFor(sprite,arr[1],secs)
      break;

        // [thinkforsecs,opps,1.5]
        case "thinkforsecs":
        var secs =  parseFloat(arr[2])
        thinkFor(sprite,arr[1],secs)
        break;

      //["say","gooo ben"]

      case "say":
        say(sprite,arr[1])
        break;

      //["think","hmmm"]
      case "think":
        think(sprite,arr[1])
        break;

       // ["wait","0.2"]

  case "wait":
    var secs =  parseFloat(arr[1])
        waitFor(secs)
        break;       
        // control

   //     ["repeat","10",[["nextcostume"],["wait","0.2"]]]
   case "repeat":
     var body = arr[2];
     for(var z = 0 ; z<parseInt( arr[1]) ;z++){
       console.log("hi")
        for(var m = 0 ; m<body.length;m++){
          console.log(body[m])
          executeOneMethod(body[m])
        }
     }

     break ;

    

    }}

   

    //[[nextcost],[nextcost]]

// when green flag // when key pressed // when recieve broadcast
    const executewhenflagclicked=(arr,sprite)=>{
     
      
    gotoXY(80,80,4)
     waitFor(2);
    say(4,"nada")
    
     
      
      console.log("there")
      //thinkFor(4,"hi",4)
     // gotoXY(40,40,4)
     /* console.log("greenflag")
      for (var i = 0 ; i<arr.length ;i++){
        console.log(arr[i])
        if(arr[i][0]=="forever"){
          var body = arr[i][1];
          while(true){
           for(var j = 0 ; j<body.length;j++){
            executeOneMethod(body[j],sprite)
           }
          }
          break ;
        }
        else{
          executeOneMethod(arr[i])
        }

      }
      */



    }
// key pressed 



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
         onClick={(e)=>executewhenflagclicked([["nextcostume"],["nextcostume"],["nextcostume"]],4)}
         ><BsFlagFill size="10em"/></div>

         </div>
     </div>
    
        
       
    );
}
 
export default MainPage
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
import { Switch } from 'react-router';




function MainPage(props) {

    const {ballerinaSrc,switchCostumeTo,nextCostume,sayBalerinaText,sayBalerinaFlag,say,sayFor,sayOrthinkFlag,thinkFor,think,
      sayBenText,sayBenflag,sayOrThinkBen,
      benSrc,ballSrc, goalieSrc} = useContext(GlobalLooksContext)
   const{ changeXBy,changeYBy,balerina1X ,balerina1Y,setX,setY,gotoXY,balerinaRotation,turnBy,pointInDirection,
    benY,benX,benRotation,
    goalieRotation,goalieX,goalieY,
  ballRotation,ballX,ballY,ballTouchGoalie,
  chekTwoSpritesTouching,gv} = useContext(GlobalMotionContext)

const{broadcast,recieve,messages} =useContext(GlobalEventsContext)

const{waitFor}= useContext(GlobalControlContext)


var ballTouchingGoalie = false
var benTouchingBall = false

useEffect(() => {
  checkIfBenTouchBall()
},[benX]);
useEffect(() => {
  checkIfBallTouchGoalie()
},[ballX]);
// 30 //39//65

const checkIfBenTouchBall=()=>{
if(benX<45&&benX>39){
  benTouchingBall= true;
}
else{
  benTouchingBall= false
}
}

const checkIfBallTouchGoalie=()=>{
  if(ballX<70&&ballX>60){
    ballTouchingGoalie = true
  }
  else{
    ballTouchingGoalie = false
  }

}

const executeOneMethod=async(arr,sprite)=>
{
   
    var head = arr[0]
    switch(head){
        // motion
         //[pointindirection,90]
        case "pointindirection":
          
          console.log("ok")
        var dir = parseInt(arr[1])
        console.log(dir)
       await pointInDirection(dir,4)
        break;

        //[setx,3]
        case "setx":
        var x = parseInt(arr[1])
        await  setX(x,sprite)
        break;

        //[sety,-77]
        case "sety":
        var y = parseInt(arr[1])
        await  setY(y,sprite)
        break;

        //[gotoxy,-156,-18]
        case "gotoxy":
        var x = parseInt(arr[1])
        var y = parseInt(arr[2])
        await    gotoXY(x,y,sprite)
        break;

        //[turnleft,30] -ve direction
        case "turnleft":
        var dir = -parseInt(arr[1])
        await turnBy(dir,sprite)
        break;

       // [changexby,5]
       case "changexby":
         console.log("changeby")
         console.log(sprite)
       var x = parseInt(arr[1])
       await changeXBy(x,sprite)
       break;

       //[changeyby,1]
       case "changeyby":
       var y = parseInt(arr[1])
       await changeYBy(y,sprite)
       break;
       

       //[nextcostume]
       case "nextcostume":
         console.log("here")
         await nextCostume(sprite)
       break;

        //[switchcostumeto,ben-a]
        case "switchcostumeto":
          await switchCostumeTo(arr[1],sprite)
        break;

      // [sayforsecs,opps,1.5]
      case "sayforsecs":
      var secs =  parseFloat(arr[2])
      await sayFor(sprite,arr[1],secs)
      break;

        // [thinkforsecs,opps,1.5]
        case "thinkforsecs":
        var secs =  parseFloat(arr[2])
        await thinkFor(sprite,arr[1],secs)
        break;

      //["say","gooo ben"]

      case "say":
        await say(sprite,arr[1])
        break;

      //["think","hmmm"]
      case "think":
        await think(sprite,arr[1])
        break;

       // ["wait","0.2"]

  case "wait":
    var secs =  parseFloat(arr[1])
    await waitFor(secs)
        break;       
        // control

   //     ["repeat","10",[["nextcostume"],["wait","0.2"]]]
   case "repeat":
    
    var body = arr[2];
     for(var z = 0 ; z<parseInt( arr[1]) ;z++){
      console.log("repeat")
       console.log("hi")
        for(var m = 0 ; m<body.length;m++){
          console.log(body[m])
       await   executeOneMethod(body[m],sprite)
        }
     }

     break ;
     // ["if",[["touchingobject","Ben"],["changexby","30"]]]
     case "if":
     var body = arr[1];
     if(chekTwoSpritesTouching(sprite,returnSpriteNum(body[0][1]))){
       console.log("if true")

       await executeOneMethod(body[1],sprite)
     }
     break;
// ["if_else",[["touchingobject","Soccer Ball"],["thinkforsecs","yarb goal","1.5"],["think","hmmm"]]]]]
case "if_else":
  var body = arr[1];
  if(chekTwoSpritesTouching(sprite,returnSpriteNum(body[0][1]))){
    console.log("if true")
    await executeOneMethod(body[1],sprite)
  }
  else{
    console.log("else true")
    await executeOneMethod(body[2],sprite)
  }
  break;
    }}

    const returnSpriteNum=(sprite)=>{
      switch(sprite){
        case "Ben":
          return 1;
          break;
        case "Soccer Ball":
          return 2;
          break;
        case "Goalie":
          return 3;
          break;
          default:
            return 4;
      }
    }

    const executeOneSequential = async(arr,sprite)=>{
     
      console.log("execute")
      for(var i = 1 ; i<arr.length ;i++){
        if(arr[i][0]=="forever"){
          while(true){
            for(var j = 0 ; j<arr[i][1].length;j++){
             
            await  executeOneMethod(arr[i][1][j],sprite)

            } 
            await waitFor(0.008)
            }
            
          }
          
          // 1- ben 2- ball 3- goalie
          // ["repeat_until",[["touchingobject","Goalie"],["changexby","5"],["changeyby","5"]]]

          else if ( arr[i][0]== "repeat_until"){
            console.log("repeat until")

            var body =arr[i][1]
            console.log(chekTwoSpritesTouching(sprite,returnSpriteNum(body[0][1])))
         
           while (! chekTwoSpritesTouching(sprite,returnSpriteNum(body[0][1]))){
              for ( var j = 1 ; j<body.length ;j++){
                await  executeOneMethod(body[j],sprite)
                await waitFor(0.3)
              }
            }
          }
          else if ( arr[i][0]== "wait_until"){
            console.log("wait_until")

            var body =arr[i][1]
           
            console.log(returnSpriteNum(body[0][1]))
           while (!chekTwoSpritesTouching(sprite,returnSpriteNum(body[0][1]))){    
                await  waitFor(0.01)
                console.log("wait until")
            }
            console.log("finish wait until")
          }
          // [ [],["if",[["touchingobject","Ben"],["changexby","30"]]]]
  
        else{
         await executeOneMethod(arr[i][1],sprite)
        }
      }
    }
    const executewhenflagclicked=async(arr,sprite)=>{
     

    }

 
const handleKeyPress =async (event) => {
  if(event.key === 'u'){
    for(var x = 0 ; x<15;x++){
    await changeXBy(10,1)
    await waitFor(0.2)
    }
  }
}





    return (
     <div className="main-page-container" onKeyPress={handleKeyPress} tabIndex="0">

       <div className="stage-icon-container"  >
       
         <div className="main-stage-container">
         <img className="back-drop-photo" src={backDrop} alt="backDrop" onKeyDown={(e)=>console.log("nada")} />

         <BalerinaComponent balerina1X={balerina1X} balerina1Y={balerina1Y} balerinaRotation={balerinaRotation}
         ballerinaSrc={ballerinaSrc} sayBalerinaText={sayBalerinaText} sayOrthinkFlag={sayOrthinkFlag}
         sayBalerinaFlag={sayBalerinaFlag} width={200} height={200}/>

       {/* ben*/}
        <BalerinaComponent balerina1X={benX} balerina1Y={benY} balerinaRotation={benRotation}
         ballerinaSrc={benSrc} sayBalerinaText={sayBenText} sayOrthinkFlag={sayOrThinkBen}
         sayBalerinaFlag={sayBenflag}width="100%" height="100%" width={200} height={200}/>

         {/*goalie*/}
         <BalerinaComponent balerina1X={goalieX} balerina1Y={goalieY} balerinaRotation={goalieRotation}
         ballerinaSrc={goalieSrc}width="100%" height="100%" width={200} height={200}/>

         {/*ball*/}
         <BalerinaComponent balerina1X={ballX} balerina1Y={ballY} balerinaRotation={ballRotation}
         ballerinaSrc={ballSrc}  width="50%" height="50%"width={130} height={130}/>

      
         </div>
         
         <div className="execute-icon-container" 
         onClick={(e)=>executeOneSequential([["whenflagclicked"],["forever",[["if_else",[["touchingobject","Soccer Ball"],["thinkforsecs","yarb goal","1.5"],["think","hmmm"]]]]]],1)}
         ><BsFlagFill size="10em"/></div>

         </div>
     </div>
    
        
       
    );
}
 
export default MainPage
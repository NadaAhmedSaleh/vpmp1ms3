import React, { Component } from 'react';
import { useEffect, useState,useContext  } from 'react';
import './MainPage.css';
import '../Balerina/Balerina.css'

import {BalerinaComponent} from '../Balerina/Balerina'


import {BsFlagFill} from 'react-icons/bs';

import {ImStop} from 'react-icons/im';

import  backDrop  from '../sprites photos/backdrop/Soccer 2.png';

import{GlobalMotionContext} from '../GlobalMotionMethds'
import{GlobalLooksContext} from '../GlobalLooksMethods'

import{GlobalEventsContext} from '../GlobalEventsMethods'

import{GlobalControlContext} from '../GlobalControlMethods'

import audio from '../sprites photos/backdrop/Chill.mp3';

import {getCode} from '../service'



function MainPage(props) {

    const {ballerinaSrc,switchCostumeTo,nextCostume,sayBalerinaText,sayBalerinaFlag,say,sayFor,sayOrthinkFlag,thinkFor,think,
      sayBenText,sayBenflag,sayOrThinkBen,
      benSrc,ballSrc, goalieSrc} = useContext(GlobalLooksContext)
   const{ changeXBy,changeYBy,balerina1X ,balerina1Y,setX,setY,gotoXY,balerinaRotation,turnBy,pointInDirection,
    benY,benX,benRotation,
    goalieRotation,goalieX,goalieY,
  ballRotation,ballX,ballY,ballPos , benPos,
  chekTwoSpritesTouching} = useContext(GlobalMotionContext)

const{broadcast,message} =useContext(GlobalEventsContext)

const{waitFor}= useContext(GlobalControlContext)


const [input,setInput]= useState([])



// connection to backend
const loadCOde=async()=>{
    var arr =await  getCode()
    console.log(arr)
    setInput(arr)
  }


  useEffect(()=>{
    loadCOde()
  },[]);


useEffect(() => {
  whenbroadcastreceived()
},[message]);




const playAudio =async () => {
  while(true){
  await new Audio(audio).play();
  await waitFor(8)

  }

}

const executeOneMethod=async(arr,sprite)=>
{
   
    var head = arr[0]
    switch(head){
      
         //[pointindirection,90]
        case "pointindirection":
          
        var dir = parseInt(arr[1])
       await pointInDirection(dir,sprite)
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
         /////// dont't forget to adjust this
      case "movesteps":
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
        for(var m = 0 ; m<body.length;m++){
       await   executeOneMethod(body[m],sprite)
        }
     }

     break ;
     // ["if",[["touchingobject","Ben"],["changexby","30"]]]
     case "if":
     var body = arr[1];
     if(chekTwoSpritesTouching(sprite,returnSpriteNum(body[0][1]))){
       await executeOneMethod(body[1],sprite)
     }
     break;
// ["if_else",[["touchingobject","Soccer Ball"],["thinkforsecs","yarb goal","1.5"],["think","hmmm"]]]]]
case "if_else":
  var body = arr[1];
  if(chekTwoSpritesTouching(sprite,returnSpriteNum(body[0][1]))){
    await executeOneMethod(body[1],sprite)
  }
  else{
    await executeOneMethod(body[2],sprite)
  }
  break;

  // ["broadcast","mshgoal"]
  case "broadcast":
  await broadcast(arr[1])
  break;

    }}

    const returnSpriteNum=(sprite)=>{
      switch(sprite){
        case "Ben":
          return 1;
    
        case "Soccer Ball":
          return 2;
     
        case "Goalie":
          return 3;

          default:
            return 4;
      }
    }

    const executeOneSequential = async(arr,sprite)=>{
     
      for(var i = 1 ; i<arr.length ;i++){
        if(arr[i][0]=="forever"){
        
          while(true){
            for(var j = 0 ; j<arr[i][1].length;j++){
             
            await  executeOneMethod(arr[i][1][j],sprite)

            } 
            await waitFor(0.08)
            }
            
          }
          
          // 1- ben 2- ball 3- goalie
          // ["repeat_until",[["touchingobject","Goalie"],["changexby","5"],["changeyby","5"]]]

          else if ( arr[i][0]== "repeat_until"){

            var body =arr[i][1]
         
           while (! chekTwoSpritesTouching(sprite,returnSpriteNum(body[0][1]))){
              for ( var j = 1 ; j<body.length ;j++){
                await  executeOneMethod(body[j],sprite)
                await waitFor(0.01)
              }
            }
          }
          else if ( arr[i][0]== "wait_until"){

            var body =arr[i][1]
           
           while (!chekTwoSpritesTouching(sprite,returnSpriteNum(body[0][1]))){    
                await  waitFor(0.01)
            }
          }
  
        else{
         await executeOneMethod(arr[i],sprite)
        }
      }
    }
    const executewhenflagclicked=async()=>{
     
playAudio();
      for (var i = 0 ; i<input.length;i++){

        var tempBlocks = input[i];
        var sprite = returnSpriteNumFromArray(tempBlocks[0])

        for (var j = 1; j<tempBlocks.length ;j++){


          if(tempBlocks[j][0][0]=="whenflagclicked")
          executeOneSequential(tempBlocks[j],sprite)  }
       }
       }

    const whenbroadcastreceived=async()=>{
      
  
        console.log(message)
      
      for (var i = 0 ; i<input.length;i++){

        var tempBlocks = input[i];
        var sprite = returnSpriteNumFromArray(tempBlocks[0])

        for (var j = 1; j<tempBlocks.length ;j++){


          if(tempBlocks[j][0][0]=="whenbroadcastreceived"&&message==tempBlocks[j][0][1])
{
         await executeOneSequential(tempBlocks[j],sprite) 
         
 

  }  

      }}
       }
    

    const returnSpriteNumFromArray=(head)=>{
      switch(head){
      case "New Sprite:Ben#\n":
        return 1;
  
      case "New Sprite:Soccer Ball#\n":
        return 2;

      case "New Sprite:Goalie#\n":
        return 3;

      case "New Sprite:Ballerina#\n":
        return 4;
  
      case "New Sprite:Ballerina2#\n":
      case "New Sprite:Ballerina3#\n":
        return 0 ;


      }
    }
 
const handleKeyPress =async (event) => {
  
  if(event.key === 'u'){
    
   
  for (var i = 0 ; i<input.length;i++){

    var tempBlocks = input[i];
    var sprite = returnSpriteNumFromArray(tempBlocks[0])

    for (var j = 1; j<tempBlocks.length ;j++){
    
      
      if(tempBlocks[j][0][0]=="whenkeypressed"){
      executeOneSequential(tempBlocks[j],sprite)

      }
    }
  }

  }

}



    return (
     <div className="main-page-container" onKeyPress={handleKeyPress} tabIndex="0">

       <div className="stage-icon-container"  >
       
         <div className="main-stage-container">
         <img className="back-drop-photo" src={backDrop} alt="backDrop"  />

{/* balerinas */}
         <BalerinaComponent balerina1X={balerina1X+15} balerina1Y={balerina1Y} balerinaRotation={balerinaRotation}
         ballerinaSrc={ballerinaSrc} sayBalerinaText={sayBalerinaText} sayOrthinkFlag={sayOrthinkFlag}
         sayBalerinaFlag={sayBalerinaFlag} width={200} height={200}/>

       <BalerinaComponent balerina1X={balerina1X} balerina1Y={balerina1Y} balerinaRotation={balerinaRotation}
         ballerinaSrc={ballerinaSrc} sayBalerinaText={sayBalerinaText} sayOrthinkFlag={sayOrthinkFlag}
         sayBalerinaFlag={sayBalerinaFlag} width={200} height={200}/>

       <BalerinaComponent balerina1X={balerina1X-15} balerina1Y={balerina1Y} balerinaRotation={balerinaRotation}
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
         
         <div className="buttons-container">
         <div className="execute-icon-container" 
         onClick={(e)=>executewhenflagclicked()}
         ><BsFlagFill size="10em"/></div>

         <div className="stop-icon-container" onClick={(e)=>window.location.reload()}>
           <ImStop size="8em"/>

         </div>
         </div>

         </div>
     </div>
    
        
       
    );
}
 
export default MainPage
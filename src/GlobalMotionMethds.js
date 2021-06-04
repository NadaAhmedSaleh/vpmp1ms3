import React, {useEffect, useState, createContext, useContext } from 'react'
import update from 'react-addons-update';


export const GlobalMotionContext = createContext()
export const GlobalMotionProvider = props => {

    const[balerina1X,setBalerina1X]= useState(30)
    const[balerina1Y,setBalerina1Y]= useState(15)
    const[ballX,setBallX]= useState(39)
    const[goalieX,setGoalieX]= useState(65)
    const[ballY,setBallY]= useState(45)
    const[goalieY,setGoalieY]= useState(30)
    const[benY,setBenY]= useState(30)
    const[benX,setBenX]= useState(5)
    const[balerinaRotation,setBalerinaRotation] = useState(0)
    const[benRotation,setBenRotation] = useState(0)
    const[goalieRotation,setgoalieRotation] = useState(0)
    const[ballRotation,setBallRotation] = useState(0)


    const [ballTouchGoalie,setBallTouchGoalie]= useState(false)

  var ballPos = 39
  var benPos = 30

  // sprite:
    /*
    1-ben
    2-ball
    3-goalie
    4-balerina
    */

    // change x ( number of steps)
    const changeYBy=(value,sprite)=>{
        switch(sprite) {
          case 2:
            if((ballY>60&&value<0)||(ballY<0&&value>0)){
              value=0;
          }
          else{
          setBallY(ballY=>(ballY+(-value*100/480)))
          }
        break;

            case 4:
                if((balerina1Y>60&&value<0)||(balerina1Y<0&&value>0)){
                    value=0;
                }
                else{
                setBalerina1Y(balerina1Y=>(balerina1Y+(-value*100/480)))
                }
              break;
            case 6:
              // code block
              break;
            default:
              // code block
          }
    }

    const changeXBy=(value,sprite)=>{
        switch(sprite) {

          case 1:{
            
            if(chekTwoSpritesTouching(1,2)){
            }
            if((benX>80&&value>0)||(benX<0&&value<0)){
              value=0;
          }
          else{
            setBenX(benX=>
              {
                benPos = benX
                return benX+(value*100/400)})
           } }

          break;
          case 2:{
            
            if(chekTwoSpritesTouching(3,2)){
            }
            if((ballX>80&&value>0)||(ballX<0&&value<0)){
              value=0;
          }
          else{
            setBallX(ballX=>{ballPos= ballX
             return ballX+(value*100/400)}
            )
          }
          }

          break;
            case 4:{

                if((balerina1X>80&&value>0)||(balerina1X<0&&value<0)){
                    value=0;
                }
                else{
                  setBalerina1X(balerina1X=>balerina1X+(value*100/400))
                }
            }



            
              break;
            case 6:
              // code block
              break;
            default:
              // code block
          }
    }

    // set x and y
        const setX=(value,sprite)=>{
            value = 40+ (value*100/480);
            if(value>80)
            value=80
            if(value<0)
            value=0
            switch(sprite) {
              case 2:
                setBallX(value)
                break;
                case 4:
                    setBalerina1X(value)
                  break;
                case 6:
                  // code block
                  break;
                default:
                  // code block
              }
        }

        
      const setY=(value,sprite)=>{
        value = 30+ (-value*100/480);
        if(value>60)
        value=60
        if(value<0)
        value=0
        switch(sprite) {
          case 2:
          setBallY(value)
          break;
            case 4:
                setBalerina1Y(value)
              break;
            case 6:
              // code block
              break;
            default:
              // code block
          }
    }
    const gotoXY=(valuex,valuey,sprite)=>{
    
      valuex = 40+ (valuex*100/480);
      valuey = 30+ (-valuey*100/480);
      if(valuey>60)
      valuey=60
      if(valuey<0)
      valuey=0
      if(valuex>80)
      valuex=80
      if(valuex<0)
      valuex=0
      switch(sprite) {
        case 1:
          setBenX(valuex)
          setBenY(valuey)
          break;
          case 4:
              setBalerina1Y(valuey)
              setBalerina1X(valuex)
            break;
          case 6:
            // code block
            break;
          default:
            // code block
        }
  }

  const turnBy=(value ,sprite)=>{

    switch(sprite) {
      case 1:
        setBenRotation(benRotation=>(benRotation+value))
        break;
      case 4:
          setBalerinaRotation(balerinaRotation=>(balerinaRotation+ value))
        break;
      case 6:
        // code block
        break;
      default:
        // code block
    }
  }

  const pointInDirection=(value ,sprite)=>{
value = value -90
    switch(sprite) {
      case 1:
        setBenRotation(value)
        break;
      case 2:
        setBallRotation(value)
        break;
      case 4:
          setBalerinaRotation(value)
        break;
      case 6:
        // code block
        break;
      default:
        // code block
    }
  }

  const getCoordinates=(sprite)=>{
  // sprite:
    /*
    1-ben
    2-ball
    3-goalie
    4-balerina
    */
   switch(sprite){
     case 1:
       return [benPos,benY]
     case 2:
       return [ballPos,ballY]
     case 3:
       return [goalieX,goalieY]
    case 4:
      return [balerina1X,balerina1Y]
      default:
        return []
    
   }
  }

  const chekTwoSpritesTouching=(sprite1 ,sprite2)=>{
  var sprite1Arr= getCoordinates(sprite1)
  var sprite2Arr= getCoordinates(sprite2)
    var x1 = sprite1Arr[0]
    var x2 = sprite2Arr[0]
    if (x2>x1-6 &&x2<x1+6)
    return true
    else
    return false

  }
    return (
        <GlobalMotionContext.Provider value={{
            changeXBy,balerina1X,balerina1Y,changeYBy,setX,setY,gotoXY,balerinaRotation,turnBy,pointInDirection,setBalerina1X,setBalerina1Y,
            ballX,setBallX,benX,setBenY,goalieX,setGoalieX,ballY,setBallY,benY,setBenY,goalieY,setGoalieY,
            benRotation,setBenRotation,goalieRotation,setgoalieRotation,ballRotation,setBallRotation,
            chekTwoSpritesTouching,ballTouchGoalie,ballPos , benPos
             }}>
            {props.children}
        </GlobalMotionContext.Provider>
    )
}
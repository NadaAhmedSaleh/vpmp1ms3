import React, { useState, createContext, useContext } from 'react'



export const GlobalMotionContext = createContext()
export const GlobalMotionProvider = props => {

    const[balerina1X,setBalerina1X]= useState(40)
    const[balerina1Y,setBalerina1Y]= useState(30)
    const[balerinaRotation,setBalerinaRotation] = useState(0)

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
            case 4:
                if((balerina1Y>60&&value<0)||(balerina1Y<0&&value>0)){
                    value=0;
                }
                else{
                setBalerina1Y(balerina1Y+(-value*100/480))
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
            case 4:{

                if((balerina1X>80&&value>0)||(balerina1X<0&&value<0)){
                    value=0;
                }
                else{
                setBalerina1X(balerina1X+(value*100/480))
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
      console.log("hooooo")
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
      case 4:
          setBalerinaRotation(balerinaRotation+ value)
        break;
      case 6:
        // code block
        break;
      default:
        // code block
    }
  }

  const pointInDirection=(value ,sprite)=>{

    switch(sprite) {
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
    return (
        <GlobalMotionContext.Provider value={{
            changeXBy,balerina1X,balerina1Y,changeYBy,setX,setY,gotoXY,balerinaRotation,turnBy,pointInDirection
             }}>
            {props.children}
        </GlobalMotionContext.Provider>
    )
}
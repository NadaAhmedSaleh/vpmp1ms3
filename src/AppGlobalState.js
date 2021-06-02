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
   /*
   [[[whenflagclicked],[forever,[repeat,10,[[nextcostume],[wait,0.2]]],[wait,2]],[whenbroadcastreceived,mshgoal],[sayforsecs,opps,1.5],[whenbroadcastreceived,lsa],[say,gooo ben]],
[[whenflagclicked],[forever,[if_else,[[touchingobject,Soccer Ball],[thinkforsecs,[yarb goal,1.5]],[think,hmmm]]]],[whenkeypressed,up arrow],[pointindirection,90],[switchcostumeto,ben-a],[gotoxy,[-156,-18]],[repeat_until,[touchingobject,Soccer Ball],[movesteps,10]],[turnleft,30],[nextcostume],[wait,1.5],[gotoxy,[-156,-18]],[pointindirection,90],[switchcostumeto,ben-d]]
[[whenkeypressed,up arrow],[pointindirection,90],[setx,3],[sety,-77],[wait_until,[touchingobject,Ben]],[repeat_until,[[touchingobject,Goalie],[changexby,5],[changeyby,1]]],[wait,1],[setx,3],[sety,-77],[forever,[if,[[touchingobject,Ben],[broadcast,ballhit]]]]]
[[whenflagclicked],[forever,[if_else,[[touchingobject,Soccer Ball],[broadcast,mshgoal],[broadcast,lsa]]]],[whenbroadcastreceived,ballhit],[nextcostume],[wait,0.2]]]
*/

/*
const executeOneMethod=(arr,sprite)=>
{
   
    var head = arr[0]
    switch(head){
        // motion
         //[pointindirection,90]
        case "pointindirection":
        var dir = parseInt(arr[1])
        pointInDirection(dir,sprite)
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

        //[gotoxy,[-156,-18]
        case "gotoxy":
        var x = parseInt(arr[1][0])
        var y = parseInt(arr[1][1])
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
       nextCostume(sprite)
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

        // [sayforsecs,opps,1.5]
        case "sayforsecs":
            var secs =  parseFloat(arr[2])
            sayFor(sprite,arr[1],secs)
            break;

       
        // control


    

    }

}*/



    //global variables
  
    const[code,setCode]=useState([])

    return (
        <AppStateContext.Provider value={{
             code,setCode}}>
            {props.children}
        </AppStateContext.Provider>
    )
}
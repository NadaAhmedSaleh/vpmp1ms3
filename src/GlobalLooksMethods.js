import React, { useState, createContext, useContext } from 'react'



export const GlobalLooksContext = createContext()
export const GlobalLooksProvider = props => {

  // belerina
      const[ballerinaSrc,setBallerinaSrc] = useState('ballerina-a.svg')
      const[ballerinaCostumes,setBalerinaCostumes]= useState(['ballerina-a.svg','ballerina-b.svg','ballerina-c.svg','ballerina-d.svg'])
  
      const[sayBalerinaText,setSayBalerinaText]= useState("")
      const[sayBalerinaFlag,setSayBalerinaFlag]= useState(false)
      const[sayOrthinkFlag,setsayOrthinkFlag]= useState(false)

      // ball

      const[ballSrc,setBallSrc] = useState('soccer ball.svg')

      // goalie
  
      const[goalieSrc,setgoalieSrc] = useState('goalie-a.svg')
      const[goalieCostumes,setgoalieCostumes]= useState(['goalie-a.svg','goalie-b.svg','goalie-c.svg','goalie-d.svg'])


      // ben 

      const[benSrc,setBenSrc] = useState("ben-d.svg")
      const[benCostumes,setBenCostumes]= useState(['ben-a.svg','ben-b.svg','ben-c.svg','ben-d.svg'])

      const[sayBenText,setSayBenText]= useState("")
      const[sayOrThinkBen,setsayOrThinkBen]= useState(false)
      const[sayBenflag,setsayBenflag]= useState(false)
  
    

  // sprite:
    /*
    1-ben
    2-ball
    3-goalie
    4-balerina
    */

    const switchCostumeTo=(costume,sprite)=>{
        switch(sprite) {
           case 1:
             setBenSrc(costume+".svg")
              break;
            case 4:
                setBallerinaSrc(costume+".svg")
              break;
            case 6:
              // code block
              break;
            default:
              // code block
          }
    }
    const nextCostume=(sprite)=>{
        switch(sprite) {
          case 1:{
            setBenSrc(benSrc=>{
              var currentIndx = benCostumes.indexOf(benSrc) +1;
              if(currentIndx> benCostumes.length-1)
              currentIndx=0
              return benCostumes[currentIndx]
            } 
            )

          }
          break;
          case 3:{
            setgoalieSrc(goalieSrc=>{
              var currentIndx = goalieCostumes.indexOf(goalieSrc) +1;
              if(currentIndx> goalieCostumes.length-1)
              currentIndx=0
              return goalieCostumes[currentIndx]
            } 
            )

          }
          break;
            case 4:{
            
            

              setBallerinaSrc(ballerinaSrc=>{
                var currentIndx = ballerinaCostumes.indexOf(ballerinaSrc) +1;
                if(currentIndx> ballerinaCostumes.length-1)
                currentIndx=0
                return ballerinaCostumes[currentIndx]
              } 
              )

            }
              break;
            case 6:
              // code block
              break;
            default:
              // code block
          }
    }
   
    const say=(sprite,text)=>{

        switch(sprite) {
            case 4:{
                setSayBalerinaText(text)
                setSayBalerinaFlag(true)
                setsayOrthinkFlag(true)


            }
              break;
            case 6:
              // code block
              break;
            default:
              // code block
          }
    }
   


    
    const  sayFor= async(sprite,text,time)=>{

        switch(sprite) {
            case 4:{
               await setsayOrthinkFlag(true)
               await setSayBalerinaText(text)
               await setSayBalerinaFlag(true)

               await   new Promise(resolve => {
                setTimeout(() => {
                  resolve('resolved');
                }, time*1000);
              });
               await setSayBalerinaFlag(false)
               await setsayOrthinkFlag(false)

            }
              break;
            case 6:
              // code block
              break;
            default:
              // code block
          }
    }

   
    const  thinkFor= async(sprite,text,time)=>{

        switch(sprite) {
          case 1:
            {
              await setsayOrThinkBen(true)
               await setSayBenText(text)
               await setsayBenflag(false)
               await   new Promise(resolve => {
                 setTimeout(() => {
                   resolve('resolved');
                 }, time*1000);
               });
              await  setsayBenflag(false)
             await  setsayOrThinkBen(false)

           }
            break;
            case 4:{
               await setsayOrthinkFlag(true)
                await setSayBalerinaText(text)
                await setSayBalerinaFlag(false)
                await   new Promise(resolve => {
                  setTimeout(() => {
                    resolve('resolved');
                  }, time*1000);
                });
               await  setSayBalerinaFlag(false)
              await  setsayOrthinkFlag(false)

            }
              break;
            case 6:
              // code block
              break;
            default:
              // code block
          }
    }
   


    const  think= async(sprite,text)=>{

        switch(sprite) {
          case 1:{
            setsayOrThinkBen(true)
            setSayBenText(text)
            setsayBenflag(false)

          }
            break;
            case 4:{
                setsayOrthinkFlag(true)
                setSayBalerinaText(text)
                setSayBalerinaFlag(false)


            }
              break;
            case 6:
              // code block
              break;
            default:
              // code block
          }
    }




    return (
        <GlobalLooksContext.Provider value={{ballerinaSrc,switchCostumeTo,nextCostume,sayBalerinaText,sayBalerinaFlag,say,
            sayFor,sayOrthinkFlag,setsayOrthinkFlag,sayBalerinaFlag,thinkFor,think,
            benSrc, ballSrc, goalieSrc ,sayOrThinkBen,sayBenText,sayBenflag
             }}>
            {props.children}
        </GlobalLooksContext.Provider>
    )
}
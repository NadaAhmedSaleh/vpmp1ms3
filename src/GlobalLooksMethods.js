import React, { useState, createContext, useContext } from 'react'



export const GlobalLooksContext = createContext()
export const GlobalLooksProvider = props => {

    const[ballerinaSrc,setBallerinaSrc] = useState('ballerina-a.svg')
    const[ballerinaCostumes,setBalerinaCostumes]= useState(['ballerina-a.svg','ballerina-b.svg','ballerina-c.svg','ballerina-d.svg'])

    const[sayBalerinaText,setSayBalerinaText]= useState("")
    const[thinkBalerinaText,setThinkBalerinaText]= useState("")

    const[sayBalerinaFlag,setSayBalerinaFlag]= useState(false)
    const[sayOrthinkFlag,setsayOrthinkFlag]= useState(false)


  // sprite:
    /*
    1-ben
    2-ball
    3-goalie
    4-balerina
    */

    const switchCostumeTo=(costume,sprite)=>{
        switch(sprite) {
            case 4:
                setBallerinaSrc(costume)
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
            case 4:{
                var currentIndx = ballerinaCostumes.indexOf(ballerinaSrc) +1;
                if(currentIndx> ballerinaCostumes.length-1)
                currentIndx=0
               setBallerinaSrc(ballerinaCostumes[currentIndx])
               

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
   

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    
    const  sayFor= async(sprite,text,time)=>{

        switch(sprite) {
            case 4:{
                setsayOrthinkFlag(true)
                setSayBalerinaText(text)
                setSayBalerinaFlag(true)

                await timeout(time*1000);
                setSayBalerinaFlag(false)
                setsayOrthinkFlag(false)

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
            case 4:{
                setsayOrthinkFlag(true)
                setSayBalerinaText(text)
                setSayBalerinaFlag(false)

                await timeout(time*1000);
                setSayBalerinaFlag(false)
                setsayOrthinkFlag(false)

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

    function timeout(delay) {
      return new Promise( res => setTimeout(res, delay) );
  }

  const  waitFor=async(time)=>{
    console.log("before")
    syncDelay(time*1000);
    console.log("after")
   //   console.log("hnaa")
    //  timeout(time)
  }
  function writeNext(i)
{
    setTimeout(function()
    {
       console.log("here");
    }, i);
}

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
  function syncDelay(milliseconds){
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }
   }
   
   function sleep1(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }



 function sleep2(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
 }
 
 async function demo() {
   console.log('Taking a break...');
   await sleep(2000);
   console.log('Two seconds later, showing sleep in a loop...');
 
   // Sleep in loop
   for (let i = 0; i < 5; i++) {
     if (i === 3)
       await sleep(2000);
     console.log(i);
   }
 }
 
/*
 function writeNext(i)
 {
     document.write(i);
 
     if(i == 5)
         return;
 
     setTimeout(function()
     {
         writeNext(i + 1);
 
     }, 2000);
 }
 
 writeNext(1);*/

    return (
        <GlobalLooksContext.Provider value={{ballerinaSrc,switchCostumeTo,nextCostume,sayBalerinaText,sayBalerinaFlag,say,
            sayFor,sayOrthinkFlag,setsayOrthinkFlag,sayBalerinaFlag,thinkFor,think,waitFor
             }}>
            {props.children}
        </GlobalLooksContext.Provider>
    )
}
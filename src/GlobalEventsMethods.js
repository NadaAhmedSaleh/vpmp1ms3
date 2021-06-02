import React, { useState, createContext, useContext } from 'react'



export const GlobalEventsContext = createContext()
export const GlobalEventsProvider = props => {




  // sprite:
    /*
    1-ben
    2-ball
    3-goalie
    4-balerina
    */

    // messages 
    const [messages,setMessages] = useState(["nada","nada100","nada"])


    // broadcast
    const broadcast=(message)=>{
        messages.push(message)
        setMessages([...messages,...[message]])
    }
    // recieve
    const recieve=(message)=>{
        
        let filteredArray = messages.filter(item => item !== message)
        setMessages(filteredArray)
       
    }


    return (
        <GlobalEventsContext.Provider value={{broadcast,recieve,messages
             }}>
            {props.children}
        </GlobalEventsContext.Provider>
    )
}
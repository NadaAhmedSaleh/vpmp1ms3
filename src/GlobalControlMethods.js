import React, { useState, createContext, useContext } from 'react'



export const GlobalControlContext = createContext()
export const GlobalControlProvider = props => {




  // sprite:
    /*
    1-ben
    2-ball
    3-goalie
    4-balerina
    */

    
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const  waitFor= async(time)=>{
        timeout(time)
    }



    return (
        <GlobalControlContext.Provider value={{waitFor
             }}>
            {props.children}
        </GlobalControlContext.Provider>
    )
}
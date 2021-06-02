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

    
  



    return (
        <GlobalControlContext.Provider >
            {props.children}
        </GlobalControlContext.Provider>
    )
}
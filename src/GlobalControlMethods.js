import React, { useState, createContext, useContext } from 'react'



export const GlobalControlContext = createContext()
export const GlobalControlProvider = props => {


    function waitFor(seconds) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, seconds*1000);
        });
      }


    return (
        <GlobalControlContext.Provider value={{ waitFor
             }}>
            {props.children}
        </GlobalControlContext.Provider>
    )
}
import React from 'react';
import { Switch, Route } from 'react-router';
import MainPage from '../src/MainPage/MainPage'
import { AppStateProvider } from './AppGlobalState';
import {GlobalMotionProvider} from './GlobalMotionMethds';
import{GlobalLooksProvider} from './GlobalLooksMethods';
import{GlobalEventsProvider} from './GlobalEventsMethods'
import{GlobalControlProvider} from './GlobalControlMethods'

export default class App extends React.Component {
  

    render() {
        return (
            <div >
            <AppStateProvider>
  
                    <GlobalMotionProvider>
                        <GlobalLooksProvider>
                                <GlobalEventsProvider>
                                    <GlobalControlProvider>
                <Switch>
                <Route exact path='/' component={MainPage}/>
                 </Switch>
                 </GlobalControlProvider>
                 </GlobalEventsProvider>
                 </GlobalLooksProvider>
                 </GlobalMotionProvider>
            </AppStateProvider>
            </div>
            
        );
    }
}
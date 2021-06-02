import React from 'react';
import { Switch, Route } from 'react-router';
import MainPage from '../src/MainPage/MainPage'
import { AppStateProvider } from './AppGlobalState';
import {GlobalMotionProvider} from './GlobalMotionMethds';
import{GlobalLooksProvider} from './GlobalLooksMethods';
import{GlobalControlProvider} from './GlobalControlMethods';
import{GlobalEventsProvider} from './GlobalEventsMethods'

export default class App extends React.Component {
  

    render() {
        return (
            <div>
            <AppStateProvider>
  
                    <GlobalMotionProvider>
                        <GlobalLooksProvider>
                            <GlobalControlProvider>
                                <GlobalEventsProvider>
                <Switch>
                <Route exact path='/' component={MainPage}/>
                 </Switch>
                 </GlobalEventsProvider>
                 </GlobalControlProvider>
                 </GlobalLooksProvider>
                 </GlobalMotionProvider>
            </AppStateProvider>
            </div>
            
        );
    }
}
import React, {Component} from 'react';
import { View, TouchableOpacity,Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Conversation from './screens/conversation';
import SplashScreeen from './screens/splashscreen'

class Route extends Component{
  render(){
    return(
      <RootStack />
    );
  }
}
 const RootStack = createStackNavigator(
   {
     ConversationScreen : {
       screen : Conversation,
     },
     SplashScreeen : {
       screen : SplashScreeen,
       navigationOptions : {
         header: null,
       }
     }
   },
   {
     initialRouteName: 'SplashScreeen',
     headerMode: 'screen'
   }
 )

export default Route

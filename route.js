import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';

import Conversation from './screens/conversation';

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
       screen : Conversation
     },
   },
   {
     initialRouteName: 'ConversationScreen',
     navigationOptions: {
       title : 'Railways Agent'
     }
   }
 )

export default Route

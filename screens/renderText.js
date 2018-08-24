import React, {Component} from 'react';
import { Text, View, StyleShee, Image } from 'react-native';
import {styles} from './message_style'

export const renderUserText = (item) => {
  return(
    <View style = { styles.MessageContainerUser }>
      <View>
        <Image style = {{height:40,width:40}} source = { require('./Username.png') } />
      </View>
      <View style = {styles.MessageView}>
        <Text style = { styles.MessageText } >{item.item.data}</Text>
      </View>
    </View>
  );
}

export const renderWelcomeText = (item) => {
  return(
    <View style = { styles.MessageContainerBot } >
      <View>
        <Image style = {{height:40,width:40}} source = { require('./train.png') } />
      </View>
      <View style = {styles.MessageView}>
        <Text style = { styles.MessageText } >{item.item.queryResult.fulfillmentText}</Text>
      </View>
    </View>
  );
}

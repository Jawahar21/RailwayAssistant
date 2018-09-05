import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { styles } from './message_style'
import UserLogo from './userLogo'
import TrainLogo from './TrainLogo'

export const renderUserText = (item) => {
  return(
    <View style = { styles.MessageContainerUser }>
      <UserLogo />
      <View style = { styles.MessageView } >
        <Text style = { styles.MessageText } >{item.item.data}</Text>
      </View>
    </View>
  );
}

export const renderWelcomeText = (item) => {
  return(
    <View style = { styles.MessageContainerBot } >
      <TrainLogo />
      <View style = { styles.MessageView }>
        <Text style = { styles.MessageText } >{item.item.queryResult.fulfillmentText}</Text>
      </View>
    </View>
  );
}

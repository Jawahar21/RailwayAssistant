import React, {Component} from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create(
  {
    MessageContainerUser : {
      padding : 10,
      flexDirection: 'row',
      justifyContent : 'flex-start',
      alignItems : 'center',
    },
    MessageContainerBot : {
      padding : 10,
      flexDirection: 'row',
      justifyContent : 'flex-start',
      alignItems : 'center',
      backgroundColor : '#e0ffff',
    },
    MessageText : {
      fontSize : 18,
      color : '#000000',
      flexWrap: 'wrap'
    },
    MessageView : {
      paddingLeft : 10,
      paddingRight : 20
    },
    iconStyle : {
      height : 30,
      width : 30,
    }
  }
)

import React, {Component} from 'react';
import { Text, View,KeyboardAvoidingView,StyleSheet,TextInput } from 'react-native';
import { Dialogflow_V2 } from "react-native-dialogflow"
import { Welcome } from './Activities/RailwayActivities'


class Conversation extends Component{

  constructor(){
    super()
    this.state = {
      userQuery : '',
    }
  }

  componentDidMount(){
    Dialogflow_V2.setConfiguration(
            "react-native-app-integration@railwayassistant-977e1.iam.gserviceaccount.com",
            '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCbujEv4oTsYaEW \
            \nO3Y5YRhsK9+SIkcjTQoMFb/WRGVDT+oxV1iCEfYMv09pHvFOMps2LN626I200duS\
            \nLRI2XV4gM+0ax8zUuAs9ZS5LsBdrMpaoUJgTlDOMkOjUN3UIxV/jlDz0pk9iK27o\
            \nFjuGYeAWv9qtwyvTkp5s3X1u/WW9giauTHrE2eJHwqYUT+8ke9knLJfh2yPC3FI9\
            \nbGsEhSgT6knCnGfwbgHzD18IEiynGWOPEHhY7iSm0M3b6tyMil4GRNtr1Upk0A1f\
            \nwMbVeP6oMIuZrqWzW6CUF7ZtuIjiGxaVclQtq4hyaMCBvwTr0jAfRfbcWLpNruio\
            \nEDXmxfQpAgMBAAECggEAQg077rEYK0EPt+PZteXCm6MSTaP/Y3A6SjzxZPsWrnHX\
            \nhj0jm\
            +vtXqPIlXBb7oyVe+mVP6Ss8lyu0rYOSwPYODV+JMVJUpKLpetkMxNKI5xN\
            \n/a9NicRrBvyx3M129RTuopNONYDTG/MLNCK19b5O86dFpD0rui4ux0M9AFY3kKTZ\
            \nSQXSU4AhRO8MVNY37FqlUMxRmXQwnL/JSKQZUbvyIM/4z36TAtPu2xbm6daMV2f4\
            \nRcDdGRfXw2FGcnVmE105V35056o38EBWwGxguMOuUFih4YQI3lECgDPSstS3VUf2\
            \nmn2UWrgbVsxRaG0fjRV87ERHCRdh1RemJwXT29N61wKBgQDX4zspVEaY7XSdxf/P\
            \nje9zPalJVbs5bdnrgpVTGFS2bT5Ho3lvg/d8gXe6bkx1LppmW2dszxZ3zh3KBjRY\
            \nBFF6KwIMSvOY8TgIhVB/vpMumFTNCKYlBKJ1NzmLP8hS+vRFpktiSbQLjBOZSbRo\
            \nQeqLg02zA7uSqlWEWahSns46mwKBgQC4qWpQrU/oWn/5ELg6tsDW/bVBWjA0zz4t\
            \n+iphK\
            +4ZqoVCIwwNd9w13686dsphLt0REbQr5XMU4Q1Jp3lCumSCP31JFpWUo9gg\
            \nQOzFFTC0D3HHOzTXuiO6qPedhc+prgESff5pLrhl31Kh7GwagSS3KfpTPbBAWOjG\
            \nueh1JM2GiwKBgHFv0LJSuhW5D8GnPFdO+TbQe5cxGQOAGTWKk/PpoPmKRWNXHoPe\
            \nD7i4PrUTJ9Ga/z4xYRLnbaLeBwEUaYSmIDnVR2o2J/GBLjQr+LRm6udc25IwrTxe\
            \nRw7YScBFb3lKq/e8/XdTyusWW2X8OHNfz2InSDh8CZ9zKSQ2CCABmdNpAoGBAJ9r\
            \ny1gZN+pN7zuUHqi5y+QPpmLkPMfqvzCsT9gSN/26hE8juK0L9HYiRcJAednKvpmU\
            \n4iofbenxnSogRoTALDNyInRt5fcsOFMoGgDPmXtp9f1ddPJlRaFJbHR26GAB0/Um\
            \nBvTBm/p/AXS/ilibc5oZyH4CvN3gpB2ktDYl7rWfAoGBAJ8znFwtApMzIsmEa1bw\
            \n0EjrJXdx14y84aSh7U5n052M8ZZ/hW0mrVEJdLvxuEIQ5xj89+Rj6gINy7EPJtIC\
            \n3ItLAgwTDcTTsO4jGg8ggswIcnBtmpTonJ96R0m2oI5B7KVinMWZX2RuqgXa4XTQ\
            \nVyDbAWxVNxGPrXPzwQCT5TGM\n-----END PRIVATE KEY-----\n',
            Dialogflow_V2.LANG_ENGLISH_US,
            'railwayassistant-977e1'
    );
  }
  requestDialogflow(text){
    console.log(text);
    Dialogflow_V2.requestQuery(
      text,
      result=>console.log(result),
      error=>console.log(error));
  }

  render(){
    return(
      <View style = {styles.container} >
        <KeyboardAvoidingView style={styles.TextInputView} behavior = "height">
          <TextInput
            style = {styles.TextInput}
            underlineColorAndroid = '#0ba03d'
            onChangeText = { (text) => this.setState({userQuery:text}) }
            onSubmitEditing = { () => this.requestDialogflow(this.state.userQuery)}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create(
  {
    container : {
      flex: 1,
      bottom: 0,
    },
    TextInputView : {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0
    },
    TextInput : {
      width: '100%',
      height: 40,
    }
  }
)
export default Conversation

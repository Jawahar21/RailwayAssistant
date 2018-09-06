import React, {Component} from 'react';
import { Text, View,StyleSheet,TextInput,FlatList, TouchableOpacity, Image } from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow'
import { renderUserText, renderWelcomeText } from './renderText'
import { renderPNR } from './renderPNR'
import ETA  from './renderETA'
import TrainStatus  from './renderTrainStatus'

class Conversation extends Component{

  constructor(){
    super()
    this.state = {
      userQuery : '',
      flatListData : [],
      isLoading : false
    }
    this.ETAPickerResponserHandler = this.ETAPickerResponserHandler.bind(this);
    this.toggleLoadingState = this.toggleLoadingState.bind(this);
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
  componentDidUpdate() {
    this.fl.scrollToEnd({ animated : true })
    setTimeout( () => this.fl.scrollToEnd({ animated : true }) ,500)
  }
  requestDialogflow(text){
    if( text == ''){
      return
    }
    this.textInput.clear();
    item = {
      'type' : 'userText',
      'data' : text
    }
    this.setState({
      flatListData : [...this.state.flatListData,item],
      userQuery : '',
      isLoading : true
    })
    Dialogflow_V2.requestQuery(
      text,
      result => {
        this.parseDialogFlowResponse(result)
      },
      error=> { console.log("Error situation!!!!!!");console.log(error)}
    );
  }
  fetchActualTrainStationData(result){
    this.setState({
      isLoading : true
    })
    fetch('https://4d08e4ce.ngrok.io/delayedResponse',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        activity : result.queryResult.webhookPayload.activity,
        train_name : result.queryResult.webhookPayload.train_name,
        station_name : result.queryResult.webhookPayload.station_name,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          flatListData : [...this.state.flatListData,responseJson],
          isLoading : false
        })
    })
    .catch((error) => {
        console.error(error);
      });
  }
  parseDialogFlowResponse(result){
    console.log(result)
    if ( result.hasOwnProperty('webhookStatus') ){
      if ( result.webhookStatus.hasOwnProperty('code')){
          result.queryResult['fulfillmentText'] = "Oops! I missed it. Please try Again"
      }
    }
    this.setState({
      flatListData : [...this.state.flatListData,result],
      isLoading : false
    })
    if( result.queryResult.action == 'ETA_station_input' ){
      this.fetchActualTrainStationData(result)
    }
    if( result.queryResult.action == 'ETA_main' || result.queryResult.action == 'ETA_train_input' ){
      if ( result.queryResult.hasOwnProperty('webhookPayload')){
        if ( result.queryResult.webhookPayload.actual_data == false){
          this.fetchActualTrainStationData(result)
        }
      }
    }
    if( result.queryResult.action == 'train_status_main'  ){
      if ( result.queryResult.hasOwnProperty('webhookPayload')){
        if ( result.queryResult.webhookPayload.actual_data == false){
          this.fetchActualTrainStationData(result)
        }
      }
    }

  }
  renderConversation(item){
    if ( item.item.type == 'userText' ){
      return renderUserText(item)
    }
    if( item.item.queryResult.action == 'input.welcome' ){
      return renderWelcomeText(item)
    }
    if( item.item.queryResult.action == 'input.unknown' ){
      return renderWelcomeText(item)
    }
    if ( item.item.queryResult.action.includes('pnr_status')){
      return renderPNR(item)
    }
    if ( item.item.queryResult.action.includes('ETA')){
      return <ETA item = {item} action = {this.ETAPickerResponserHandler} toggle = {this.toggleLoadingState} />
    }
    if ( item.item.queryResult.action.includes('smalltalk')){
      return renderWelcomeText(item)
    }
    if ( item.item.queryResult.action.includes('train_status')) {
      return <TrainStatus item = {item} action = {this.ETAPickerResponserHandler} toggle = {this.toggleLoadingState} />
    }
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };
  renderFooter = () => {
    if ( this.state.isLoading == false ){
      return null
    }
    return (
      <View>
        <Text>Railways Agent is typing...</Text>
      </View>
    )
  }
  ETAPickerResponserHandler(result) {
    this.setState({
      flatListData : [...this.state.flatListData,result]
    })
  }
  toggleLoadingState() {
    this.setState({
      isLoading : !this.state.isLoading
    })
    this.fl.scrollToEnd({ animated : true })
    setTimeout( () => this.fl.scrollToEnd({ animated : true }) ,500)
  }
  render(){
    return(
      <View style = {styles.container} >
        <View style = {styles.flatListView}>
          <FlatList
            data = {this.state.flatListData}
            renderItem = { (item) => this.renderConversation(item) }
            keyExtractor = { (item, index) => index.toString() }
            ref = {(c) => this.fl = c}
            onLayout = { () => this.fl.scrollToEnd( { animated: true } ) }
            ItemSeparatorComponent = {this.renderSeparator}
            ListFooterComponent = { this.renderFooter }
          />
        </View>
        <View style = {styles.TextInputView} >
          <View style = {styles.TextInputContainer} >
            <TextInput
              style = { styles.TextInput }
              underlineColorAndroid = '#0ba03d'
              onChangeText = { (text) => this.setState({userQuery:text}) }
              onSubmitEditing = { () => { this.requestDialogflow(this.state.userQuery)}}
              ref = {input => { this.textInput = input }}
              blurOnSubmit = {false}
              placeholder = 'Type your message here.'
            />
          </View>
          <View style = { styles.SendButtonContainer } >
            <TouchableOpacity onPress = { () => { this.requestDialogflow(this.state.userQuery)}} >
              <View>
                <Image style = {{ width:30,height:30 }} source = { require('./send.png') } />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create(
  {
    container : {
      flex: 1,
      backgroundColor : '#ffffff',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    TextInputView : {
      flexDirection : 'row',
      borderStyle : 'solid',
      borderColor : '#a9a9a9',
      borderTopWidth : 1,
      borderBottomWidth : 1
    },
    flatListView : {
      flex : 7,
    },
    TextInput : {
      backgroundColor : '#ffffff',
    },
    TextInputContainer : {
      flex : 7
    },
    SendButtonContainer : {
      justifyContent : 'center',
      alignItems : 'center',
      backgroundColor : '#0ba03d',
      flex : 1
    }
  }
)
export default Conversation

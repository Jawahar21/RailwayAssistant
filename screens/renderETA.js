import React, {Component} from 'react';
import { Text, View, StyleSheet, Image,Picker,TouchableOpacity } from 'react-native';
import { styles } from './message_style'
import { renderWelcomeText } from './renderText'
import { Dialogflow_V2 } from 'react-native-dialogflow'

class ETA extends Component{

  constructor(props){
    super(props)
    if ( props.item.item.queryResult.action == 'ETA_delayed_response') {
      if ( props.item.item.queryResult.hasOwnProperty('webhookPayload') ){
        trains = props.item.item.queryResult.webhookPayload.trains
        stations = props.item.item.queryResult.webhookPayload.stations
        this.state = {
          pickerTrain : trains[0].number,
          pickerStation : stations[0].name
        }
      }
    }
    if ( props.item.item.queryResult.action == 'ETA_station_input.ETA_station_input-custom'){
      date = props.item.item.queryResult.webhookPayload.date
      this.state = {
        pickedDate : date[0],
      }
    }
  }
  requestDialogflow(query){
    console.log('Hit')
    Dialogflow_V2.requestQuery(
      query,
      result => {
        this.props.action(result)
      },
      error=>console.log(error)
    );
  }
  render(){
    item = this.props.item
    console.log(item)
    if ( item.item.queryResult.action == 'ETA_delayed_response'){
      if ( item.item.queryResult.hasOwnProperty('webhookPayload') ){
        trains = item.item.queryResult.webhookPayload.trains
        stations = item.item.queryResult.webhookPayload.stations
        return(
          <View >
            <Text>{item.item.queryResult.fulfillmentText}</Text>
            <Picker
              selectedValue = {this.state.pickerTrain}
              prompt = "Select Train"
              mode = 'dialog'
              onValueChange = { (itemValue, itemIndex) => {this.setState({pickerTrain: itemValue})} }
            >
            {
              trains.map((p,i) => {
                return(
                  <Picker.Item key={i} value={p.number} label={p.name + "-" + p.number} />
                )
              })
            }
            </Picker>
            <Picker
              selectedValue = { this.state.pickerStation }
              prompt="Select Station"
              mode='dialog'
              onValueChange = {(itemValue, itemIndex) => this.setState( { pickerStation : itemValue } ) }
            >
            {
              stations.map((p,i) => {
                return(
                  <Picker.Item key={i} value={p.name} label={p.name} />
                )
              })
            }
            </Picker>
            <TouchableOpacity onPress = { () => this.requestDialogflow(this.state.pickerTrain +" "+this.state.pickerStation) } >
              <View>
                <Text>Confirm</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      }
    }
    if (item.item.queryResult.action == 'ETA_station_input.ETA_station_input-custom'){
        dates = item.item.queryResult.webhookPayload.date
        return(
          <View >
            <Text>{item.item.queryResult.fulfillmentText}</Text>
            <Picker
              selectedValue = {this.state.pickedDate}
              prompt = "Select Date"
              mode = 'dialog'
              onValueChange = { (itemValue, itemIndex) => {this.setState({pickedDate: itemValue})} }
            >
            {
              dates.map( (p,i) => {
                return(
                  <Picker.Item key = {i} value = {p} label = {p} />
                )
              })
            }
            </Picker>
            <TouchableOpacity onPress = { () => this.requestDialogflow(this.state.pickedDate) } >
              <View>
                <Text>Confirm</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
    }
    return(
      renderWelcomeText(item)
    )
  }
}
export default ETA

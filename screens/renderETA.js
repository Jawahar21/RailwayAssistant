import React, {Component} from 'react';
import { Text, View, StyleSheet, Image,Picker,TouchableOpacity } from 'react-native';
import { styles } from './message_style'
import { renderWelcomeText } from './renderText'
import { Dialogflow_V2 } from 'react-native-dialogflow'

class ETA extends Component{

  constructor(props){
    super(props)
    console.log(props)
    if(props.item.item.queryResult.hasOwnProperty('webhookPayload')){
      if ( !props.item.item.queryResult.webhookPayload.hasOwnProperty('date') ){
        data = props.item.item.queryResult.webhookPayload
        this.state = {
          pickerTrain : data.trains[0].number,
          pickerStation : data.stations[0].name
        }
      }
    }
  }
  requestDialogflow(query){
    Dialogflow_V2.requestQuery(
      query,
      result => {
        console.log(result)
        this.props.action(result)
      },
      error=>console.log(error)
    );
  }
  render(){
    item = this.props.item
    var renderETA = ''
    if (item.item.queryResult.hasOwnProperty('webhookPayload')){
      response = item.item.queryResult
      if ( response.webhookPayload.hasOwnProperty('date') ){
        dates = response.webhookPayload.date
        console.log(dates)
        return (
          <View>
            {
              dates.map((p,i) =>{
                console.log(p)
                return(
                  <TouchableOpacity onPress = { () => this.requestDialogflow(p) } key = {i}>
                    <View>
                      <Text>{p}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        )
      }
      trains = response.webhookPayload.trains
      stations = response.webhookPayload.stations
      return(
        <View >
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
    return(
      renderWelcomeText(item)
    )
  }
}
export default ETA

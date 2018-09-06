import React, {Component} from 'react';
import { Text, View, Picker,TouchableOpacity } from 'react-native';
import { styles } from './message_style'
import { renderWelcomeText } from './renderText'
import { Dialogflow_V2 } from 'react-native-dialogflow'
import TrainLogo from './TrainLogo'


class TrainStatus extends Component {

  constructor(props){
    super(props)
    console.log(props);
    if ( props.item.item.queryResult.action == 'train_status_main' || props.item.item.queryResult.action == 'train_status_delayed_response' ){
      if ( props.item.item.queryResult.hasOwnProperty('webhookPayload') && props.item.item.queryResult.webhookPayload.actual_data ){
        trains = props.item.item.queryResult.webhookPayload.trains
        this.state = {
          pickerTrain : trains[0].number,
          confirmState : false,
          pickerEnabled : true
        }
      }
    }
    if ( props.item.item.queryResult.action == 'train_status.train_number_input' ){
      date = props.item.item.queryResult.webhookPayload.date
      this.state = {
        pickedDate : date[0],
        pickerEnabled : true
      }
    }
  }
  requestDialogflow(query){
    this.props.toggle()
    this.setState({
      confirmState : true,
      pickerEnabled : false
    })
    console.log('Hit')
    Dialogflow_V2.requestQuery(
      query,
      result => {
        this.props.action(result)
        this.props.toggle()
      },
      error=>console.log(error)
    );
  }
  render(){
    item = this.props.item
    if ( item.item.queryResult.action == 'train_status_main' || item.item.queryResult.action == 'train_status_delayed_response' ) {
      if ( item.item.queryResult.hasOwnProperty('webhookPayload') && item.item.queryResult.webhookPayload.actual_data ){
        trains = item.item.queryResult.webhookPayload.trains
        return (
          <View style = { styles.MessageContainerBot } >
            <TrainLogo />
            <View style = {{ width : '100%'}} >
              <Text style = { styles.MessageText } >{item.item.queryResult.fulfillmentText}</Text>
              <Picker
                selectedValue = {this.state.pickerTrain}
                prompt = "Select Train"
                mode = 'dialog'
                onValueChange = { (itemValue, itemIndex) => {this.setState({pickerTrain: itemValue})} }
                enabled = { this.state.pickerEnabled }
              >
              {
                trains.map((p,i) => {
                  return(
                    <Picker.Item key={i} value={p.number} label={p.name + "-" + p.number} />
                  )
                })
              }
              </Picker>
              <TouchableOpacity
               onPress = { () => this.requestDialogflow( this.state.pickerTrain ) }
               disabled = {this.state.confirmState} >
                <View>
                  <Text style = { styles.MessageText } >Confirm</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    }
    if ( item.item.queryResult.action == 'train_status.train_number_input' ){
      dates = item.item.queryResult.webhookPayload.date
      return (
        <View style = { styles.MessageContainerBot } >
          <TrainLogo />
          <View style = {{ width : '100%'}} >
            <Text style = { styles.MessageText } >{item.item.queryResult.fulfillmentText}</Text>
            <Picker
              enabled = { this.state.pickerEnabled }
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
            <TouchableOpacity onPress = { () => this.requestDialogflow(this.state.pickedDate) } disabled = {this.state.confirmState} >
              <View>
                <Text style = { styles.MessageText } >Confirm</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return(
      renderWelcomeText(item)
    )
  }
}
export default TrainStatus

from flask import request, jsonify
from railAPI_activities import RailwayDB

class EtaActivities:


    def EtaMainActivity(self,webhook_req):
        parameters = webhook_req.get('queryResult').get('parameters')
        outputContexts = webhook_req.get('queryResult').get('outputContexts')
        if ( parameters.get('train_number') ):
            if( parameters.get('station_name') ):
                #auto complete station name
                print( parameters.get('station_name') )
            else :
                return jsonify({
                    "fulfillmentText": "May I know the station name at which you are expecting the arrival?",
                    "outputContexts" : outputContexts,
                    "followupEventInput": {
                        "name": "ETA_fallback_error_station",
                        "languageCode": "en-US",
                    }
                })
                # call station name input intent
        elif ( parameters.get( 'train_name' ) ):
            if( parameters.get('station_name') ):
                #auto complete station name
                #auto train name
                print( parameters.get('station_name') )
            else :
                print('Here')
                return jsonify({
                    "fulfillmentText": "May I know the station name at which you are expecting the arrival?",
                    "outputContexts" : outputContexts,
                    "followupEventInput": {
                        "name": "ETA_fallback_error_station",
                        "languageCode": "en-US",
                    }
                })
                # call station name input intent
        elif ( parameters.get('station_name') ) :
            # auto complete station name
            # call train name input intent
            pass
        else :
            # call train name and station name input
            pass

        return jsonify({
            "fulfillmentText": "Checking Parameters"
        })

    def EtaStationActivity(self,webhook_req):
        train_name = ''
        outputContexts = webhook_req.get('queryResult').get('outputContexts')
        for context in outputContexts :
            if ( 'eta-followup' in context.get('name') ):
                train_name = context.get('parameters').get('train_name')
                break
        station_name = webhook_req.get('queryResult').get('parameters').get('station_name')
        print(station_name)
        print(train_name)
        trains = RailwayDB().getTrainNameNumber(train_name)
        stations = RailwayDB().getStationNameNumber(station_name)
        print(trains)
        print(stations)
        if ( type(trains) is list and type(stations) is list ):
            return jsonify({
                "fulfillmentText": "Do you mean?",
                "outputContexts" : outputContexts,
                "payload" : {
                    "trains" : trains,
                    "stations" : stations
                }
            })
        if ( type(trains) is list and type(stations) is not list ):
            return jsonify({
                "fulfillmentText": stations
            })
        if ( type(trains) is not list and type(stations) is list ):
            return jsonify({
                "fulfillmentText": trains
            })
        if ( type(trains) is not list and type(stations) is not list ):
            return jsonify({
                "fulfillmentText": trains + stations
            })

    def EtaTrainStartDateActivity(self,webhook_req):
        outputContexts = webhook_req.get('queryResult').get('outputContexts')
        return jsonify({
            "fulfillmentText": "Tell me the Start Date of this train",
            "outputContexts" : outputContexts,
            "payload" : {
                "date" : ["Today","Yesterday","2 days Ago","3 days ago"]
            }
        })

    def ETA_Response(self,webhook_req):
        response = ''
        station_data = ''
        train_number = ''
        station_name = ''
        outputContexts = webhook_req.get('queryResult').get('outputContexts')
        date = webhook_req.get('queryResult').get('parameters').get('date')
        parsed_date = date[8:10] + "-"+date[5:7]+"-"+date[0:4]
        for context in outputContexts :
            if ( 'eta_station_inputeta_auto_station_train_input-followup' in context.get('name') ):
                train_number = int(context.get('parameters').get('train_number'))
                station_name = context.get('parameters').get('station_name')
                break
        data = RailwayDB().getLiveTrainStatus(train_number, parsed_date)
        if data['response_code'] == 200 :
            for route in data.get('route'):
                if( route.get('station').get('name') == station_name ) :
                    station_data = route
                    break
            position = data['position']
            if ( station_data ):
                if station_data["scharr"] == "Source" :
                    responseText = "Train reaches " + station_name + " station" + " on " + station_data['actarr_date'] + " ," + station_data['schdep']
                else :
                    responseText = "Train reaches " + station_name + " station" + " on " + station_data['actarr_date'] + " ," + station_data['actarr']
                response = position + responseText
            else :
                response = station_name + " station is not in the route of the requested Train"
        if data['response_code'] == 201 :
            response = "Train does not run on the date queried. Please enter correct details."
        if data['response_code'] == 230 :
            response = "Invalid date chosen."
        if data['response_code'] == 404 :
            response = "No data found for your requested Train and Station entries"
        if data['response_code'] == 405 :
            response = "Server unavailable, Inconvinence regretted"
        return jsonify({
            "fulfillmentText": response
        })

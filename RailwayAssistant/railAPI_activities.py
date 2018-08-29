from flask import Flask,jsonify
import requests

class RailwayDB:

    def getPnrStatus(self,pnr_number):
        api_key = '626n1cabf5'
        base_url = "https://api.railwayapi.com/v2/pnr-status/pnr/"
        complete_url = base_url + str(pnr_number) + "/apikey/" + api_key + "/"
        response_ob = requests.get(complete_url)
        result = response_ob.json()
        print(result)
        if result["response_code"] == 200:
            return jsonify({
                "fulfillmentText": "Here is your PNR status",
                "payload" : {
                    'type' : 'pnr_status',
                    'doj' : result.get('doj'),
                    'from_station' : result.get('from_station').get('name'),
                    'to_station' : result.get('to_station').get('name'),
                    'boarding_point': result.get('boarding_point').get('name'),
                    'reservation_upto': result.get('reservation_upto').get('name'),
                    'train': {
                        'name' : result.get('train').get('name'),
                        'number' : result.get('train').get('number')
                    },
                    'journey_class': result.get('journey_class'),
                    'passengers' : result.get('passengers')
                }
            })
        if result["response_code"] == 220 :
            return jsonify({
                "fulfillmentText": "Journey completed data not found"
            })
        if result["response_code"] == 221 :
            return jsonify({
                "fulfillmentText": "PNR number you entered is not a valid one."
            })
        if result["response_code"] == 404 :
            return jsonify({
                "fulfillmentText": "PNR status for the entered PNR not found."
            })
        if result["response_code"] == 405 :
            return jsonify({
                "fulfillmentText": "Server Not available. Inconvinence regretted."
            })
        else:
            return False

    def getTrainNameNumber(self,train_name):
        trains = []
        api_key = '626n1cabf5'
        base_url = 'https://api.railwayapi.com/v2/suggest-train/train/'
        complete_url = base_url + str(train_name) + "/apikey/" + api_key + "/"
        print(complete_url)
        response_ob = requests.get(complete_url)
        result = response_ob.json()
        print(result)
        if result["response_code"] == 200 :
            if len( result['trains'] ) == 0 :
                return "No Trains found for the entered Train Name"
            for train in result.get('trains'):
                trains.append({
                    'name' : train.get('name'),
                    'number' : train.get('number')
                })
            return trains
        if result["response_code"] == 404 :
            return "No Trains found for the entered Train Name",
        if result["response_code"] == 405 :
            return "Server Not available. Inconvinence regretted."

    def getStationNameNumber(self,station_name):
        stations = []
        api_key = '626n1cabf5'
        base_url = 'https://api.railwayapi.com/v2/suggest-station/name/'
        complete_url = base_url + str(station_name) + "/apikey/" + api_key + "/"
        print(complete_url)
        response_ob = requests.get(complete_url)
        result = response_ob.json()
        print(result)
        if result["response_code"] == 200 :
            if len( result['stations'] ) == 0 :
                return "No Stations found for the entered Station Name"
            for station in result.get('stations'):
                stations.append({
                    'name' : station.get('name'),
                })
            return stations
        if result["response_code"] == 404 :
            return "No Stations found for the entered Station Name",
        if result["response_code"] == 405 :
            return "Server Not available. Inconvinence regretted."

    def getLiveTrainStatus(self,train_number,date):
        api_key = '626n1cabf5'
        base_url = 'https://api.railwayapi.com/v2/live/train/'
        complete_url = base_url + str(train_number) + "/date/" + str(date) + "/apikey/" + api_key + "/"
        response_ob = requests.get(complete_url)
        result = response_ob.json()
        return result

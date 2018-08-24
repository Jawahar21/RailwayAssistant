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
        print('Here')
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

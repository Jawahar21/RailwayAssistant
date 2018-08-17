from flask import request, jsonify


class PNRActivities:

    def PNRMainActivity(self,webhook_req):
        pnr_number = webhook_req.get('queryResult').get('parameters').get('pnr_number')
        print(pnr_number)
        if( pnr_number ):
            pnr_number = int(pnr_number)
            if ( len(str(pnr_number)) == 10 ):
                return jsonify({
                    "fulfillmentText": "Works"
                    })
        outputContexts = webhook_req.get('queryResult').get('outputContexts')
        return jsonify({
            "fulfillmentText": "Length not matched",
            "outputContexts" : outputContexts,
            "followupEventInput": {
                "name": "pnr_status_fallback",
                "languageCode": "en-US",
            }
        })

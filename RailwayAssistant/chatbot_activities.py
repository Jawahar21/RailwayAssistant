from flask import request, jsonify
from pnr_tasks import PNRActivities

class Activites:


    def checkActivity(self):
        webhook_req = request.get_json()
        action = webhook_req.get('queryResult').get('action')
        print(action)
        if 'pnr_status' in action :
            return Activites().callPNRActivities(action,webhook_req)

    def callPNRActivities(self,activity,webhook_req):
        if activity == 'pnr_status_main':
            return PNRActivities().PNRMainActivity(webhook_req)
        if activity == 'pnr_status_number':
            return PNRActivities().PNRMainActivity(webhook_req)

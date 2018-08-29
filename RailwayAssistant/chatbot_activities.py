from flask import request, jsonify
from pnr_tasks import PNRActivities
from eta_tasks import EtaActivities


class Activites:

    def checkActivity(self):
        webhook_req = request.get_json()
        action = webhook_req.get('queryResult').get('action')
        print(action)
        if 'pnr_status' in action :
            return Activites().callPNRActivities(action,webhook_req)
        if 'ETA' in action :
            return Activites().callEtaActivities(action,webhook_req)

    def callPNRActivities(self,activity,webhook_req):
        if activity == 'pnr_status_main':
            return PNRActivities().PNRMainActivity(webhook_req)
        if activity == 'pnr_status_number':
            return PNRActivities().PNRMainActivity(webhook_req)

    def callEtaActivities(self,activity,webhook_req):
        if activity == 'ETA_main':
            return EtaActivities().EtaMainActivity(webhook_req)
        if activity == 'ETA_station_input':
            return EtaActivities().EtaStationActivity(webhook_req)
        if activity == 'ETA_station_input.ETA_station_input-custom':
            return EtaActivities().EtaTrainStartDateActivity(webhook_req)
        if activity == 'ETA_station_input.ETA_train_start_date' :
            print('here')
            return EtaActivities().ETA_Response(webhook_req)

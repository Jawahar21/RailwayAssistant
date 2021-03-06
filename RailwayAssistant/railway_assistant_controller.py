from flask import Flask
from chatbot_activities import Activites
response_PNR_data = {
  "response_code": 200,
  "debit": 3,
  "pnr": "1234567890",
  "doj": "25-6-2017",
  "total_passengers": 3,
  "chart_prepared": True,
  "from_station": {
    "name": "Kopargaon",
    "code": "KPG"
  },
  "to_station": {
    "name": "Hazrat Nizamuddin",
    "code": "NZM"
  },
  "boarding_point": {
    "name": "Kopargaon",
    "code": "KPG"
  },
  "reservation_upto": {
    "name": "Hazrat Nizamuddin",
    "code": "NZM"
  },
  "train": {
    "name": "GOA EXPRESS",
    "number": "12779"
  },
  "journey_class": {
    "name": "SLEEPER CLASS",
    "code": "SL"
  },
  "passengers": [
    {
      "no": 1,
      "current_status": "RLWL/11",
      "booking_status": "RLWL/39/GN"
    },
    {
      "no": 2,
      "current_status": "RLWL/12",
      "booking_status": "RLWL/40/GN"
    },
    {
      "no": 3,
      "current_status": "RLWL/13",
      "booking_status": "RLWL/41/GN"
    }
  ]
}
app = Flask(__name__)

@app.route('/',methods =['GET','POST'])
def webhook():
    return Activites().checkActivity()

if (__name__ == "__main__"):
    app.run(port = 5000)

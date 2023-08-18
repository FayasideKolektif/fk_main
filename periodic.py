import requests
import schedule
import time

def make_request():
    url = "https://www.defayasitekolektif.org"  # Replace with your target URL
    response = requests.get(url)
    print("Request made:", response.status_code)

# Schedule the make_request function to run every 15 minutes
schedule.every(15).minutes.do(make_request)

while True:
    schedule.run_pending()
    time.sleep(1)


import requests

def make_request():
    url = "https://www.defayasitekolektif.org"
    response = requests.get(url)
    print("Request made:", response.status_code)

if __name__ == "__main__":
    make_request()


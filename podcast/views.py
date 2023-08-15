from django.shortcuts import render
import requests
import base64
from podcast.models import PodcastSettings

# Create your views here.
def podcast(request):
    context = get_podcast_info()
    return render (request, 'podcast/index.html',context)


def episode(request,slug):
    embedded_url = f"https://open.spotify.com/embed/episode/{slug}?utm_source=generator"
    #data = get_podcast_info()
    authentication = PodcastSettings.objects.first()
    try:
        client_id =authentication.client_id
        client_secret =authentication.client_secret
        access_token = get_spotify_access_token(client_id=client_id,client_secret=client_secret)

        # Retrieve podcast information
        episode_url = f'https://api.spotify.com/v1/episodes/{slug}?market=ES'
        headers = {'Authorization': f'Bearer {access_token}'}

        response = requests.get(episode_url, headers=headers)
        print(response)
        print('::::::::::::::::::::::::::::::::::::::::::::::::::')
        podcast_data = response.json()
        print(podcast_data.description)
    except:
        pass
    context={
            'embedded_url':embedded_url,
            'data':podcast_data
        }
        
    return render (request, 'podcast/episode.html',context)

def get_spotify_access_token(client_id,client_secret):
    auth_url = 'https://accounts.spotify.com/api/token'

    # Encode the client_id and client_secret using base64
    credentials = f"{client_id}:{client_secret}"
    base64_credentials = base64.b64encode(credentials.encode()).decode()

    auth_headers = {'Authorization': f'Basic {base64_credentials}'}
    auth_data = {'grant_type': 'client_credentials'}

    response = requests.post(auth_url, headers=auth_headers, data=auth_data)
    if response.status_code == 200:
        access_token = response.json()['access_token']

        return access_token
    else:
        # Handle error response appropriately
        return None

def get_podcast_info(limit=10,offset=0):
    authentication = PodcastSettings.objects.first()
    try:
        podcast_id = authentication.podcast_id
        client_id =authentication.client_id
        client_secret =authentication.client_secret
        access_token = get_spotify_access_token(client_id=client_id,client_secret=client_secret)

        # Retrieve podcast information
        podcast_url = f'https://api.spotify.com/v1/shows/{podcast_id}?market=ES'
        headers = {'Authorization': f'Bearer {access_token}'}

        response = requests.get(podcast_url, headers=headers)
        podcast_data = response.json()
    
        # Retrieve episodes information
        episodes_url = f'https://api.spotify.com/v1/shows/{podcast_id}/episodes?market=ES&limit=10&offset=5'
        response = requests.get(episodes_url, headers=headers)
        episodes_data = response.json()

        context = {
            'podcast_name': podcast_data['name'],
            'podcast_description': podcast_data['description'],
            'episodes': [],
        }
        for episode in episodes_data['items']:
            episode_info = {
                'title': episode['name'],
                'url': episode['external_urls']['spotify'],
                'description': episode['description'],
                'date': episode['release_date'],
                'duration': episode['duration_ms'],
                'thumbnail': episode['images'][0]['url']
            }
            context['episodes'].append(episode_info)
    except:
        context={'error':'Invalid POdcast iD '}
    return context


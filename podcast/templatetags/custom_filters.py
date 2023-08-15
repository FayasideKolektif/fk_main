# custom_filters.py

from django import template

register = template.Library()

@register.filter
def spotify_to_embed(url):
    if "open.spotify.com/episode/" in url:
        episode_id = url.split("/")[-1]
        embedded_url = f"https://open.spotify.com/embed/episode/{episode_id}?utm_source=generator"
        return embedded_url
    else:
        return None
    
@register.filter
def spotify_to_id(url):
    if "open.spotify.com/episode/" in url:
        episode_id = url.split("/")[-1]
        return episode_id
    else:
        return None
    
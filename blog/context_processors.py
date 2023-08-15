# your_app/context_processors.py

from .models import SiteContacts

def site_contacts(request):
    contact_details = SiteContacts.get_site_contact_details()
    return {'contact_details': contact_details}

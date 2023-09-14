import requests
import pyrebase

urlmanname = "https://www.randomlists.com/data/names-male.json"
urlfemalname = "https://www.randomlists.com/data/names-female.json"
urllastname = "https://www.randomlists.com/data/names-last.json"

firebaseconfig = {
    "apiKey": "AIzaSyDPQaOXylHp7aRAwHVAMC015Zcg6OJZaYk",
    "authDomain": "survivor-fc090.firebaseapp.com",
    "databaseURL": "https://survivor-fc090-default-rtdb.europe-west1.firebasedatabase.app",
    "projectId": "survivor-fc090",
    "storageBucket": "survivor-fc090.appspot.com",
    "messagingSenderId": "489716387724",
    "appId": "1:489716387724:web:0b2b29a6354c43391e50a9"
}

def get_names(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()['data']
    else:
        return None

all_last_name = get_names(urllastname)
all_female_name = get_names(urlfemalname)
all_male_name = get_names(urlmanname)


name = all_male_name[0]
surname = all_last_name[1]
email = all_male_name[0] + '.'+ all_male_name[1] + "@gmail.com"
password = "password"

firebase = pyrebase.initialize_app(firebaseconfig)
auth = firebase.auth()
db = firebase.database()

user = auth.create_user_with_email_and_password(email, password)
print("Success .... ")

print(user.get("localId"))

# create last name
db.child("users").push({user.get("localId"): {
    "Email": email,
    "address": {},
    "cmp": {"compagny": "2123"},
    "idConnect": user.get("localId"),
    "job": "job",
    "name": name,
    "surname": surname,
    "tel": "",
    "role": "member",
    "todo": {},
    "widgets": 
}})
 
#create users

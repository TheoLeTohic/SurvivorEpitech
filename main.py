import requests
import pyrebase
import random

urlmanname = "https://www.randomlists.com/data/names-male.json"
urlfemalname = "https://www.randomlists.com/data/names-female.json"
urllastname = "https://www.randomlists.com/data/names-last.json"

firebaseconfig = {
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


def create_users(compagny):
    name = random.choice(all_male_name)
    surname = random.choice(all_male_name)
    email = name + '.'+ surname + "@gmail.com"
    password = "password"

    firebase = pyrebase.initialize_app(firebaseconfig)
    auth = firebase.auth()
    db = firebase.database()

    user = auth.create_user_with_email_and_password(email, password)
    print("Success .... ")

    print(user.get("localId"))

    # create last name
    db.child("users").child(user.get("localId")).set({
        "Email": email,
        "address": {
            "0" : {
                "mail": "paris",
                "sub": "paris"
            }
        },
        "cmp": {"compagny": compagny},
        "idConnect": user.get("localId"),
        "job": "job",
        "name": name,
        "surname": surname,
        "tel": "",
        "role": "member",
        "todo": {},
        "widgets": {
            "0": {
                "name": "Calendar",
                "type": "small",
                "id": "0"
            }
        }
    })
 
#create users



def create_users_all():
    for i in range(0, 20):
        create_users("6885")


create_users_all()
import pytest
import json
import datetime
from app import create_app
from soccerapp import db

@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"
    
    with app.app_context():       
        with app.test_client() as client:
            yield client
        
def test_connection(client):    
    response = client.get('/')
    expected = {'hello': 'world'}
    assert response.status_code == 200
    assert expected == json.loads(response.get_data(as_text=True))
       
def test_get_all_leagues(client):     
    response = client.get('/leagues')
    res = json.loads(response.data.decode('utf-8'))    
    assert response.status_code == 200
    assert res['message'] == "success"

def test_get_league_names(client):
    response = client.get('/league_name/4769/')
    res = json.loads(response.data.decode('utf-8'))    
    assert response.status_code == 200
    assert res['message'] == "success"
    assert res["league"][0] == "France Ligue 1"

def test_get_league_teams(client):
    response = client.get('/teams/')
    res = json.loads(response.data.decode('utf-8'))  
    print(res)  
    assert response.status_code == 200
    assert res['message'] == "success"
    assert res['teams'][0] == {"team":"Arsenal"}

def test_get_league_table(client):
    response = client.get('/league_table/')
    res = json.loads(response.data.decode('utf-8'))
    assert response.status_code == 200
    assert res['message'] == "success"
    assert res['league'][0] == "England Premier League"

def test_get_league_results(client):
    response = client.get('/results/')
    res = json.loads(response.data.decode('utf-8'))
    assert response.status_code == 200
    assert res['message'] == "success"
    assert res['league'][0] == "England Premier League"
    
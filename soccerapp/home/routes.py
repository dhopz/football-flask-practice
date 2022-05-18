"""Application routes."""
#from datetime import datetime
import datetime
from sqlalchemy import exc
from flask import current_app as app
from flask import request, json, Blueprint
from init_db import session


home_bp = Blueprint('home_bp', __name__,)

@home_bp.route('/')
def hello():
	return {"hello": "world"}

@home_bp.route('/leagues', methods=['GET'])
def leagues():
	leagues = session.execute(
		f'SELECT league.name AS league, country.name AS country\n'
		f'FROM league\n'
		f'INNER JOIN country\n'
		f'ON league.country_id = country.id;')
	results = [
		{"league":league.league,
		"country":league.country
		} for league in leagues]

	return {"leagues": results, "message":"success"}

	
	
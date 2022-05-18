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

@home_bp.route('/teams', methods=['GET'])
def teams():
	teams = session.execute(
		f"SELECT DISTINCT(team_long_name), m.season\n"
		f"FROM match AS m\n"
		f"INNER JOIN team as t\n"
		f"ON m.hometeam_id = t.team_api_id\n"
		f"WHERE league_id = 1729 AND season = '2008/2009';"
	)
	results = [
		{"team":team.team_long_name} for team in teams
	]
	return {"teams": results, "message":"success"}

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

@home_bp.route('/league_table', methods=['GET'])
def league_table():
	league_table = session.execute(
		f"SELECT team_long_name AS team,\n"
		f"COUNT(result) AS games_played,\n"
		f"SUM(CASE WHEN result = 'W' THEN 1 ELSE 0 END) as games_won,\n"
		f"SUM(CASE WHEN result = 'D' THEN 1 ELSE 0 END) as games_drawn,\n"
		f"SUM(CASE WHEN result = 'L' THEN 1 ELSE 0 END) as games_lost,\n"
		f"SUM(goals_for) AS goals_for,\n" 
		f"SUM(goals_against) as goals_against,\n"
		f"SUM(goals_for)-SUM(goals_against) AS goal_difference,\n"
		f"SUM(CASE WHEN result = 'W' THEN 3 WHEN result = 'D' THEN 1 ELSE 0 END) as points\n"
		f"FROM match_results\n"
		f"LEFT JOIN team\n"
		f"ON match_results.team_id = team.team_api_id\n"
		f"GROUP BY team_long_name\n"
		f"ORDER BY points DESC, goal_difference DESC;"
	)
	results = [
		{"team":team.team,
		"games_played":team.games_played,
		"games_won":team.games_won,
		"games_drawn":team.games_drawn,
		"games_lost":team.games_lost,
		"goals_for":team.goals_for,
		"goals_against":team.goals_against,
		"goal_difference":team.goal_difference,
		"points":team.points
		} for team in league_table]
	return {"teams": results, "message":"success"}
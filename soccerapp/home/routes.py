"""Application routes."""
#from datetime import datetime
import datetime
from sqlalchemy import exc
from flask import current_app as app
from flask import request, json, Blueprint, jsonify
from init_db import session

home_bp = Blueprint('home_bp', __name__,)

@home_bp.route('/')
def hello():
	return {"hello": "world"}

# Get the leagues that are available from the database
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

# Get the league name
@home_bp.route('/league_name/', defaults={'league': 1729})
@home_bp.route('/league_name/<string:league>/', methods=['GET'])
def league_name(league):
	league_name = session.execute(f"SELECT name FROM league WHERE id = '{league}' LIMIT 1;")
	results = [list(row) for row in league_name][0]
	return {'league': results,"message":"success"}

# Get all the teams in the league by season
@home_bp.route('/teams/', defaults={'league': 1729, 'season': '2008'})
@home_bp.route('/teams/<string:league>/<string:season>', methods=['GET'])
def teams(league,season):
	with open("soccerapp/sql/league_teams.sql") as f:
		query = f.read()

	teams = session.execute(query.format(league=league,season=season+"%"))
			
	results = [
		{"team":team.team_long_name} for team in teams
	]
	# print(results)
	return {"league_teams": results, "message":"success"}

# Get the League Table
@home_bp.route('/league_table/', defaults={'league': 1729, 'season': '2008'})
@home_bp.route('/league_table/<string:league>/<string:season>', methods=['GET'])
def league_table(league,season):

	league_name = session.execute(f"SELECT name FROM league WHERE id = '{league}' LIMIT 1;")
	league_name_results = [list(row) for row in league_name][0]	

	with open("soccerapp/sql/points_table.sql") as f:
		query = f.read()	

	league_table = session.execute(query.format(league=league,season=season+"%"))

	results = [
		{"team":team.team,
		"id":team.id,
		"games_played":team.games_played,
		"games_won":team.games_won,
		"games_drawn":team.games_drawn,
		"games_lost":team.games_lost,
		"goals_for":team.goals_for,
		"goals_against":team.goals_against,
		"goal_difference":team.goal_difference,
		"points":team.points
		} for team in league_table]
	return {"league": league_name_results, "teams": results, "message": "success"}

# Get the League Results by season
@home_bp.route('/results/', defaults={'league': 1729, 'season': '2008'})
@home_bp.route('/results/<string:league>/<string:season>', methods=['GET'])
def season_results(league,season):

	league_name = session.execute(f"SELECT name FROM league WHERE id = '{league}' LIMIT 1;")
	league_name_results = [list(row) for row in league_name][0]

	with open("soccerapp/sql/season_results.sql") as f:
		query = f.read()	

	game_results = session.execute(query.format(league=league,season=season+"%"))

	results = [
		{"date":result.date,
		"hometeam":result.hometeam,
		"awayteam":result.awayteam,
		"home_goal":result.home_goal,
		"away_goal":result.away_goal
		} for result in game_results]
	return {"league": league_name_results, "teams": results, "message":"success"}


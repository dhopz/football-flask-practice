--Results of Match home and away goals by season and league
WITH home AS (
  SELECT m.league_id AS league_id, m.season AS season_id ,m.id, m.date, 
  		 t.team_long_name AS hometeam, m.home_goal
  FROM match AS m
  LEFT JOIN team AS t 
  ON m.hometeam_id = t.team_api_id
  WHERE m.league_id = {league} AND m.season LIKE '{season}'),
-- Declare and set up the away CTE
away AS (
  SELECT m.league_id AS league_id, m.season AS season_id, m.id, m.date, 
  		 t.team_long_name AS awayteam, m.away_goal
  FROM match AS m
  LEFT JOIN team AS t 
  ON m.awayteam_id = t.team_api_id
  WHERE m.league_id = {league} AND m.season LIKE '{season}')
-- Select date, home_goal, and away_goal
SELECT
    
	home.date,
    home.hometeam,
    away.awayteam,
    home.home_goal,
    away.away_goal
-- Join away and home on the id column
FROM home
INNER JOIN away
ON home.id = away.id;
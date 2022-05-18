SELECT league.name AS league, country.name AS country 
FROM league
INNER JOIN country
ON league.country_id = country.id;

-- Premier League Teams in 2008/2009
SELECT DISTINCT(team_long_name), m.season
FROM match AS m
INNER JOIN team as t
ON m.hometeam_id = t.team_api_id
WHERE league_id = 1729 AND season = '2008/2009';

SELECT id,country_id,league_id,season,stage,date,match_api_id,hometeam_id,awayteam_id,home_goal,away_goal
FROM match
WHERE league_id = 1729 AND season = '2008/2009';

--long_team_name, won, drawn, lost, goals_for, goals_against, points
SELECT hometeam_id,awayteam_id,home_goal,away_goal,
CASE 
    WHEN home_goal > away_goal THEN 3
    WHEN home_goal = away_goal THEN 1
    ELSE 0 END AS home_team_result,
CASE 
    WHEN home_goal < away_goal THEN 3
    WHEN home_goal = away_goal THEN 1 
    ELSE 0 END AS away_team_result
FROM match
WHERE league_id = 1729 AND season = '2008/2009';

-- win,draw,lost
CREATE OR REPLACE VIEW match_results AS
SELECT hometeam_id AS team_id,home_goal AS goals_for,away_goal AS goals_against,
CASE 
    WHEN home_goal > away_goal THEN 'W'
    WHEN home_goal = away_goal THEN 'D'
    ELSE 'L' END AS result
FROM match
WHERE league_id = 1729 AND season = '2008/2009'
UNION 
SELECT awayteam_id AS team_id,away_goal AS goals_for,home_goal AS goals_against,
CASE 
    WHEN home_goal < away_goal THEN 'W'
    WHEN home_goal = away_goal THEN 'D'
    ELSE 'L' END AS result
FROM match
WHERE league_id = 1729 AND season = '2008/2009';

SELECT team.team_long_name, SUM(goals_for),SUM(goals_against)
FROM match_results
JOIN team
ON match_results.team_id = team.team_api_id
GROUP BY team.team_long_name;

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
WHERE league_id = 1729 AND season = '2008/2009' AND hometeam_id = 9825 OR awayteam_id = 9825;

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

SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
FROM(
    SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
    FROM match
    WHERE league_id = 1729 AND season = '2008/2009') as m
WHERE hometeam_id = 9825 OR awayteam_id = 9825;

SELECT date, season, hometeam_id, awayteam_id,home_goal,away_goal
FROM(
    SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
    FROM match
    WHERE league_id = 1729 AND season = '2008/2009') as m
WHERE hometeam_id = 9825 OR awayteam_id = 9825;

-- Arsenal Results
CREATE OR REPLACE VIEW arsenal_results AS
SELECT hometeam_id AS team_id,home_goal AS goals_for,away_goal AS goals_against,
CASE 
    WHEN home_goal > away_goal THEN 'W'
    WHEN home_goal = away_goal THEN 'D'
    ELSE 'L' END AS result
FROM(
    SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
    FROM match
    WHERE league_id = 1729 AND season = '2008/2009') as m1
WHERE hometeam_id = 9825
UNION ALL
SELECT awayteam_id AS team_id,away_goal AS goals_for,home_goal AS goals_against,
CASE 
    WHEN home_goal < away_goal THEN 'W'
    WHEN home_goal = away_goal THEN 'D'
    ELSE 'L' END AS result
FROM(
    SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
    FROM match
    WHERE league_id = 1729 AND season = '2008/2009') as m2
WHERE awayteam_id = 9825;

-- table structure
SELECT team_long_name AS team,
COUNT(result) AS games_played,
SUM(CASE WHEN result = 'W' THEN 1 ELSE 0 END) as games_won,
SUM(CASE WHEN result = 'D' THEN 1 ELSE 0 END) as games_drawn,
SUM(CASE WHEN result = 'L' THEN 1 ELSE 0 END) as games_lost,
SUM(goals_for) AS goals_for, 
SUM(goals_against) as goals_against,
SUM(goals_for)-SUM(goals_against) AS goal_difference,
SUM(
    CASE
        WHEN result = 'W' THEN 3
        WHEN result = 'D' THEN 1
        ELSE 0 END
) as points
FROM match_results
LEFT JOIN team
ON match_results.team_id = team.team_api_id
GROUP BY team_long_name
ORDER BY points DESC, goal_difference DESC;

-- Mtch Results
CREATE OR REPLACE VIEW match_results AS
SELECT hometeam_id AS team_id,home_goal AS goals_for,away_goal AS goals_against,
CASE 
    WHEN home_goal > away_goal THEN 'W'
    WHEN home_goal = away_goal THEN 'D'
    ELSE 'L' END AS result
FROM(
    SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
    FROM match
    WHERE league_id = 1729 AND season LIKE '2008%') as m1
UNION ALL
SELECT awayteam_id AS team_id,away_goal AS goals_for,home_goal AS goals_against,
CASE 
    WHEN home_goal < away_goal THEN 'W'
    WHEN home_goal = away_goal THEN 'D'
    ELSE 'L' END AS result
FROM(
    SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
    FROM match
    WHERE league_id = 1729 AND season LIKE '2008%') as m2;

-- Nested Subquery to Create Points Table and Match

SELECT *, ROW_NUMBER() OVER (ORDER BY points DESC) AS id
FROM(
SELECT team_long_name AS team,
COUNT(result) AS games_played,
SUM(CASE WHEN result = 'W' THEN 1 ELSE 0 END) as games_won,
SUM(CASE WHEN result = 'D' THEN 1 ELSE 0 END) as games_drawn,
SUM(CASE WHEN result = 'L' THEN 1 ELSE 0 END) as games_lost,
SUM(goals_for) AS goals_for, 
SUM(goals_against) as goals_against,
SUM(goals_for)-SUM(goals_against) AS goal_difference,
SUM(
    CASE
        WHEN result = 'W' THEN 3
        WHEN result = 'D' THEN 1
        ELSE 0 END
) as points
FROM 
    (SELECT hometeam_id AS team_id,home_goal AS goals_for,away_goal AS goals_against,
    CASE 
        WHEN home_goal > away_goal THEN 'W'
        WHEN home_goal = away_goal THEN 'D'
        ELSE 'L' END AS result
    FROM(
        SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
        FROM match
        WHERE league_id = 1729 AND season = '2008/2009') as m1
    UNION ALL
    SELECT awayteam_id AS team_id,away_goal AS goals_for,home_goal AS goals_against,
    CASE 
        WHEN home_goal < away_goal THEN 'W'
        WHEN home_goal = away_goal THEN 'D'
        ELSE 'L' END AS result
    FROM(
        SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
        FROM match
        WHERE league_id = 1729 AND season = '2008/2009') as m2) AS match_result
LEFT JOIN team
ON match_result.team_id = team.team_api_id
GROUP BY team_long_name
ORDER BY points DESC, goal_difference DESC) AS league_table;

-- Match Results
WITH home AS (
  SELECT m.league_id AS league_id, m.season AS season_id ,m.id, TO_CHAR(m.date :: DATE, 'Mon dd, yyyy') as date, 
  		 t.team_long_name AS hometeam, m.home_goal
  FROM match AS m
  LEFT JOIN team AS t 
  ON m.hometeam_id = t.team_api_id
  WHERE m.league_id = 1729 AND m.season LIKE '2008%'),
-- Declare and set up the away CTE
away AS (
  SELECT m.league_id AS league_id, m.season AS season_id, m.id, TO_CHAR(m.date :: DATE, 'Mon dd, yyyy') as date, 
  		 t.team_long_name AS awayteam, m.away_goal
  FROM match AS m
  LEFT JOIN team AS t 
  ON m.awayteam_id = t.team_api_id
  WHERE m.league_id = 1729 AND m.season LIKE '2008%')
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

SELECT *, ROW_NUMBER() OVER (ORDER BY points DESC) AS id
FROM(
SELECT team_long_name AS team,
ROW_NUMBER() OVER (ORDER BY team_long_name) AS id,
COUNT(result) AS games_played,
SUM(CASE WHEN result = 'W' THEN 1 ELSE 0 END) as games_won,
SUM(CASE WHEN result = 'D' THEN 1 ELSE 0 END) as games_drawn,
SUM(CASE WHEN result = 'L' THEN 1 ELSE 0 END) as games_lost,
SUM(goals_for) AS goals_for, 
SUM(goals_against) as goals_against,
SUM(goals_for)-SUM(goals_against) AS goal_difference,
SUM(
    CASE
        WHEN result = 'W' THEN 3
        WHEN result = 'D' THEN 1
        ELSE 0 END
) as points
FROM 
    (SELECT hometeam_id AS team_id,home_goal AS goals_for,away_goal AS goals_against,
    CASE 
        WHEN home_goal > away_goal THEN 'W'
        WHEN home_goal = away_goal THEN 'D'
        ELSE 'L' END AS result
    FROM(
        SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
        FROM match
        WHERE league_id = 4769 AND season LIKE '2008%') as m1
    UNION ALL
    SELECT awayteam_id AS team_id,away_goal AS goals_for,home_goal AS goals_against,
    CASE 
        WHEN home_goal < away_goal THEN 'W'
        WHEN home_goal = away_goal THEN 'D'
        ELSE 'L' END AS result
    FROM(
        SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
        FROM match
        WHERE league_id = 4769 AND season LIKE '2008%') as m2) AS match_result
LEFT JOIN team
ON match_result.team_id = team.team_api_id
GROUP BY team_long_name
ORDER BY points DESC, goal_difference DESC) AS league_table;

SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
FROM match
WHERE league_id = 1729 AND season LIKE '2008%';

SELECT MAX(date) from match;

SELECT DISTINCT(season) FROM match WHERE league_id = 1729 AND season LIKE '2008%';

SELECT DISTINCT(team_long_name)
FROM match AS m
INNER JOIN team as t
ON m.hometeam_id = t.team_api_id
WHERE league_id = 1729 AND season LIKE '2008%';

--Results of Match home and away goals by season and league
WITH home AS (
  SELECT m.league_id AS league_id, m.season AS season_id ,m.id, TO_CHAR(m.date :: DATE, 'FMDay, FMdd FMMonth FMyyyy') as date, m.date AS match_date,
  		 t.team_long_name AS hometeam, m.home_goal
  FROM match AS m
  LEFT JOIN team AS t 
  ON m.hometeam_id = t.team_api_id
  WHERE m.league_id = 1729 AND m.season LIKE '2008%'),
-- Declare and set up the away CTE
away AS (
  SELECT m.league_id AS league_id, m.season AS season_id, m.id, TO_CHAR(m.date :: DATE, 'FMDay, FMdd FMMonth FMyyyy') as date, m.date AS match_date,
  		 t.team_long_name AS awayteam, m.away_goal
  FROM match AS m
  LEFT JOIN team AS t 
  ON m.awayteam_id = t.team_api_id
  WHERE m.league_id = 1729 AND m.season LIKE '2008%')
-- Select date, home_goal, and away_goal
SELECT    
	  home.date,
    home.hometeam AS hometeam,
    away.awayteam AS awayteam,
    home.home_goal,
    away.away_goal
-- Join away and home on the id column
FROM home
INNER JOIN away
ON home.id = away.id
WHERE hometeam = 'Everton' OR awayteam = 'Everton'
ORDER BY home.match_date
LIMIT 50;



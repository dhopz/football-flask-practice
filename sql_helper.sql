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
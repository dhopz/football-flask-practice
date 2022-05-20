SELECT DISTINCT(team_long_name), m.season
FROM match AS m
INNER JOIN team as t
ON m.hometeam_id = t.team_api_id
WHERE league_id = {league} AND season LIKE '{season}'
-- Nested Subquery to Create Points Table and Match Results 1729 '2008/2009'
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
        WHERE league_id = {league} AND season LIKE '{season}') as m1
    UNION ALL
    SELECT awayteam_id AS team_id,away_goal AS goals_for,home_goal AS goals_against,
    CASE 
        WHEN home_goal < away_goal THEN 'W'
        WHEN home_goal = away_goal THEN 'D'
        ELSE 'L' END AS result
    FROM(
        SELECT date, season,hometeam_id,awayteam_id,home_goal,away_goal
        FROM match
        WHERE league_id = {league} AND season LIKE '{season}') as m2) AS match_result
LEFT JOIN team
ON match_result.team_id = team.team_api_id
GROUP BY team_long_name
ORDER BY points DESC, goal_difference DESC;

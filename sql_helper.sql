SELECT league.name AS league, country.name AS country 
FROM league
INNER JOIN country
ON league.country_id = country.id;
# Football Flask PSQL API

As an aspiring developer, I wanted to build on my knowledge from Makers and expand my SQL query language to include Subqueries, CASE statements, SET theory, joins, Correlated Queries and Nested Queries. All the queries. There is also an attempt to display the data via React, and the use of Javascript.


## Getting Started

### Prerequisites

Kindly ensure you have the following installed:
- [ ] [Python 3.8](https://www.python.org/downloads/release/python-389/)
- [ ] [Pip](https://pip.pypa.io/en/stable/installing/)
- [ ] [PostgreSQL](https://www.postgresql.org/)

### Setting up + Running

1. Clone the repo:

    ```
    $ git clone https://github.com/dhopz/football-flask-practice.git
    $ cd football-flask-practice
    ```

2. With Python 3.8 and Pip installed:

    ```
    $ virtualenv --python=python3 env --no-site-packages
    $ source venv/bin/activate
    $ pip install -r requirements.txt
    ```

3. Create a PostgreSQL user with the username and password `postgres` and create a database called `soccer`:

    ```
   $ createdb soccer
    ```

4. Export the required environment variables:

    ```
    $ export FLASK_APP=app.py
    $ export PATH=/usr/local/bin:$PATH
    ```

5. Execute the migrations to create the `soccer` table and run python3 `init_db.py` to create the SQL logic for the rankings :

    ```
    $ flask db migrate
    $ flask db upgrade
    $ python3 init_db.py
    ```

6. Run the Flask API:

    ```
    $ flask run
    ```

7. CD to Frontend and Run the Frontend

   ```
   $ npm start
   ``` 

7. Navigate to `http://localhost:3000` to navigate the data.

8. This is the data I was aiming to represent and my results;

![Alt text](/goal.png?raw=true "Goal") ![Alt text](/Result.png?raw=true "Result")
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_USERNAME = os.getenv('DATABASE_USERNAME')

engine = create_engine("postgresql+psycopg2://"+DATABASE_USERNAME+":postgres@localhost/soccer")

# Initialize the session
session = Session(engine)
query = """
SELECT * FROM league
"""

session.execute(query)
session.commit()
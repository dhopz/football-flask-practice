from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')

    db.init_app(app)
    migrate.init_app(app,db)

    with app.app_context():
        from .home import routes  # Import routes
        db.create_all()  # Create sql tables for our data models

        app.register_blueprint(home.routes.home_bp)

        return app
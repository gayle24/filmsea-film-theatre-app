from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api, Resource

db = SQLAlchemy()
app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///filmmaker_theatres.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)
bcrypt = Bcrypt(app)
app.secret_key = 'super secret key'
api = Api(app)
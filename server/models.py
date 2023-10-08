from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from setup import db, bcrypt


class Filmmaker(db.Model, SerializerMixin):
    __tablename__ = 'filmmakers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    films = db.relationship('Film', back_populates='filmmakers')
    serialize_rules = ('-films.filmmakers',)

class Theatre(db.Model, SerializerMixin):
    __tablename__ = 'theatres'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    ticket_price = db.Column(db.Integer)

    films = db.relationship('Film', back_populates='theatres')

    serialize_rules = ('-films.theatres',)

class Film(db.Model, SerializerMixin):
    __tablename__ = 'films'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image_url = db.Column(db.String)
    filmmaker_id = db.Column(db.Integer, db.ForeignKey('filmmakers.id'))
    theatre_id = db.Column(db.Integer, db.ForeignKey('theatres.id'))
    # users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    duration = db.Column(db.Integer)
    screening_time = db.Column(db.DateTime)
    tickets_available = db.Column(db.Integer)

    filmmakers = db.relationship('Filmmaker', back_populates='films')
    theatres = db.relationship('Theatre', back_populates='films')
    # users = db.relationship('User', back_populates='films')
    serialize_rules = ('-theatres.films',)
    serialize_rules = ('-filmmakers.films',)
    # serialize_rules = ('-users.films',)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    # films = db.relationship('Film', back_populates='users')
    _password_hash = db.Column(db.String, nullable=False)

    # serialize_rules = ('-films.users',)

    @hybrid_property
    def password_hash(self):
        return {"message": "You can't view password hashes"}
    
    @password_hash.setter
    def password_hash(self, password):
        our_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = our_hash.decode('utf-8')
        # return(our_hash.decode('utf-8'))

    def validate_password(self, password):
        is_valid = bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
        return is_valid
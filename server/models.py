from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from setup import bcrypt,db

class FilmMaker(db.Model, SerializerMixin):
    __tablename__ = 'filmmakers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    theatres = db.relationship('Theatre', secondary='films', back_populates='filmmakers')

class Theatre(db.Model, SerializerMixin):
    __tablename__ = 'theatres'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    ticket_price = db.Column(db.Integer)

    filmmakers = db.relationship('Filmmaker', secondary='Films', back_populates='theatres')

class Films(db.Model, SerializerMixin):
    __tablename__ = 'films'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    filmmaker_id = db.Column(db.Integer, ForeignKey='filmmakers.id')
    theatre_id = db.Column(db.Integer, ForeignKey='theatres.id')
    duration = db.Column(db.Integer)
    screening_time = db.Column(db.DateTime)

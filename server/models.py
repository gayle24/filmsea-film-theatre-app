from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from setup import bcrypt,db

class FilmMaker(db.Model, SerializerMixin):
    __tablename__ = 'filmmakers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    theatres = db.relationship('Theatres', secondary='films', back_populates='filmmakers')

class Theatre(db.Model, SerializerMixin):
    __tablename__ = 'theatres'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    capacity = db.Column(db.Integer)
    ticket_price = db.Column
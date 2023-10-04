from random import sample, randint, choice
from faker import Faker
from datetime import datetime, timedelta
from setup import db, app
from models import Filmmaker, Theatre, Film
fake = Faker()

movie_names = [
    "Whispers of the Heart",
    "Echoes in the Night",
    "Fragments of Love",
    "Secrets of the Past",
    "Tears of Redemption",
    "Sins of the Soul",
    "Promises Kept",
    "Shadows of Deception",
    "Lost in Love's Embrace",
    "Dancing with Fate",
    "The Healing Touch",
    "Beneath the Moonlight",
    "In Search of Tomorrow",
    "Forgotten Dreams",
    "A Love Beyond Time",
    "Eternal Whispers",
    "Whispers from the Past",
    "Passion's Promise",
    "Midnight Serenade",
    "Enchanted Hearts",
]

with app.app_context():
    # Clear existing data
    db.session.query(Film).delete()
    db.session.query(Filmmaker).delete()
    db.session.query(Theatre).delete()
    db.session.commit()

    # Create filmmakers
    filmmakers = []
    for _ in range(5):  # You can adjust the number of filmmakers
        filmmaker = Filmmaker(
            name=fake.name()
        )
        filmmakers.append(filmmaker)
        db.session.add(filmmaker)

    # Create theatres
    theatres = []
    for _ in range(5):  # You can adjust the number of theatres
        theatre = Theatre(
            name=fake.company(),
            ticket_price=randint(10, 50)  # You can adjust ticket prices as needed
        )
        theatres.append(theatre)
        db.session.add(theatre)

    # Commit the filmmakers and theatres before creating films
    db.session.commit()

    # Create films
    films = []
    for movie in movie_names:
        screening_time = fake.date_time_between(start_date=datetime(2023, 12, 1), 
                                                end_date=datetime(2024, 12, 31))
        film = Film(
            name=movie,
            image_url = fake.image_url(),
            filmmaker_id=choice(filmmakers).id,
            theatre_id=choice(theatres).id,
            duration=randint(60, 180),
            screening_time=screening_time,
            tickets_available=randint(10, 100)
        )
        films.append(film)
        db.session.add(film)

    # Commit the films
    db.session.commit()

    print(f'Image URL: {fake.image_url()}')

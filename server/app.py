from flask import make_response , jsonify, session, request
from setup import app, Resource, api, db
from models import Filmmaker, Theatre, Film, User

@app.route('/')
def index():
    response = make_response(
        '<h1>Welcome to the FilmSea backend directory!</h1>',
        200
    )
    return response

class Filmmakers(Resource):
    def get(self):
        filmmakers = Filmmaker.query.all()
        response_dict_list = []
        for item in filmmakers:
            response_dict = item.to_dict()
            response_dict_list.append(response_dict)
        response = make_response(
            jsonify(response_dict_list),
            200
        )
        return response
api.add_resource(Filmmakers, '/filmmakers')

class Theatres(Resource):
    def get(self):
        theatres = Theatre.query.all()
        response_dict_list = []
        for item in theatres:
            response_dict = item.to_dict()
            response_dict_list.append(response_dict)
        response = make_response(
            jsonify(response_dict_list),
            200
        )
        return response
api.add_resource(Theatres, '/theatres')

class Films(Resource):
    def get(self):
        films = Film.query.all()
        response_dict_list = []
        for item in films:
            response_dict = item.to_dict()
            response_dict_list.append(response_dict)
        response = make_response(
            jsonify(response_dict_list),
            200
        )
        return response
api.add_resource(Films, '/films')

class SignUp(Resource):
    def post(self):
        userData = request.get_json()
        username = userData['username']
        password = userData['password']

        print(username, password)

        new_user = User(username=username)
        new_user.password_hash = password

        db.session.add(new_user)
        db.session.commit()
        session['random_user'] = new_user.id

        return {"message": "New user created"}, 201
api.add_resource(SignUp, '/signup')


if __name__ == '__main__':
    app.run(debug=True)
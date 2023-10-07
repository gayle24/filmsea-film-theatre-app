from flask import make_response , jsonify, session, request
from setup import app, Resource, api, db
from models import Filmmaker, Theatre, Film, User



# @app.before_request
# def check_valid_user():
#     print(session.get('random_user'))
#     if not session.get('random_user') and request.endpoint != "sign_up":
#         return {"message": "You cannot access this route"}, 403

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

class FilmsByID(Resource):
    def get(self, id):
        film = Film.query.filter_by(id=id).first()
        if film:
            response_dict = film.to_dict()
            status_code = 200
        else:
          response_dict = {"error": "Film not found"}
          status_code = 200
        response = make_response(
                jsonify(response_dict),
                200
            )
        return response
    
    def patch(self, id):
        film = Film.query.filter_by(id=id).first()
        if not film:
            return {"error": "Film not found"}, 404
        data = request.get_json()

        if 'tickets_available' in data:
            try:
                # Update the 'tickets_available' attribute of the film
                film.tickets_available = int(data['tickets_available'])
                db.session.commit()
                return {"message": "Tickets available updated successfully"}, 200
            except ValueError:
                return {"error": "Invalid 'tickets_available' value"}, 400
        else:
            return {"error": "Missing 'tickets_available' in request data"}, 400
api.add_resource(FilmsByID, '/films/<int:id>')

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
api.add_resource(SignUp, '/signup', endpoint='sign_up')

class Login(Resource):
    def post(self):
        # Get the login data from the request JSON
        login_data = request.get_json()
        username = login_data.get('username')
        password = login_data.get('password')

        if not username or not password:
            return {"message": "Username and password are required"}, 400
        
        user = User.query.filter_by(username=username).first()
        if not user:
            return {"message": "User not found"}, 404

        if not user.validate_password(password):
            return {"message": "Invalid password"}, 401
        
        session['user_id'] = user.id
        return {"message": "Login successful"}, 200

api.add_resource(Login, '/login')

class Delete(Resource):
    pass
api.add_resource(Delete, '/delete')



if __name__ == '__main__':
    app.run(debug=True)
from flask import make_response , jsonify, session, request, render_template
from setup import app, Resource, api, db
from models import Filmmaker, Theatre, Film, User

from dotenv import load_dotenv
load_dotenv()

import os  # Import os here

# ...

flask_env = os.environ.get("FLASK_ENV")

if flask_env == "production":
    # Configure your app for production
    app.config["DEBUG"] = False
else:
    # Configure your app for development
    app.config["DEBUG"] = True

# @app.before_request
# def check_if_logged_in():
#     if not session['user_id'] \
#         and request.endpoint != 'signup' and request.endpoint != 'login':
#         return {'error': 'Unauthorized'}, 401

@app.route('/')
def index():
    return render_template('index.html')


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
                return film.to_dict(), 200
            except ValueError:
                return {"error": "Invalid 'tickets_available' value"}, 400
        else:
            return {"error": "Missing 'tickets_available' in request data"}, 400
api.add_resource(FilmsByID, '/films/<int:id>')

class Users(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            response_dict = user.to_dict()
            status_code = 200
        else:
          response_dict = {"error": "Film not found"}
          status_code = 200
        response = make_response(
                jsonify(response_dict),
                200
            )
        return response

class Login(Resource):
    def post(self):
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
        
        response_data = {
            "message": "Login successful",
            "user_id": user.id
        }
        
        session['user_id'] = user.id
        return response_data, 200 

api.add_resource(Login, '/login', endpoint='login')

class SignUp(Resource):
    def post(self):
        userData = request.get_json()
        username = userData['username']
        password = userData['password']

        new_user = User(username=username)
        new_user.password_hash = password

        db.session.add(new_user)
        db.session.commit()
        session['random_user'] = new_user.id
        
        response_data = {
            "message": "New user created",
            "user_id": new_user.id
        }
        
        return response_data, 201

api.add_resource(SignUp, '/signup', endpoint='signup')


class Logout(Resource):
    def post(self):
        if 'user_id' in session:
            del session['user_id']
            return {"message": "User session deleted"}, 200
        else:
            return {"message": "No user session to delete"}, 200
api.add_resource(Logout, '/logout')

class DeleteUser(Resource):
    def delete(self):
        if 'user_id' in session:
            user_id = session['user_id']
            user = User.query.get(user_id)
            if user:
                  db.session.delete(user)
                  db.session.commit()
                  return {"message": "User account deleted"}, 200
            else:
                  return {"error": "User not found"}, 404
        else:
            return {"error": "User not authenticated"}, 401
api.add_resource(DeleteUser, '/delete')



if __name__ == '__main__':
    app.run(debug=True)
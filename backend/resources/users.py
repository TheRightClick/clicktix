
import models
import jwt
import datetime
import os
from functools import wraps
from flask import Blueprint, request, jsonify, session
from flask_bcrypt import generate_password_hash, check_password_hash               
from playhouse.shortcuts import model_to_dict
from flask_login import login_user, logout_user 
users = Blueprint('user','users')

users.secret_key = os.environ.get("APP_SECRET")


def check_token(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message': 'missing token'}), 403
        try:
            data = jwt.decode(token, users.secret_key)
        except:
            return jsonify({'message': 'invalid token'}), 403
        return func(*args, **kwargs)
    return wrapped




@users.route('/', methods=['GET'])
def test_user_resource():
    return "user resource works"

@users.route('/register', methods=['POST'])
def register():
    payload = request.get_json()


    payload['email'] = payload['email'].lower()

    payload['username'] = payload['username'].lower()
    print(payload)

 
    try:
    
        models.Users.get(models.Users.email == payload['email'])

        return jsonify(
            data={},
            message=f"A user with the email {payload['email']} already exists",
            status=401
        ), 401
    except models.DoesNotExist: 
        pw_hash = generate_password_hash(payload['password'])

        # create 
        created_user = models.Users.create(
            username=payload['username'],
            email=payload['email'],
            password=pw_hash
        )

        print(created_user)

  
        login_user(created_user)

        
        created_user_dict = model_to_dict(created_user)


        print(type(created_user_dict['password']))
        
        created_user_dict.pop('password')

        token = jwt.encode({
                'user': created_user_dict,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=20)
            }, users.secret_key)

        
        return jsonify(
            token=token,
            data=created_user_dict,
            message=f"Successfully registered user {created_user_dict['email']}",
            status=201
        ), 201



@users.route('/login', methods=['GET', 'POST'])
def login():
    payload = request.get_json()
    
    payload['username'] = payload['username'].lower()

    try:
        user = models.Users.get(models.Users.username == payload['username'])

        user_dict = model_to_dict(user)

        password_is_good = check_password_hash(user_dict['password'],
        payload['password'])

        if (password_is_good):
            login_user(user)
        


            user_dict.pop('password')
            token = jwt.encode({
                'user': user_dict,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=20)
            }, users.secret_key)

            return jsonify(
                data={},
                token = token,
                message=f"succesfully logged in {user_dict['email']}",
                status=200
            ), 200
        else:
            print('pw is no good')

            return jsonify(
                data={},
                message="email or password is incorrect",
                status=401
            ), 401

    except models.DoesNotExist:
        print('username does not exist')

        return jsonify(
            data={},
            message="email or password is incorrect",
            status=401
        ), 401

@users.route('/logout', methods=["GET"])
def logout():
    logout_user() 
    return jsonify(
        data={}, 
        status=200, 
        message= 'successful logout'
    ), 200
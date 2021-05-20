import models
from flask import Blueprint, jsonify, request, session
from playhouse.shortcuts import model_to_dict
from flask_login import current_user, login_required


dogs = Blueprint('dogs', 'dogs')



@dogs.route('/', methods=['GET'])
@login_required
def dogs_index():
    dog_dicts = [model_to_dict(dog) for dog in current_user.my_dogs] 
    return jsonify({
        'data': dog_dicts,
        'message': f"Successfully found {len(dog_dicts)} dogs",
        'status': 200
    }), 200 






#create post route

@dogs.route('/', methods=['POST'])
@login_required
def create_dog():
   
    payload = request.get_json() 
    print(payload) 
    new_dog = models.Dog.create(name = payload['name'], age=payload['age'], owner=current_user.id, breed=payload['breed'])


    dog_dict = model_to_dict(new_dog) 

    return jsonify(
        data = dog_dict,
        message="sucessfully, created a dog.",
        status= 201
        ), 201
    




#UPDATE ROUTE
#PUT
@dogs.route('/<id>', methods=['PUT'])
@login_required
def update_dog(id):
    payload = request.get_json()
   
    models.Dog.update(**payload).where(models.Dog.id==id).execute()

    updatedDog = model_to_dict(models.Dog.get_by_id(id))


    return jsonify(
      
        data = updatedDog,
        status=204,
        message='resource updated',
    ), 204


#DELETE ROUTE
#DELETE

@dogs.route('/<id>', methods=['DELETE'])
@login_required
def delete_dog(id):
    # ['Access-Control-Allow-Origin'] = request.headers['Origin'] 
    # ['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
    models.Dog.delete().where(models.Dog.id==id).execute()
   
    return jsonify(
        data={},
        message='dog deleted',
        status=202
    ), 202

import models
from flask import Blueprint, jsonify, request, session
from playhouse.shortcuts import model_to_dict
from flask_login import current_user, login_required


notes = Blueprint('notes', 'notes')


@notes.route('/', methods=['GET'])
@login_required
def notes_index():
    payload = request.get_json()
    query = models.Notes.select().where(models.Notes.ticket_id==payload['ticket_id'])
    query_dict = [model_to_dict(note) for note in query]
    # notes_dicts = [model_to_dict(notes) for notes in query.ticket_notes] 
    return jsonify({
        'data': query_dict,
        'message': f"Successfully found {len(query_dict)} notes",
        'status': 200
    }), 200 


#CREATE POST ROUTE
@notes.route('/', methods=['POST'])
@login_required
def create_note():
    payload = request.get_json() 
    print(payload) 
    new_note = models.Notes.create(note = payload['note'], note_by=current_user.id, ticket_id=payload['ticket_id'])
    note_dict = model_to_dict(new_note) 

    return jsonify(
        data = note_dict,
        message="created note.",
        status= 201
        ), 201
    


#UPDATE PUT ROUTE
#PUT
@notes.route('/<id>', methods=['PUT'])
@login_required
def update_note(id):
    payload = request.get_json()
   
    models.Notes.update(**payload).where(models.Note.id==id).execute()

    updatedNote = model_to_dict(models.Note.get_by_id(id))
    
    return jsonify(
        data = updatedNote,
        status=204,
        message='Note updated',
    ), 204



#DELETE

@notes.route('/<id>', methods=['DELETE'])
@login_required
def delete_note(id):
    payload = request.get_json()
    ticket_id = payload['ticket_id']
    models.Notes.delete().where(models.Note.ticket_id==ticket_id).execute()
    return jsonify(
        data={},
        message='Note(s) deleted',
        status=202
    ), 202

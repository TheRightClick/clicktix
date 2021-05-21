import models
from flask import Blueprint, jsonify, request, session
from playhouse.shortcuts import model_to_dict
from flask_login import current_user, login_required


tickets = Blueprint('tickets', 'tickets')


@tickets.route('/', methods=['GET'])
@login_required
def tickets_index():
    tix_dicts = [model_to_dict(ticket) for ticket in current_user.user_tix] 
    return jsonify({
        'data': tix_dicts,
        'message': f"Successfully found {len(tix_dicts)} tickets",
        'status': 200
    }), 200 


#CREATE POST ROUTE
@tickets.route('/', methods=['POST'])
@login_required
def create_ticket():
    payload = request.get_json() 
    print(payload) 
    new_ticket = models.Ticket.create(title = payload['title'], description = payload['description'], status=payload['status'], created_by=current_user.id, assignee=payload['assignee'])
    tix_dict = model_to_dict(new_ticket) 

    return jsonify(
        data = tix_dict,
        message="created ticket.",
        status= 201
        ), 201
    


#UPDATE PUT ROUTE
#PUT
@tickets.route('/<id>', methods=['PUT'])
@login_required
def update_ticket(id):
    payload = request.get_json()
   
    models.Ticket.update(**payload).where(models.Ticket.id==id).execute()

    updatedTicket = model_to_dict(models.Ticket.get_by_id(id))
    



    return jsonify(
        data = updatedTicket,
        status=204,
        message='Ticket updated',
    ), 204



#DELETE

@tickets.route('/<id>', methods=['DELETE'])
@login_required
def delete_ticket(id):
    # ['Access-Control-Allow-Origin'] = request.headers['Origin'] 
    # ['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
    models.Ticket.delete().where(models.Ticket.id==id).execute()
    # models.Notes.delete()where(models.Ticket.note_by==id).execute()
    return jsonify(
        data={},
        message='Ticket deleted',
        status=202
    ), 202

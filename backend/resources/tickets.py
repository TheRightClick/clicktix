import models
from datetime import datetime, time
from flask import Blueprint, jsonify, request, session
from playhouse.shortcuts import model_to_dict
from flask_login import current_user, login_required


tickets = Blueprint('tickets', 'tickets')




@tickets.route('/', methods=['GET', 'POST'])
@login_required
def tickets_index():
    payload = request.get_json()
    if request.method == 'POST':
        query1 = models.Ticket.select().where(models.Ticket.id == payload['id']).order_by(models.Ticket.id.desc())
        tix_dict = [model_to_dict(ticket) for ticket in query1]
        # tix_dict = model_to_dict(query1)
        # [ticket['assignee'].pop('password') for ticket in tix_dicts]
        # [ticket['created_by'].pop('password') for ticket in tix_dicts]
        return jsonify({
            'data': tix_dict,
            'message': f"Successfully found {len(tix_dict)} tickets",
            'status': 200
        }), 200 

    else:

        query = models.Ticket.select().where(models.Ticket.assignee == current_user.id).order_by(models.Ticket.id.desc())
        # tix_dicts = [model_to_dict(ticket) for ticket in current_user.user_tix]
        tix_dicts = [model_to_dict(ticket) for ticket in query]
        [ticket['assignee'].pop('password') for ticket in tix_dicts]
        [ticket['created_by'].pop('password') for ticket in tix_dicts]
        return jsonify({
            'data': tix_dicts,
            'message': f"Successfully found {len(tix_dicts)} tickets",
            'status': 200
        }), 200 


#CREATE POST ROUTE
@tickets.route('/new', methods=['POST'])
@login_required
def create_ticket():
    payload = request.get_json() 
    print(payload) 
    new_ticket = models.Ticket.create(title = payload['title'], description = payload['description'], status=payload['status'], created_by=current_user.id, assignee=payload['assignee'])
    tix_dict = model_to_dict(new_ticket) 

    models.Notes.create(note = payload['note'], note_by=current_user.id, ticket_id=tix_dict['id'])
    
    tix_dict['assignee'].pop('password')
    tix_dict['created_by'].pop('password')
    return jsonify(
        data = tix_dict['id'],
        message="created ticket.",
        status= 201
        ), 201




#UPDATE PUT ROUTE
#PUT
@tickets.route('/<id>', methods=['PUT'])
@login_required
def update_ticket(id):
    payload = request.get_json()
    day = datetime.now().strftime("%d/%m/%Y")
    now = datetime.now().strftime("%H:%M:%S")
    updated = model_to_dict(models.Ticket.get_by_id(id))
    
    query = models.Ticket.update(**payload).where(models.Ticket.id==id)
    query.execute()
    models.Ticket.update(last_update = f"{day} {now}") .where(models.Ticket.id==id).execute()
    
    
    updated['assignee'].pop('password')
    updated['created_by'].pop('password')
    
    
    return jsonify(
        data = updated,
        status=201,
        message='Ticket updated',
    ), 201



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

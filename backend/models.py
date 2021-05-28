from peewee import *
import datetime 
from flask_login import UserMixin


DATABASE = SqliteDatabase('tickets.sqlite')

class Users(UserMixin, Model):
    username=CharField(unique=True)
    email=CharField(unique=True)
    password=CharField()
    admin=BooleanField(default=0)
    class Meta:
        database = DATABASE



class Ticket(Model):
    # owner = ForeignKeyField(Users, backref='my_dogs')
    title = CharField()
    description = CharField()
    created_time = DateTimeField(default=datetime.datetime.now)
    status = CharField()
    created_by =  ForeignKeyField(Users)
    assignee = ForeignKeyField(Users, backref='user_tix')
    last_update = IntegerField(default=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
 

    class Meta:
        database = DATABASE 


class Notes(Model):
    note = CharField() 
    
    created_time = DateTimeField(default=datetime.datetime.now)
    note_by = ForeignKeyField(Users)
    ticket_id = ForeignKeyField(Ticket.id)
    # ticket_id = ForeignKeyField(Ticket.id, backref='notes_ordered')

    class Meta:
        database = DATABASE 

def initialize(): 
    DATABASE.connect() 

    DATABASE.create_tables([Users, Ticket, Notes], safe=True)
    print("Connected to the DB")

   
    DATABASE.close()
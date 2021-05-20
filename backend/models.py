from peewee import *
import datetime 
from flask_login import UserMixin


DATABASE = SqliteDatabase('dogs.sqlite')

class Users(UserMixin, Model):
    username=CharField(unique=True)
    email=CharField(unique=True)
    password=CharField()

    class Meta:
        database = DATABASE



class Dog(Model):
    name = CharField() 
    owner = ForeignKeyField(Users, backref='my_dogs')
    age = IntegerField()
    breed = CharField()
    
   
    created_at: DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = DATABASE 


def initialize(): 
    DATABASE.connect() 

    DATABASE.create_tables([Users, Dog], safe=True)
    print("Connected to the DB and created tables if they weren't already there")

   
    DATABASE.close()
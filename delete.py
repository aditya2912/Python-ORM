from main import Customer, Company, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


engine = create_engine('sqlite:///CustomerDatabase.db')

Base.metadata.bind = engine
DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()

customerName = input("enter the customer name to be deleted")
session.query(Customer).all()
try:
   customer = session.query(Customer).filter(Customer.name == customerName).delete()
   print("Customer record deleted")

except IOError:
    print("Unable to delete the specified customer")

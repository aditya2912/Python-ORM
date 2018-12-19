from main import Customer, Company, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///CustomerDatabase.db')

Base.metadata.bind = engine
DBSession = sessionmaker()
DBSession.bind = engine
session = DBSession()

customerName = input("Enter the name of the customer whose records are to be fetched")
session.query(Customer).all()
customer = session.query(Customer).filter(Customer.name == customerName).first()

updatedCustomerName = input("Enter the updated customer name")

customer.name = updatedCustomerName
session.commit()
print(customer.name)

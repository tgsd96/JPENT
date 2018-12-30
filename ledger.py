# Code to manage ledge online
from main import Ledger

def insertCredit(session, cust_id, value, date ):
    newLedger = Ledger(custid = cust_id,debit =  0, credit =  value,date =  date)
    session.add(newLedger)
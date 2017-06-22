#Imports
from flask import Flask,request
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
from flask_cors import CORS
import mysql.connector as mc
import os
import uuid
import datetime
import openpyxl as op
import thread

#App configs
app = Flask(__name__)
CORS(app)
api = Api(app)
UPLOAD_FOLDER = '/home/tushar/Documents'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/JPENT'
db = SQLAlchemy(app)
configs = {
    'cad' : {
        'start' : '7',
        'get': {
        'billno' : 'B',
        'date' : '',
        'party' : 'C',
        'tinno' : 'D',
        'billvalue' : 'R',
        'sales145' : 'J',
        'vat125' : 'K',
        'sat2' : 'L',
        'sales5' : '',
        'vat4' : '',
        'sat1' : '',
        'roff' : '',
        'disc1' : '',
        'disc2' : '',
        'disc3' : '',
        'disc4' : '',
        'disc5' : '',
        'disc6' : '',
        'disconsale' : '',
        },
        'end' : '0'
    },
    'col' : {
        'start' : '2',
        'get' : {
        'billno' : 'E',
        'date' : '',
        'party' : 'K',
        'tinno' : 'L',
        'billvalue' : 'AB',
        'sales145' : 'AA',
        'vat125' : 'U',
        'sat2' : 'W',
        'sales5' : '',
        'vat4' : '',
        'sat1' : '',
        'roff' : '',
        'disc1' : '',
        'disc2' : '',
        'disc3' : '',
        'disc4' : '',
        'disc5' : '',
        'disc6' : '',
        'disconsale' : '',
        },
        'end' : '0'
    },
    'god' : {
        'start' : '4',
        'get' : {
        'billno' : 'A',
        'date' : '',
        'party' : 'E',
        'tinno' : '',
        'billvalue' : 'W',
        'sales145' : 'S',
        'vat125' : 'T',
        'sat2' : 'P',
        'sales5' : 'Q',
        'vat4' : 'R',
        'sat1' : 'N',
        'roff' : '',
        'disc1' : '',
        'disc2' : '',
        'disc3' : '',
        'disc4' : '',
        'disc5' : '',
        'disc6' : '',
        'disconsale' : '',
        },
        'end' : '0'
    },
    'mar' : {
        'start' : '7',
        'get' : {
        'billno' : 'B',
        'date' : '',
        'party' : 'E',
        'tinno' : 'H',
        'billvalue' : 'AV',
        'sales145' : 'N',
        'vat125' : 'S',
        'sat2' : 'U',
        'sales5' : 'O',
        'vat4' : 'T',
        'sat1' : 'V',
        'roff' : '',
        'disc1' : '',
        'disc2' : '',
        'disc3' : '',
        'disc4' : '',
        'disc5' : '',
        'disc6' : '',
        'disconsale' : '',
        },
        'end' : '0'
    }
}

# Database classes
class purchases(db.Model):
    __tablename__ = 'purchases'
    id = db.Column('id',db.Integer,primary_key=True)
    custid = db.Column('custid',db.Integer)
    billno = db.Column('billno', db.String(200))
    date = db.Column('date', db.Date)
    billvalue = db.Column('billvalue', db.Float)
    sales145 = db.Column('sales145', db.Float)
    vat125 = db.Column('vat125', db.Float)
    sat2 = db.Column('sat2',db.Float)
    sales5 = db.Column('sales5', db.Float)
    vat4 = db.Column('vat4', db.Float)
    sat1 = db.Column('sat1',db.Float)
    roff = db.Column('roff', db.Float)

class mulcust(db.Model):
    __tablename__ = 'mulcust'
    id = db.Column('id', db.Integer, primary_key=True)
    custid = db.Column('custid', db.Integer)
    name = db.Column('name', db.String(200))

class uploaded(db.Model):

    def __init__(self,location,original,filename,company):
        # self.id = id
        self.location = location
        self.original = original
        self.filename = filename
        self.company = company


    id = db.Column('id', db.Integer, primary_key=True)
    location = db.Column('location', db.String(64))
    original = db.Column('original',db.String(256))
    filename = db.Column('filename', db.String(256))
    company = db.Column('company', db.String(10))
    date = db.Column('date',db.Date,default=datetime.datetime.now().date())



#API classes
class viewPurchases(Resource):
    #get method of this API point
    def get(self):
        purchasesList = []
        allPurchases = purchases.query.all()
        for each in allPurchases:
            if each.custid == -1 : 
                continue
            getNameQuery = mulcust.query.filter_by(custid = each.custid).first()
            name = getNameQuery.name
            purchaseDict = {
                'id' : str(each.id),
                'custid' : str(each.custid),
                'billno' : str(each.billno),
                'date' : str(each.date),
                'party' : name,
                'billvalue' : str(each.billvalue),
                'sales145' : str(each.sales145),
                'vat125' : str(each.vat125),
                'sat2' : str(each.sat2),
                'sales5' : str(each.sales5),
                'vat4' : str(each.vat4),
                'sat1' : str(each.sat1),
                'roff' : str(each.roff)
            }
            purchasesList.append(purchaseDict)
        return purchasesList

class uploadFile(Resource):
    def post(self,company):
        if 'upload' not in request.files:
            response.status = 404
            response.message = "No file given"
            return response
        file = request.files['upload']
        ext = os.path.splitext(file.filename)[1]
        f_name = str(uuid.uuid4())+ext
        newFile = uploaded(UPLOAD_FOLDER,file.filename,f_name,company)
        db.session.add(newFile)
        db.session.commit()
        file.save(os.path.join(UPLOAD_FOLDER,f_name))
        # store()
        with app.app_context():
            thread.start_new_thread(store,(os.path.join(UPLOAD_FOLDER,f_name),company))
        return "ok"



#api Endpoints
api.add_resource(viewPurchases, '/view')
api.add_resource(uploadFile, '/upload/<company>')

# Storing function

def store(filename,company):
    with app.app_context():
        wb = op.load_workbook(filename)
        sheet = wb.get_sheet_by_name(wb.get_sheet_names()[0])
        purchases = []
        for row in range(int(configs[company]['start']), sheet.max_row+int(configs[company]['end'])):
            purchase = {}
            for key,values in configs[company]['get'].items():
                if(values!=''):
                    # print(values+str(row))
                    purchase[key] = sheet[values+str(row)].value
                else:
                    purchase[key] = 0
            purchases.append(purchase)

        for i in range(len(purchases)):
            custid = -1
            getcustid = mulcust.query.filter_by(name=purchases[i]['party']).first()
            if getcustid is not None:
                custid = getcustid.custid
            purchases[i]['custid'] = custid
            purchases[i].pop('party')
            purchases[i].pop('tinno')
            purchases[i].pop('date')
            placeholders = ', '.join(["%s"] * len(purchases[i]))
            table = "purchases"
            columns = ', '.join(purchases[i].keys())
            sql = ("INSERT INTO %s ( %s ) VALUES ( %s )" % (table, columns, placeholders))
            db.engine.execute(sql,list(purchases[i].values()))
            db.session.commit()


def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()
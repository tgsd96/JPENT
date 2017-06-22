from flask import Flask,request
from flask_restful import Resource,Api
from flask_cors import CORS
import mysql.connector as mc
import simplejson as json
import os
import uuid

app = Flask(__name__)
CORS(app)
api = Api(app)
cnx = mc.connect(user="root",password="root",host="127.0.0.1",database="JPENT")
cur = cnx.cursor()

class Helloworld(Resource):
    def get(self):
        return {'Hellow': 'world'}

class ViewFullSheet(Resource):
    def get(self):
        cur.execute("select p.* from purchases p ")
        result = cur.fetchall()
        purchases = []
        for row in result:
            if(row[1]==-1):
                continue
            cur.execute("select name from mulcust where custid='%s'"%row[1])
            for x in cur :
                name = x
            purDict = {
                'id' : str(row[0]),
                'custid' : str(row[1]),
                'billno' : row[2],
                'date' : str(row[3]),
                'party' : name[0],
                'billvalue' : str(row[4]),
                'sales145' : str(row[5]),
                'vat125' : str(row[6]),
                'sat2' : str(row[7]),
                'sales5' : str(row[8]),
                'vat4' : str(row[9]),
                'sat1' : str(row[10]),
                'roff' : str(row[11]),
                'disc1' : str(row[12]),
                'disc2' : str(row[13]),
                'disc3' : str(row[14]),
                'disc4' : str(row[15]),
                'disc5' : str(row[16]),
                'disc6' : str(row[17]),
                'disconsale' : str(row[18]),
            }
            purchases.append(purDict)
        print len(purchases)
        return purchases
class uploadFile(Resource):
    def post(self):
        # print("here")
        if 'upload' not in request.files:
            print "No file"
            return "none"
        file = request.files['upload']
        ext = os.path.splitext(file.filename)[1]
        f_name = str(uuid.uuid4())+ext
        file.save(os.path.join('/home/tushar/Documents',f_name))
        print f_name
        return "ok"

# @app.route('/upload', methods=['GET','POST'])
# def upload():
#     if request.method == 'POST':
#         print("here")
#         # file = request.files[0]
#         # print file
#         # ext = os.path.splitext(file.filename)[1]
#         # f_name = str(uuid.uuid4())+ext
#         # file.save(os.path.join('~/Documents'),f_name)
#         # print f_name
#         return 'completed'
#     else:
#         return "working"

api.add_resource(Helloworld,'/')
api.add_resource(ViewFullSheet, '/view')
api.add_resource(uploadFile, '/upload')

def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()
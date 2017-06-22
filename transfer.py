import mysql.connector as mc
import openpyxl as op
#read the workbook to get the names
wb = op.load_workbook('Cust.xlsx')
# print (wb.get_sheet_names())
sheet = wb.get_sheet_by_name(wb.get_sheet_names()[5])
# print(sheet.title)

users = [] 
for row in range(2, sheet.max_row):
    custid = sheet['A'+str(row)].value
    name = sheet['B'+str(row)].value
    # tin = sheet['D'+str(row)].value
    users.append([name,custid])

for x in users:
    print x

cnx = mc.connect(user="root", password="root",host="127.0.0.1",database="JPENT")
cur = cnx.cursor()
#store users in the db
for user in users : 
    cur.execute("Insert  into mulcust(custid,name) VALUES ('%s','%s')"%(user[1],user[0]))

cnx.commit()
cnx.close()
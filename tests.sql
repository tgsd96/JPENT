SELECT distinct master.name,ct.* 
FROM crosstab(
    'select distinct custid,interface_code,sum(billvalue) 
    FROM PURCHASES 
    group by custid,interface_code order by 1,2')
     AS ct(cust_id int, COL float, MARG float), master_list master where master.cust_id=ct.cust_id order by ct.cust_id;

     SELECT * 
FROM crosstab(
    'select distinct custid,interface_code,sum(billvalue) 
    FROM PURCHASES 
    group by custid,interface_code order by 1,2')
     AS ct(cust_id int, COL float, MARG float)
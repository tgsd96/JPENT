select * from master_ret_list order by name;

select name from marg_ret_list except select name from master_ret_list where interface_code='MARG';

CREATE TABLE diff_marg_list as select name from marg_ret_list except select name from master_ret_list where interface_code='MARG';

select * from diff_marg_list;

create table temp_marg_list as select A.cust_id, A.name as m_name, B.name from master_ret_list A, diff_marg_list B where levenshtein(A.name, B.name)<3;

select * from temp_marg_list;

insert into master_ret_list(cust_id,name,interface_code) select A.cust_id,A.name,'MARG' from temp_marg_list where A.cust_id
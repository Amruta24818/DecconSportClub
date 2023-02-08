
use cybageProj;
drop database cybageProj;
show tables;

set foreign_key_checks=0;

show tables;
desc user;
desc sports;
desc pricing;
desc membership;
desc like_table;
desc enrolled_sports;
desc comments;





select * from user;
select * from sports;
select * from batches;
select * from pricing;
select * from enrolled_sports;
select * from membership;
select * from like_table;
select * from comments;
update sports set manager_id=null where sports_id = 14;
insert into user values(default,"Mumbai",24,"AB+ve","admin@gmail.com","MALE",null,0,"1234567890","Admin Havoc","YWRtaW4xMjM=",null,"admin","ADMIN","2021-11-17");
insert into user values(default,"Mumbai",24,"AB+ve","bravo@gmail.com","MALE",0,"123456788","Bravo Havoc","YWRtaW4xMjM=",null,"bravo","MANAGER","2021-11-23",null);
insert into user values(default,"Mumbai",24,"AB+ve","echo@gmail.com","MALE",0,"123456788","Echo Havoc","YWRtaW4xMjM=",null,"echo","MANAGER","2021-11-23",null);
insert into user values(default,"Mumbai",24,"AB+ve","charlie@gmail.com","MALE",0,"123456788","Charlie Havoc","YWRtaW4xMjM=",null,"charlie","USER","2021-11-17",null);
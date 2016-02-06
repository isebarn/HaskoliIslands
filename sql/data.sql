.headers ON
.mode column

drop table if exists rides;
create table rides(
	id INTEGER primary key autoincrement,
	pickup int, 
	destination int,
	phone int
	);

insert into rides(pickup, destination, phone) values(0,4,8465182);
insert into rides(pickup, destination, phone) values(0,2,8452295);
insert into rides(pickup, destination, phone) values(1,3,8658844);

select * from rides;





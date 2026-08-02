--INSERT INTO User(name,email,password,role) VALUES("Amir Modibbo", "amiramer001@gmail.com","123456", "CLIENT" )

--INSERT INTO Clientprofile(UserId, Phone, Company) VALUES('1', '09094343344', 'Google')

--SELECT * FROM User

--SELECT * FROM Clientprofile

--SELECT * FROM UserNote

--SELECT COUNT(*) FROM User

--SELECT name, createdAt FROM User

--SELECT
--    name,
--    datetime(createdAt / 1000, 'unixepoch')
--FROM User;


--for search box
--SELECT * FROM User WHERE name LIKE 'A%' 

--OFFSET = (page - 1) × page_size


--page 1
--SELECT *
--FROM User
--ORDER BY id
--LIMIT 10 OFFSET 0;


--page 2
--SELECT *
--FROM User
--ORDER BY id
--LIMIT 10 OFFSET 10;   

--page 3

--SELECT *
--FROM User
--ORDER BY id
--LIMIT 10 OFFSET 20;




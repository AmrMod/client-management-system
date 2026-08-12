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

--INSERT INTO "SupportUnit" ("name", "createdAt")
--VALUES
   -- ('IT Helpdesk', datetime('now')),
    --('Academic Registry', datetime('now')),
    --('Academic Advising', datetime('now')),
    --('Finance / Bursary', datetime('now')),
    --('Human Resources', datetime('now')),
    --('Facilities Management', datetime('now')),
    --('Library & Digital Services', datetime('now')),
    --('Student Affairs', datetime('now')),
    --('Housing & Dining', datetime('now')),
    --('Health Center / Medical Services', datetime('now')),
    --('Safety & Security', datetime('now')),
    --('Career Services', datetime('now')),
    --('Writing Center', datetime('now')),
    --('Admissions', datetime('now')),
    --('Communications & Public Affairs', datetime('now')),
    --('Events & Ceremonies', datetime('now')),
    --('Fleet Management', datetime('now')),
    --('Procurement', datetime('now'));

SELECT * FROM Request

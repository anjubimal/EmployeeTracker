USE employee;
INSERT INTO departments(name)
VALUES ("engineering"),
("managment"),
("hr"),
("legal"),
("finance");

INSERT INTO roles(title, salary, department_id)
VALUES ("engineer", 4000, 1),
("accountant", 4000, 2),
("lawyer", 5000, 3),
("hr guy", 5000, 4),
("managment guy", 6000, 5);


INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("anju", "bimal", 1, NULL),
("a", "b", 2, NULL),
("anne", "some", 3, NULL),
("tia", "guy", 4, NULL),
("name","last", 5, NULL);


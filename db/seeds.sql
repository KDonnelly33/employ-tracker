INSERT INTO department (emp_name)
VALUES ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 115000, 1),
        ("Salesperson", 82000, 1),
        ("Lead Engineer", 140000, 2),
        ("Software Engineer", 110000, 2),
        ("Accountant Lead", 150000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Donnelly", 1, NULL),
        ("John", "Doe", 2, 1),
        ("Jane", "Done", 2, 1),
        ("Mike", "Smith", 3, NULL),
        ("Sarah", "Smithson", 4, 3),
        ("Peter", "Jones", 4, 3),
        ("Tom", "Joneson", 5, NULL),
        ("Sam", "Cake", 6, 5),
        ("Sally", "Jonns", 6, 5),
        ("Joe", "Duck", 7, NULL),
        ("Sue", "Duckson", 8, 7),
        ("Bob", "Ducky", 8, 7);
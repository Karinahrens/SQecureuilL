TRUNCATE post RESTART IDENTITY;

INSERT INTO post (title, content, date, categories, votes) 
VALUES
    ('post 1', 'content for post 1', DATE '2023/10/01', 'potholes', 0),
    ('post 2', 'content for post 2', DATE '2023/10/02', 'potholes', 0),
    ('post 3', 'content for post 3', DATE '2023/10/03', 'potholes', 0);
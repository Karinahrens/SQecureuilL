DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    /*user_id INT NOT NULL,*/
    post_title VARCHAR (100) NOT NULL,
    post_content VARCHAR (500) NOT NULL,
    post_date DATE NOT NULL,
    post_categories VARCHAR (100) NOT NULL,
    post_Status VARCHAR (100) DEFAULT 'Active' NOT NULL, 
    post_votes INT DEFAULT 0 NOT NULL,
    PRIMARY KEY (post_id)
    /*FOREIGN KEY (user_id) REFERENCES user_account("user_id")*/
);

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

INSERT INTO post
    (post_title, post_content, post_date,post_categories,post_votes)
VALUES
    ('Graffiti on School wall', 'Large Signs sprayed painted',DATE '2023/10/09', 'Graffiti',19),
('Potholes on Main City', 'Potholes in roadways are a frequent complaint, causing vehicle damage and safety hazards for drivers and pedestrians.', DATE '2023/09/28', 'Potholes',12),
    ('Noise Complaints', 'Residents often report excessive noise from neighbors, construction sites, or businesses, leading to disturbances and decreased quality of life.',DATE '2023/06/30', 'Noise disturbance',7),
    ('Traffic Congestion', 'Traffic jams, inadequate road infrastructure, and transportation issues are common frustrations for city dwellers.',DATE '2023/04/09', 'Traffic',6),
    ('Rubbish1', 'Black Bins dumped',DATE '2023/02/27', 'Fly tipping',3),
    ('Rubbish2', 'Black Bins dumped',DATE '2023/05/31', 'Fly tipping',6)

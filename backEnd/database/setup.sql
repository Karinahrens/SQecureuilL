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
    (post_title, post_content, post_date,post_categories)
VALUES
    ('Rubbish', 'Black Bins dumped',DATE '01/01/2023', 'Fly tipping'),
('Rubbish1', 'Black Bins dumped', DATE '02/01/2023', 'Fly tipping')
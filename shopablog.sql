DROP DATABASE shopablog;
CREATE DATABASE shopablog;

use shopablog;
CREATE TABLE User(
	user_id INT PRIMARY KEY AUTO_INCREMENT unique,
    email VARCHAR(50) unique,
    username VARCHAR(50),
    password VARCHAR(100),
    isEmailVerified boolean
    
    -- blog_id INT UNIQUE  --
);

CREATE TABLE Blog(
	blog_id INT PRIMARY KEY auto_increment unique, 
    title VARCHAR(150),
    subtitle VARCHAR(250),
	body TEXT,
    created_at DATE NOT NULL,
    image VARCHAR(500),
    price FLOAT,
    author_id int,
    FOREIGN KEY(author_id) REFERENCES User(user_id)
);

CREATE TABLE AuthorInBlogs(
	author_id INT,
    FOREIGN KEY(author_id) REFERENCES User(user_id),

	blog_id INT,
    FOREIGN KEY(blog_id) REFERENCES Blog(blog_id)
);

CREATE TABLE UserInBlogs(
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES USER(user_id),

    blog_id INT,
    FOREIGN KEY(blog_id) REFERENCES Blog(blog_id)
);

-- INSERT INTO User(email, username, password, isEmailVerified)
-- Values ("lukemwen619456@gmail.com", "Hollow Knight", "Password123", True),
-- 	("luke619456@gmail.com", "Alduin", "BandoBaby", True),
-- 	("xavierraverus@gmail.com", "Caius Cosades", "Nerevar", True),
-- 	("dutchsboys@gmail.com", "Sean Macguire", "BloodyIrish", False);

SELECT * from User;
SELECT * from User WHERE user_id=1;

INSERT INTO Blog(title, subtitle, body, author_id)
Values ("New AAA Game Dropped...", "Its going crazy in the commmunity", "You need to play this game asap...", 1),
	("National Minimum Wages has now increased...", "From April 2025 the Government will change the minimum wages", "This is now changing the game", 1),
    ("Skyrim after 10 Years is still Insane", "Its going crazy in the commmunity", "You need to play this game asap...", 1),
    ("A new fight between politicians", "Its going crazy in the court", "You need to watch this asap...", 1);
    
SELECT * FROM Blog;

SELECT Blog.author_id, User.user_id, User.email, User.username, Blog.title
FROM Blog INNER JOIN User ON Blog.author_id = User.user_id;
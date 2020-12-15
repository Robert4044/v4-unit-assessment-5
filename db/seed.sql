CREATE TABLE helo_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  profile_pic TEXT
)

CREATE TABLE helo_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(45) NOT NULL,
   img TEXT,
  content TEXT, 
  author_id INTEGER REFERENCES helo_users(id),
  date_created TIMESTAMP
)
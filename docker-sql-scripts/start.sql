CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  username VARCHAR(255)
);

INSERT INTO users (id, email, name, username) VALUES (1, 'me@site.com', 'Me', 'username');
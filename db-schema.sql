CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  password TEXT NOT NULL
);


CREATE TABLE libraries (
  library_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE,
  library_name TEXT,
  library_desc TEXT
);


CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  external_book_id TEXT,
  title TEXT NOT NULL,
  author TEXT,
  book_description TEXT,
  genre TEXT
);


CREATE TABLE library_books (
  user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE,
  library_id INTEGER REFERENCES libraries (library_id) ON DELETE CASCADE, 
  book_id INTEGER REFERENCES books (book_id) ON DELETE CASCADE,
  user_notes TEXT,
  user_rating INTEGER CHECK (user_rating > 0 AND user_rating <= 5),
  PRIMARY KEY (library_id, book_id, user_id)
  -- note: is it necessary to have user_id in library_books?
  -- Think about user's having libraries and libraries having books. 
);
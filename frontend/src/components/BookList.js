// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from './BookItem';
import BookForm from './BookForm';

function BookList() {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books', {
        params: { page, limit: 10, search },
      });
      setBooks(response.data.books);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error with getting a Book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, search]);

  const refreshBooks = () => fetchBooks();

  return (
    <div className="container mt-4 bg-dark text-white rounded p-4">
      <h1 className="text-center mb-4">Books Storage</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title, author, or genre"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>
      <BookForm
        refreshBooks={refreshBooks}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
      />
      <div className="row">
        {books.map((book) => (
          <div key={book._id} className="col-md-4 mb-3">
            <BookItem
              book={book}
              refreshBooks={refreshBooks}
              setSelectedBook={setSelectedBook}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between align-items-center my-3">
        <button
          className="btn btn-secondary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <span>
          Page {page} from {Math.ceil(total / 10)}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= Math.ceil(total / 10)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default BookList;



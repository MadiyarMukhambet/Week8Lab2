// src/components/BookItem.js
import React from 'react';
import axios from 'axios';

function BookItem({ book, refreshBooks, setSelectedBook }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${book._id}`);
      refreshBooks();
    } catch (error) {
      console.error('Error with deleting a Book', error);
    }
  };

  return (
    <div className="card h-100 bg-dark text-white">
      <div className="card-body bg-white text-dark">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
        <p className="card-text">
          Genre: {book.genre || '-'}<br />
          Year: {book.publicationYear || '-'}<br />
          Quantity: {book.quantityAvailable || 0}<br />
          Price: {book.price} tenge.
        </p>
      </div>
      <div className="card-footer d-flex justify-content-between bg-white">
        <button className="btn btn-primary btn-sm" onClick={() => setSelectedBook(book)}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookItem;
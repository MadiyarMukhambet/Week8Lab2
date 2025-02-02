// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookForm({ refreshBooks, selectedBook, setSelectedBook }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: '',
    quantityAvailable: '',
    price: '',
  });

  useEffect(() => {
    if (selectedBook) {
      setFormData({
        title: selectedBook.title,
        author: selectedBook.author,
        genre: selectedBook.genre || '',
        publicationYear: selectedBook.publicationYear || '',
        quantityAvailable: selectedBook.quantityAvailable || '',
        price: selectedBook.price,
      });
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedBook) {
        await axios.put(`http://localhost:5000/api/books/${selectedBook._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/books', formData);
      }
      setFormData({
        title: '',
        author: '',
        genre: '',
        publicationYear: '',
        quantityAvailable: '',
        price: '',
      });
      setSelectedBook(null);
      refreshBooks();
    } catch (error) {
      console.error('Error with saving a book:', error);
    }
  };

  const handleCancel = () => {
    setSelectedBook(null);
    setFormData({
      title: '',
      author: '',
      genre: '',
      publicationYear: '',
      quantityAvailable: '',
      price: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-light p-3 rounded">
      <h2>{selectedBook ? 'Edit Book' : 'Add Book'}</h2>
      <div className="row g-2">
        <div className="col-md-4">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="author"
            className="form-control"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="genre"
            className="form-control"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row g-2 mt-2">
        <div className="col-md-4">
          <input
            type="number"
            name="publicationYear"
            className="form-control"
            placeholder="Publication Year"
            value={formData.publicationYear}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            name="quantityAvailable"
            className="form-control"
            placeholder="Quantity Available"
            value={formData.quantityAvailable}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            step="0.01"
            name="price"
            className="form-control"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="mt-3">
        <button type="submit" className="btn btn-outline-dark me-2">
          {selectedBook ? 'Update a Book' : 'Add a Book'}
        </button>
        {selectedBook && (
          <button type="button" className="btn btn-outline-dark" onClick={handleCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;

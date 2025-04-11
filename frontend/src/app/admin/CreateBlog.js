"use client";

import { useState } from "react";
import { BASE_URL } from "../exportedDefinitions";

function CreateBlog()
{
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        body: '',
        price: '',
      });
    
      const [image, setImage] = useState(null);
      const [message, setMessage] = useState('');
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('title', formData.title);
        data.append('subtitle', formData.subtitle);
        data.append('body', formData.body);
        data.append('price', formData.price);

        // wont include image into db
        // if (image) {
        //   data.append('image', image);
        // }
    
        // Example POST request — replace with your API logic
        try {
          const res = await fetch(BASE_URL+"/blogs/create", {
            method: 'POST',
            body: JSON.stringify(data),
          });
    
          if (res.ok) {
            setMessage('Post created successfully!');
            setFormData({ title: '', subtitle: '', body: '', price: '' });
            setImage(null);
          } else {
            setMessage('Error creating post.');
          }
        } catch (err) {
          setMessage('Something went wrong.');
        }
      };
    
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Create New Blog Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
    
              <div>
                <label className="block font-semibold mb-1">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
    
              <div>
                <label className="block font-semibold mb-1">Body</label>
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
    
              <div>
                <label className="block font-semibold mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
    
              <div>
                <label className="block font-semibold mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>
    
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Submit Post
              </button>
    
              {message && <p className="text-center mt-4 text-sm text-gray-600">{message}</p>}
            </form>
          </div>
        </div>
    );
}

export default CreateBlog;
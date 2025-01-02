import React, { useState } from 'react';
import Layout from '@/components/Layout';


import '@/assets/css/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <Layout onLoad={() => {}} strict={false}>
      <div className="contact" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <img 
              src="/about_logo.png" 
              alt="NZ RMS Logo" 
              style={{ maxWidth: '150px', height: 'auto', marginBottom: '5px' }}
            />
            <h1 style={{ fontSize: '2.5em', fontWeight: 'bold', margin: '10px 0', color: '#0056b3' }}>Contact Us</h1>
            <p style={{ fontSize: '1.1em', color: '#555' }}>
              We’re here to help! If you have any questions, feedback, or need support, please fill out the form below or contact us directly. Our team will get back to you as soon as possible.
            </p>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '1em' }} 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '1em' }} 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    rows="5" 
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '1em' }} 
                    required 
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  style={{ padding: '12px', backgroundColor: '#0056b3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1em', fontWeight: 'bold', transition: 'background-color 0.3s' }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#004494'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#0056b3'}
                >
                  Submit
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', color: '#28a745', fontWeight: 'bold', fontSize: '1.2em' }}>
                Thank you for your message! We will get back to you shortly.
              </div>
            )}
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default Contact;

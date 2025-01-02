import React from 'react';
import Layout from '@/components/Layout';

import '@/assets/css/about.css';


const About = () => {
  const onLoad = () => {};

  return (
    <Layout onLoad={onLoad} strict={false}>
      <div className="about" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5em', fontWeight: 'bold', margin: '10px 0', color: '#0056b3' }}>ABOUT</h1>
        <div className="about-logo" style={{ textAlign: 'center', margin: '30px 0' }}>
          <img 
            src="/onboarding.png" 
            alt="NZ RMS Logo" 
            style={{ maxWidth: '80%', height: 'auto', maxHeight: '300px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} 
          />
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'justify' }}>
          <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
            NZ RMS is an innovative web solution designed to revolutionize the Real Estate Management System. It features both a web app for clients, admins, and agencies, as well as a mobile app for users who prefer accessing services on the go. This dual-platform approach ensures seamless connectivity and convenience for all users.
          </p>
          <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
            Our platform is tailored to help individuals find their ideal real estate properties based on their unique preferences and specifications. Whether you're searching for residential, commercial, or other types of properties, NZ RMS simplifies the process and connects you with the best options available.
          </p>
          <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
            By integrating cutting-edge technology with user-friendly design, NZ RMS empowers clients and agencies to navigate the real estate market with ease and efficiency. Join us in transforming the way people discover and manage real estate.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;

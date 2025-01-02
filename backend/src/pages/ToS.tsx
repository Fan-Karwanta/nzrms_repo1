import React from 'react';
import Layout from '@/components/Layout';

import '@/assets/css/tos.css';

const TermsOfService = () => {
  const onLoad = () => {};

  return (
    <Layout onLoad={onLoad} strict={false}>
      <div className="tos" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5em', fontWeight: 'bold', margin: '10px 0', color: '#0056b3' }}>Terms of Service</h1>
        <div className="tos-logo" style={{ textAlign: 'center', margin: '30px 0' }}>
          <img 
            src="/onboarding.png" 
            alt="NZ RMS Logo" 
            style={{ maxWidth: '80%', height: 'auto', maxHeight: '300px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} 
          />
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'justify' }}>
          <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
            Welcome to NZ RMS. By accessing or using our services, you agree to be bound by the following terms and conditions. Please read them carefully.
          </p>
          <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#0056b3' }}>1. Acceptance of Terms</h2>
          <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
            By using NZ RMS, you agree to comply with and be legally bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
          <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#0056b3' }}>2. Use of the Service</h2>
          <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
            You agree to use the NZ RMS platform responsibly and in compliance with all applicable laws and regulations. Unauthorized use of our services may result in termination of access.
          </p>
          <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#0056b3' }}>3. Privacy Policy</h2>
          <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
            We are committed to protecting your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your information.
          </p>
          <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#0056b3' }}>4. Changes to Terms</h2>
          <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
            NZ RMS reserves the right to update or modify these terms at any time. Changes will be effective immediately upon posting on our platform.
          </p>
          <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', color: '#0056b3' }}>5. Contact Us</h2>
          <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
            If you have any questions about these Terms of Service, please contact us at support@nzrms.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;

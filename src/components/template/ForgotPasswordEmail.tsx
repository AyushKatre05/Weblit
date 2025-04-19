import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  url: string;
}

export const ForgotPasswordEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  url,
}) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f7',
      padding: '40px 20px',
      textAlign: 'center',
      color: '#333',
    }}
  >
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '8px',
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
        Hello, {name}
      </h1>
      <p style={{ fontSize: '16px', marginBottom: '30px' }}>
        It looks like you requested to reset your password. No worries — we have got you covered.
      </p>
      <a
        href={url}
        target="_blank"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#4f46e5',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        Reset Your Password
      </a>
      <p style={{ fontSize: '14px', marginTop: '30px', color: '#666' }}>
        If you did not request this, you can safely ignore this email.
      </p>
    </div>
  </div>
);

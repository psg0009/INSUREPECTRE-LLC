import React from 'react';

const InsureSpectreLogo = ({ size = 56 }) => (
  <div
    className="flex items-center justify-center bg-white rounded-full shadow-lg"
    style={{ width: size, height: size }}
  >
    <img
      src="/logo-insurespectre.png"
      alt="InsureSpectre Logo"
      style={{ width: size * 0.85, height: size * 0.85, objectFit: 'contain' }}
      className="rounded-full"
    />
  </div>
);

export default InsureSpectreLogo; 
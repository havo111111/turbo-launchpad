import React from 'react';

interface PlaceholderImageProps {
  width: number;
  height: number;
  text: string;
  color?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width,
  height,
  text,
  color = '#f0f0f0',
}) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#666',
        border: '1px solid #ddd',
      }}
    >
      {text}
    </div>
  );
};

export default PlaceholderImage;

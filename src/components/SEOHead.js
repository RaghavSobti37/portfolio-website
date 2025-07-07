import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({ 
  title = "Professional Videographer & Photographer | Gimbal & Reel Shoots",
  description = "Professional videographer and photographer specializing in gimbal shots, reel shoots, and cinematography. Expert video production services.",
  keywords = "videographer, photographer, cinematographer, gimbal operator, professional shoot, reel shoot",
  image = "/og-image.jpg",
  url = "https://bluepolaroid.com/"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;
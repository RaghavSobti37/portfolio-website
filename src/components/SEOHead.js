import React from 'react';
import { Helmet } from 'react-helmet';

const SEOHead = ({ 
  title = "Professional Videographer & Cinematographer | Gimbal Operator | Resume Download",
  description = "Professional videographer and cinematographer specializing in gimbal shots, reel shoots, and cinematography. Download resume and service agreement for professional video production services.",
  keywords = "videographer, photographer, cinematographer, gimbal operator, professional shoot, reel shoot, resume download, service agreement, video production",
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
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Raghav Raj Sobti - Professional Videographer" />
      <link rel="canonical" href={url} />
      
      {/* Structured data for downloads */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Raghav Raj Sobti",
          "jobTitle": "Professional Videographer & Cinematographer",
          "description": "Professional videographer and cinematographer specializing in gimbal operations, music video production, and commercial photography",
          "url": url,
          "sameAs": [
            "https://instagram.com/yourusername",
            "https://youtube.com/yourchannel"
          ],
          "knowsAbout": [
            "Videography",
            "Cinematography", 
            "Gimbal Operations",
            "Music Video Production",
            "Commercial Photography"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
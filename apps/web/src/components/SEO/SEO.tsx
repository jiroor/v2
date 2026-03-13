import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  path: string;
  category?: string;
  includeJsonLd?: boolean;
}

const SITE_URL = 'https://rakit-five.vercel.app';
const SITE_NAME = 'Rakit';

export function SEO({ title, description, path, category }: SEOProps) {
  const ogImageUrl = `${SITE_URL}/api/og?tool=${encodeURIComponent(path)}`;
  const pageUrl = `${SITE_URL}${path}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const metaDescription = description || '楽に使える、軽量でミニマルなユーティリティツール集';

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ja_JP" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": title || SITE_NAME,
          "description": metaDescription,
          "url": pageUrl,
          "applicationCategory": category || "UtilitiesApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "JPY"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
          }
        })}
      </script>
    </Helmet>
  );
}

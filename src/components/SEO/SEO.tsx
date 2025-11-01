import { Helmet } from 'react-helmet-async'
import {
  getPageMetadata,
  getFullUrl,
  getOgImageUrl,
  SITE_CONFIG,
} from '@/utils/seoUtils'

interface SEOProps {
  path: string
  includeJsonLd?: boolean
}

/**
 * SEOコンポーネント
 * 各ページでメタタグを動的に設定する
 */
export function SEO({ path, includeJsonLd = false }: SEOProps) {
  const metadata = getPageMetadata(path)
  const fullUrl = getFullUrl(path)
  const ogImageUrl = getOgImageUrl(metadata)

  // 構造化データ（JSON-LD）
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_CONFIG.name,
    description: metadata.description,
    url: fullUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
  }

  return (
    <Helmet>
      {/* 基本メタタグ */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />

      {/* OGP (Open Graph Protocol) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:locale" content={SITE_CONFIG.locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={SITE_CONFIG.twitterCard} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* 構造化データ（JSON-LD） - ホームページのみ */}
      {includeJsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}

import React from 'react';
import { Helmet, HelmetProps } from 'react-helmet';

import SEOConfig from '../../config/SEOConfig';
import { useProps } from '../../hooks/mobx.hooks';

type SEOProps = HelmetProps & {
}

const SEO: React.FC<SEOProps> = (props) => {
  const p = useProps(props);
  return (
    <Helmet
      meta={[
        ...SEOConfig.socialsMeta,
        ...SEOConfig.standardMeta,
      ]}
      link={[
        {
          rel: "apple-touch-icon",
          sizes: "57x57",
          href: "/favicons/apple-icon-57x57.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "60x60",
          href: "/favicons/apple-icon-60x60.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "72x72",
          href: "/favicons/apple-icon-72x72.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "76x76",
          href: "/favicons/apple-icon-76x76.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "114x114",
          href: "/favicons/apple-icon-114x114.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "120x120",
          href: "/favicons/apple-icon-120x120.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "144x144",
          href: "/favicons/apple-icon-144x144.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "152x152",
          href: "/favicons/apple-icon-152x152.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicons/apple-icon-180x180.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/favicons/android-icon-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicons/favicon-96x96.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicons/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/favicons/manifest.json",
        },
      ]}
      {...p}
    >
    </Helmet>
  )
}

export default SEO;
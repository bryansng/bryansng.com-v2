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
        ...SEOConfig.standardMeta,
        ...SEOConfig.socialsMeta,
      ]}
      link={[

      ]}
      {...p}
    >
    </Helmet>
  )
}

export default SEO;
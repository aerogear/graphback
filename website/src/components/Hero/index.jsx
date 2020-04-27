import React from 'react';
import classnames from 'classnames';
import components from '@theme/MDXComponents';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export function Hero({ siteConfig }) {
  return (
    <header className={classnames('hero hero--primary', styles.heroBanner, styles.heroGraphback)}>
      <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3 text--left">
            <div className={styles.heroImage}>
              <img src="/img/logo.png" alt="logo" />
            </div>
            <p className="hero__title">{siteConfig.tagline}</p>
            <ul>
              <li>Out of the Box Node.js GraphQL API based on your model</li>
              <li>Full control over the generated code or runtime framework</li>
              <li>Manages complexity of database management</li>
            </ul>
            <div className={styles.buttons}>
              <Link
                className={classnames(
                  'button button--primary button--lg button--rounded',
                  styles.getStarted,
                )}
                to={useBaseUrl('docs/gettingstarted')}>
                Get Started
                </Link>
            </div>
          </div>
          {/* <div className="col col--6 text--left">
            <div style={{  }}>
              <components.pre style={{ width: '600px', marginBottom: 0 }}>
                <components.code className="language-graphql" style={{ margin: '0 auto' }}>
                  {
                    `${require('!!raw-loader!../../schema/datamodel.gql').default}`
                  }
                </components.code>
              </components.pre>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
}
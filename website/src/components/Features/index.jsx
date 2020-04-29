import React from 'react';
import classnames from 'classnames';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Define your model</>,
    imageUrl: 'img/input.png',
    description: (
      <>
        {/* Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly. */}
      </>
    ),
  },
  {
    title: <>Choose your stack</>,
    imageUrl: 'img/config.png',
    description: (
      <>
        {/* Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory. */}
      </>
    ),
  },
  {
    title: <>Deploy</>,
    imageUrl: 'img/rocket.png',
    description: (
      <>
        {/* Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer. */}
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  
  return (
    <div className="text--center">
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className={styles.featureTitle}>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export function Features () {
  return (
    <div className={styles.splitContainer}>
      <div className={classnames(styles.leftSplit, styles.featureSticky)}>
        <div id="sticky" className={classnames(styles.stickyContent)}>
          <h2 className="hero__subtitle">Graphback Workflow</h2>
          <p>Graphback provides command line client for generating fully functional GraphQL enabled Node.js server and client side applications. Graphback will generate production-ready application based on your GraphQL types in seconds.</p>
        </div>
      </div>
      <div className={styles.rightSplit}>
        <div className={classnames(styles.splitRow, styles.before)}></div>
        {
          features && features.length && (
            features.map((props, index) => {
              return (
                <div className={styles.splitRow} key={index}>
                  <Feature {...props} />
                </div>
              );
            })
          )
        }
        <div className={classnames(styles.splitRow, styles.after)}></div>
      </div>
    </div>
  );
}
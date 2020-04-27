import React from 'react';
import components from '@theme/MDXComponents';

export function Code() {
  return (
    <div className="col col--6 text--left">
      <div style={{}}>
        <components.pre style={{ width: '600px', marginBottom: 0 }}>
          <components.code className="language-graphql" style={{ margin: '0 auto' }}>
            {
              `${require('!!raw-loader!../../schema/datamodel.gql').default}`
            }
          </components.code>
        </components.pre>
      </div>
    </div>
  );
}
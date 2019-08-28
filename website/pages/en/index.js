/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <image src={`${baseUrl}img/graphback.png`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href="/docs/gettingstarted">View Docs</Button>
            <Button href={siteConfig.repoUrl}>Github</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align={props.align}
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );



    const Demo = () => (
      <Block align="center">
        {[
          {
            content: `<div class="yt-frame">
              <iframe frameBorder="0" width="560" height="310" scrolling="no" marginHeight="0" marginWidth="0" 
              src="https://www.youtube.com/embed/tB_SPNckiEA" 
              frameborder="0" allowfullscreen align="middle"></iframe>
            </div>`,
            title: 'Graphback in 5 minutes',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light" align="left">
        {[
          {
            content: `Graphback provides command line client for generating fully functional GraphQL enabled Node.js servers.
            Developers can base on rich ecosystem of templates that integrate various open source technologies.
            Graphback will generate production ready application based on your GraphQL types in seconds.
            Templates can be automatically packaged into containers and deployed to any cloud provider.`,
            image: `${baseUrl}img/diagram.png`,
            contentAlign: 'right',
            imageAlign: 'right',
            title: 'Graphback Workflow',
          },
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <LearnHow />
          <Demo />
        </div>
      </div>
    );
  }
}

module.exports = Index;

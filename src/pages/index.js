import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/Layout/Layout.jsx'
import Text from '../components/Text/Text.jsx'
import LinkList from '../components/LinkList/LinkList.jsx'
import Main from '../components/Main/Main.jsx'
import PageTitle from '../components/PageTitle/PageTitle.jsx'

class RootIndex extends React.PureComponent {
  render() {
    const site = get(this, 'props.data.site.siteMetadata')
    let post = get(this, 'props.data.contentfulHomePage')
    const map = this.props.pageContext.map

    return (
      <Layout
        location={this.props.location}
        className="muted full-width"
        hero={post.hero}
        ga={site.gaConfig.id}
        map={map}
      >
        <Helmet>
          <title>{`${post.title} | ${site.title}`}</title>
          <link
            rel="canonical"
            href={`${site.basePath}${this.props.location.pathname}`}
          />
          <meta name="description" content={post.metaDescription} />
        </Helmet>
        <Main className="full-width">
          <div className="container">
            <PageTitle text={post.title} className="no-breadcrumb" />
            <Text
              className="intro lead"
              content={post.intro.childMarkdownRemark.html}
            />
            {post.childPages && (
              <LinkList
                isDouble
                items={post.childPages}
                className="raised columns"
              />
            )}
          </div>
        </Main>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
query HomeQuery {
  site {
    siteMetadata {
      title
      basePath
      gaConfig {
        id
      }
    }
  }
  contentfulHomePage {
    id
    title
    metaTitle
    metaDescription
    intro {
      childMarkdownRemark {
        html
      }
    }
    hero {
      headline
      subHeading
      image {
        title
        description
        file {
          details {
            size
            image {
              width
              height
            }
          }
          fileName
          contentType
          url
        }
      }
    }
    }
  }
`

'use strict'

const Prismic = require('prismic-javascript')

class PrismicModule {
  constructor ({accessToken, repo, version}) {
    this.accessToken = accessToken
    this.repo = repo
    this.version = version || '2'
    this.repoUrl = `https://${this.repo}.prismic.io/api/v${this.version}`
  }

  fetchContent (documentQuery, options = {}) {
    const request = Prismic.api(this.repoUrl, {accessToken: this.accessToken})
      .then(api => this.queryDocuments({api, documentQuery, options}))
      .then(response => response.results)
      .catch(error => {
        console.error('Error fetching content', error)
        throw new Error(error)
      })

    return request
  }

  queryDocuments ({api, documentQuery, options}) {
    console.log(documentQuery)
    const prismicQuery = Object.keys(documentQuery).map(key => Prismic.Predicates.at(key, documentQuery[key]))
    return api.query(prismicQuery, options)
  }
}

module.exports = function (...args) {
  return new PrismicModule(...args)
}

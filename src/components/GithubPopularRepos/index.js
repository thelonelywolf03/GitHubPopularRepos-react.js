import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const repoStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    repositoryList: [],
    repoStatus: repoStatusList.initial,
  }

  componentDidMount() {
    this.getRepositoryApi()
  }

  getRepositoryApi = async () => {
    this.setState({
      repoStatus: repoStatusList.inProgress,
    })

    const {activeTabId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeTabId}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        repositoryList: updatedData,
        repoStatus: repoStatusList.success,
      })
    }
    if (response.status === 401) {
      this.setState({repoStatus: repoStatusList.failure})
    }
  }

  renderProgressView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailurePart = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryItem = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repo-card-list-container">
        {repositoryList.map(each => (
          <RepositoryItem repository={each} key={each.id} />
        ))}
      </ul>
    )
  }

  secondContainer = () => {
    const {repoStatus} = this.state
    switch (repoStatus) {
      case repoStatusList.success:
        return this.renderRepositoryItem()
      case repoStatusList.failure:
        return this.renderFailurePart()
      case repoStatusList.inProgress:
        return this.renderProgressView()
      default:
        return null
    }
  }

  onChangeActiveTabId = id => {
    this.setState({activeTabId: id}, this.getRepositoryApi)
  }

  languageFilterHeaderItemList = () => {
    const {activeTabId} = this.state
    return (
      <ul className="order-list">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            headerList={each}
            isActive={each.id === activeTabId}
            onChangeActiveTabId={this.onChangeActiveTabId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="Github-container">
        <h1 className="popular-heading">Popular</h1>
        {this.languageFilterHeaderItemList()}
        {this.secondContainer()}
      </div>
    )
  }
}

export default GithubPopularRepos

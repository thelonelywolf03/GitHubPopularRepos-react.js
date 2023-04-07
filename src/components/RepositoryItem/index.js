import './index.css'

const RespositoryItem = props => {
  const {repository} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = repository

  return (
    <li className="card">
      <img src={avatarUrl} alt={name} className="logo" />
      <h1 className="name">{name}</h1>
      <div className="inner-list">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars"
        />
        <p className="inner-para">{starsCount} stars</p>
      </div>

      <div className="inner-list">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars"
        />
        <p className="inner-para">{forksCount} forks</p>
      </div>

      <div className="inner-list">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars"
        />
        <p className="inner-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RespositoryItem

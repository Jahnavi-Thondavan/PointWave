function FeaturedTalent({ role }) {
  const isFreelancer = role === 'freelancer'

  return (
    <section className="featured-talent" id={isFreelancer ? 'work' : 'talent'}>
      <div className="featured-header">
        <div>
          <p className="section-label">{isFreelancer ? 'For freelancers' : 'For clients'}</p>
          <h2>{isFreelancer ? 'Projects worth looking at.' : 'People who know their work.'}</h2>
          <p className="section-description">
            {isFreelancer
              ? 'New opportunities will appear here when clients publish projects.'
              : 'Freelancer profiles will appear here as people join PointWave.'}
          </p>
        </div>
      </div>
      <div className="dashboard-empty-inline">
        <strong>{isFreelancer ? 'No public projects yet.' : 'No public freelancer profiles yet.'}</strong>
        <p>
          {isFreelancer
            ? 'Create an account and complete your profile to get ready for opportunities.'
            : 'PointWave will show real member profiles here. No sample people or invented ratings.'}
        </p>
      </div>
    </section>
  )
}

export default FeaturedTalent

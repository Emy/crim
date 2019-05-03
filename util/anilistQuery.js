module.exports = {
    query : `query ($title: String) {
        Media(search: $title, type: ANIME) {
          title {
            romaji
            english
            native
          }
          description
          siteUrl
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          episodes
          duration
          status
          coverImage {
            large
          }
          genres
          popularity
          favourites
          characters(perPage: 8) {
            edges {
              node {
                description
                name {
                  first
                  last
                  native
                }
                image {
                  large
                }
              }
              role
              voiceActors {
                name {
                  first
                  last
                  native
                }
                language
              }
            }
          }
          meanScore
        }
      }`
}
export async function getArtist(id) {
  const musickit = window.app.mk
  
  const storefront = musickit.storefrontId
  const response = await musickit.api.v3.music(`/v1/catalog/${storefront}/artists/${id}`)

  const artist = response?.data?.data[0]
  return artist
}

export async function getSimilarArtists(id) {
  const musickit = window.app.mk
  
  const storefront = musickit.storefrontId
  const response = await musickit.api.v3.music(`/v1/catalog/${storefront}/artists/${id}`, {
    views: ['similar-artists']
  })

  const artist = response?.data?.data[0]
  return artist.views['similar-artists'].data
}

export function getArtwork (artwork, width, height) {
  return artwork.url
    .replace('{w}', width)
    .replace('{h}', height)
}
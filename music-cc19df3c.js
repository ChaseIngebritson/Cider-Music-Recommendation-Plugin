'use strict';

async function getArtist(id) {
  const musickit = window.app.mk;
  const storefront = musickit.storefrontId;
  const response = await musickit.api.v3.music(`/v1/catalog/${storefront}/artists/${id}`);
  const artist = response?.data?.data[0];
  return artist;
}
async function getSimilarArtists(id) {
  const musickit = window.app.mk;
  const storefront = musickit.storefrontId;
  const response = await musickit.api.v3.music(`/v1/catalog/${storefront}/artists/${id}`, {
    views: ['similar-artists']
  });
  const artist = response?.data?.data[0];
  return artist.views['similar-artists'].data;
}
function getArtwork(artwork, width, height) {
  return artwork.url.replace('{w}', width).replace('{h}', height);
}
async function getNowPlayingArtist() {
  const musickit = window.app.mk;
  const nowPlayingSong = musickit.nowPlayingItem;
  const storefront = musickit.storefrontId;
  const response = await musickit.api.v3.music(`/v1/catalog/${storefront}/songs/${nowPlayingSong.songId}`, {
    views: ['artists']
  });
  return response?.data?.data[0]?.relationships?.artists?.data[0];
}

exports.getArtist = getArtist;
exports.getArtwork = getArtwork;
exports.getNowPlayingArtist = getNowPlayingArtist;
exports.getSimilarArtists = getSimilarArtists;

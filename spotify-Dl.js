/* jangan hapus wm bang 
script by rijalganzz
base? tio nightmare 
whatsapp 34604216991 ( rijalganzz)
*/
import fetch from 'node-fetch'
import axios from "axios"

const client_id = 'acc6302297e040aeb6e4ac1fbdfd62c3'
const client_secret = '0e8439a1280a43aba9a5bc0a16f3f009'
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

async function getAccessToken() {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials"
        })
    })

    return response.json()
}

const SpotifyAPI = async () => {
    const { access_token } = await getAccessToken()

    return {
        getUserData: async () => {
            const response = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + access_token,
                },
            })
            return response.json()
        },
        getUserPlaylists: async (limit) => {
            const response = await fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + access_token,
                    },
                }
            )
            return response.json()
        },
        getUserQueueData: async () => {
            const response = await fetch('https://api.spotify.com/v1/me/player', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + access_token,
                },
            })
            return response.json()
        },
        addTrackToQueue: async (trackId) => {
            const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${trackId}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    }
                }
            )
            return response.json()
        },
        playPausePlayback: async (action) => {
            const response = await fetch(`https://api.spotify.com/v1/me/player/${action}`, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + access_token,
                    'Content-Type': 'application/json',
                }
            })
            return response.json()
        },
        nextPlaybackTrack: async () => {
            const response = await fetch('https://api.spotify.com/v1/me/player/next', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + access_token,
                    'Content-Type': 'application/json',
                }
            })
            return response.json()
        },
        trackSearch: async (track) => {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=20`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + access_token,
                    }
                }
            )
            return response.json()
        },
        getTracks: async (trackID, market = 'IN') => {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackID}?market=${market}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + access_token,
                    }
                }
            )
            return response.json()
        },
        getPlaylistTracks: async (playlistId) => {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + access_token,
                    }
                }
            )
            return response.json()
        }
    }
}
async function spotifyDl(url) {
    try {
        const Response = await axios.get(`https://api.fabdl.com/spotify/get?url=${encodeURIComponent(url)}`, {
            headers: {
                accept: "application/json, text/plain, */*",
                "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-platform": "\"Android\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                Referer: "https://spotifydownload.org/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
            },
        });

        const yanzResponse = await axios.get(`https://api.fabdl.com/spotify/mp3-convert-task/${Response.data.result.gid}/${Response.data.result.id}`, {
            headers: {
                accept: "application/json, text/plain, */*",
                "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
                "sec-ch-ua-mobile": "?1",
                "sec-ch-ua-platform": "\"Android\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                Referer: "https://spotifydownload.org/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
            },
        });

        const result = {
            title: Response.data.result.name,
            type: Response.data.result.type,
            artis: Response.data.result.artists,
            durasi: Response.data.result.duration_ms,
            image: Response.data.result.image,
            download: `https://api.fabdl.com${yanzResponse.data.result.download_url}`
        };

        return result;
    } catch (error) {
        throw error; 
    }
}
export {
    SpotifyAPI,
    spotifyDl
}
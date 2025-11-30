import axios from 'axios'

async function ttUser(username) {
	return new Promise(async(resolve, reject) => {
	
axios.get("https://tiktok-video-no-watermark2.p.rapidapi.com/user/posts?unique_id=" + 'mrbeast' + "&count=1000", {
  headers: {
    "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",
    "x-rapidapi-key": "533115be6amsh2515f73f171c6f1p160d9djsn833294e42f10",
    "Referer": "https://tik.storyclone.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  }
}).then( yanz => {
resolve(yanz.data.data)
})
})
}

export {
ttUser
}
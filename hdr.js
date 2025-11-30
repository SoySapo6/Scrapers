import axios from 'axios'
import cheerio from 'cheerio'

async function imgHd(url, scales) {
 let data = axios(`https://toolsapi.spyne.ai/api/forward`, {
    method: "post",
    data: {
      image_url: url,
      scale: scales,
      save_params: {
        extension: ".png",
        quality: 100,
      },
    },
    headers: {
      "content-type": "application/json",
      accept: "*/*",
    },
  })
  return data
}

export {
imgHd
}
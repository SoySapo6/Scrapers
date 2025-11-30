import axios from 'axios'
import fs from "fs"

export async function imageAnime(url) {
  return new Promise(async(resolve, reject) => {
    let { data } = await axios({
      url: "https://tools.revesery.com/image-anime/convert.php",
      method: "POST",
      data: new URLSearchParams(Object.entries({
        "image-url": url
      })),
      headeres: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    console.log(data)
    resolve(data)
  })
  
}
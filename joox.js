/* jangan hapus wm bang 
script by rijalganzz
base? tio nightmare 
whatsapp 34604216991 ( rijalganzz)
*/

import axios from "axios"

async function shorts(url) {
  const res = await axios.get('https://tinyurl.com/api-create.php?url=' + url)
  return res.data
}

function joox(query) {
    return new Promise((resolve, reject) => {
        const time = Math.floor(new Date() / 1000)
        axios.get('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + query + '&pn=1&sin=0&ein=29&_=' + time)
            .then(({ data }) => {
                let result = []
                let hasil = []
                let promoses = []
                let ids = []
                data.itemlist.forEach(result => {
                    ids.push(result.songid)
                });
                for (let i = 0; i < data.itemlist.length; i++) {
                    const get = `http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=${ids[i]}&lang=id&country=id&from_type=null&channel_id=null&_=`
                    promoses.push(
                        axios.get(get, {
                            headers: {
        'Content-Type':'application/json',
        'Cookie': 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;',
        'useragent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36'
      }
                        })
                            .then(({ data }) => {
                                const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                  
                                hasil.push({
                                    lagu: res.msong,
                                    id: res.encodeSongId,
                                    album: res.malbum,
                                    penyanyi: res.msinger,
                                    publish: res.public_time,
                                    img: res.imgSrc,
                                  mp3dl: `https://api.akuari.my.id/downloader/jooxdlmp3?link=${res.encodeSongId}`,
                                   mp3: res.mp3Url
                                })
                                Promise.all(promoses).then(() => resolve({
                                    status: true,
                                    data: hasil,
                                }))
                            }).catch(reject)
                    )
                }
            }).catch(reject)
    })
}


function jooxdl(url) {
    return new Promise((resolve, reject) => {
    axios.get('http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + url + '&lang=id&country=id&from_type=null&channel_id=null&_=' + (new Date).getTime(), {
      headers: {
        'Content-Type':'application/json',
        'Cookie': 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;',
        'useragent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36'
      }
    }).then(res => {
      const mentahan = res.data
      const replaced = mentahan.replace('MusicInfoCallback(', '').replace(`}
)`,'}')
      console.log(replaced)
      const jsone = JSON.parse(replaced)
      const title = jsone.msong
      const artist = jsone.msinger
      const album = jsone.malbum
      const img = jsone.imgSrc
      const mp3_url = jsone.mp3Url
      const filesize = jsone.size128
      const finalsize = niceBytes(filesize)
      const ext = 'mp3'
      const interval = jsone.minterval
      const duration = moment.duration(interval, 'seconds');
      const m = duration.minutes(); // 20
      const s = duration.seconds(); // 25
      const durasi = `${m}:${s}`
      const result = ({
        judul: title,
        artist: artist,
        album: album,
        img_url: img,
        mp3_url: mp3_url,
        filesize: finalsize,
        ext: ext,
        duration: durasi,
      })
      resolve(result)
    }).catch(err => {
      reject(err)
    })
})
}
export { 
jooxdl, 
joox
 }
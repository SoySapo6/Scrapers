import axios from 'axios'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import fs from 'fs'
import request from 'request'
import https from 'https'
import ling from 'knights-canvas'
import jsobfus from 'javascript-obfuscator'
import WebSocket from 'ws'
import FormData from 'form-data'
import { fileTypeFromBuffer } from "file-type"
import { JSDOM } from 'jsdom'
import ytdl from "ytdl-core";
 import yts from 'yt-search'
 import readline from 'readline'
 import ffmpeg from 'fluent-ffmpeg'
 import NodeID3 from 'node-id3'
 import { randomBytes } from 'crypto'
 
const clean = (data) => {
  let regex = /(<([^>]+)>)/gi;
  data = data.replace(/(<br?\s?\/>)/gi, " \n");
  return data.replace(regex, "");
};

async function shortener(url) {
  return url;
}

async function post(url, formdata) {
  return fetch(url, {
    method: 'POST',
    headers: {
      accept: "*/*",
      'accept-language': "en-US,en;q=0.9",
      'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: new URLSearchParams(Object.entries(formdata))
  })
}
const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/


let headers = {
    "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY0Mjk1NDM3NTM5NjA2Mzg3MCwiZGV2aWNlSWQiOiIiLCJyZWZyZXNoVG9rZW4iOiIiLCJleHBpcmVUaW1lIjoyNTkyMDAwLCJleHAiOjE2OTg4NjU1MjR9.du-VYEt4vMC0A8h7b2pVf1ec8NtklxXQZjMwrkbupro",
    "Content-Type": "application/json",
    "cookie": "ta_token_prod=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY0Mjk1NDM3NTM5NjA2Mzg3MCwiZGV2aWNlSWQiOiIiLCJyZWZyZXNoVG9rZW4iOiIiLCJleHBpcmVUaW1lIjoyNTkyMDAwLCJleHAiOjE2OTg4NjU1MjR9.du-VYEt4vMC0A8h7b2pVf1ec8NtklxXQZjMwrkbupro",
    "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
  }
  
  
  process.env['SPOTIFY_CLIENT_ID'] = '4c4fc8c3496243cbba99b39826e2841f'
process.env['SPOTIFY_CLIENT_SECRET'] = 'd598f89aba0946e2b85fb8aefa9ae4c8'

async function convert(ms) {
      var minutes = Math.floor(ms / 60000)
      var seconds = ((ms % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
   }
   
  async function spotifyCreds() {
      return new Promise(async resolve => {
         try {
            const json = await (await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
               headers: {
                  Authorization: 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
               }
            })).data
            if (!json.access_token) return resolve({
               creator: 'Budy x creator ',
               status: false,
               msg: 'Can\'t generate token!'
            })
            resolve({
               creator: 'Budy x creator ',
               status: true,
               data: json
            })
         } catch (e) {
            resolve({
               creator: 'Budy x creator ',
               status: false,
               msg: e.message
            })
         }
      })
   }
   
   
 export async function getInfo(url) {
      return new Promise(async resolve => {
         try {
            const creds = await spotifyCreds()
            if (!creds.status) return resolve(creds)
            const json = await (await axios.get('https://api.spotify.com/v1/tracks/' + url.split('track/')[1], {
               headers: {
                  Authorization: 'Bearer ' + creds.data.access_token
               }
            })).data
            resolve({
               creator: 'Budy x creator ',
               status: true,
               data: {
                  thumbnail: json.album.images[0].url,
                  title: json.artists[0].name + ' - ' + json.name,
                  artist: json.artists[0],
                  duration: convert(json.duration_ms),
                  preview: json.preview_url
               }
            })
         } catch (e) {
            resolve({
               creator: 'Budy x creator ',
               status: false,
               msg: e.message
            })
         }
      })
   }
   
 async function search(query, type = 'track', limit = 20) {
      return new Promise(async resolve => {
         try {
            const creds = await spotifyCreds()
            if (!creds.status) return resolve(creds)
            const json = await (await axios.get('https://api.spotify.com/v1/search?query=' + query + '&type=' + type + '&offset=0&limit=' + limit, {
               headers: {
                  Authorization: 'Bearer ' + creds.data.access_token
               }
            })).data
            if (!json.tracks.items || json.tracks.items.length < 1) return resolve({
               creator: 'Budy x creator ',
               status: false,
               msg: 'Music not found!'
            })
            let data = []
            json.tracks.items.map(v => data.push({
               title: v.album.artists[0].name + ' - ' + v.name,
               duration: convert(v.duration_ms),
               popularity: v.popularity + '%',
               preview: v.preview_url,
               url: v.external_urls.spotify
            }))
            resolve({
               creator: 'Budy x creator ',
               status: true,
               data
            })
         } catch (e) {
            resolve({
               creator: 'Budy x creator ',
               status: false,
               msg: e.message
            })
         }
      })
   }
   
export async function aio(url){
	return new Promise(async(resolve,reject) => {
		
 const { data: rest } = await axios.get("https://steptodown.com/")
    const $ = cheerio.load(rest) 
    const tokens = $("input[name='token']").val()
    const data = new URLSearchParams(
      Object.entries({
        url: url,
        token: tokens 
      })
    )    
    await axios.post("https://steptodown.com/wp-json/aio-dl/video-data/", data, {
      headers: {
        "cookie": "PHPSESSID=658754a80bacc095aced0be8e110f3b4; pll_language=en",
        "user-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      }
    })
    .then(( response ) => {
      resolve(response.data)
    })
    .catch((e) => {
      reject(e)
    })
  })
}

export async function animeFilter(image) {
  return new Promise(async (resolve, reject) => {
    axios("https://akhaliq-animeganv2.hf.space/api/queue/push/", {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      },
      data: {
        "fn_index": 0,
        "data": [
          "data:image/jpeg;base64," + image.toString('base64'),
          "version 2 (🔺 robustness,🔻 stylization)"
        ],
        "action": "predict",
        "session_hash": "38qambhlxa8"
      },
      method: "POST"
    }).then(a => {
      let id = a.data.hash;
      axios("https://akhaliq-animeganv2.hf.space/api/queue/status/", {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        },
        data: {
          "hash": id
        },
        method: "POST"
      }).then(tes => {
        resolve(tes.data.data.data);
      });
    });
  });
};
export async function searchApk(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const nama = [];
				const developer = [];
				const lupdate = [];
				const size = [];
				const down = [];
				const version = [];
				const link = [];
				const format = [];
				$('#content > div > div > div.appRow > div > div > div > h5 > a').each(function(a, b) {
					const nem = $(b).text();
					nama.push(nem)
				})
				$('#content > div > div > div.appRow > div > div > div > a').each(function(c, d) {
					const dev = $(d).text();
					developer.push(dev)
				})
				$('#content > div > div > div.appRow > div > div > div > div.downloadIconPositioning > a').each(function(e, f) {
					link.push('https://www.apkmirror.com' + $(f).attr('href'))
				})
				$('#content > div > div > div.infoSlide > p > span.infoslide-value').each(function(g, h) {
					data = $(h).text();
					if (data.match('MB')) {
						size.push(data)
					} else if (data.match('UTC')) {
						lupdate.push(data)
					} else if (!isNaN(data) || data.match(',')) {
						down.push(data)
					} else {
						version.push(data)
					}
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						judul: nama[i],
						dev: developer[i],
						size: size[i],
						version: version[i],
						uploaded_on: lupdate[i],
						download_count: down[i],
						link: link[i]
					})
				}
				const result = {
					creator: 'Hanya Orang Biasa',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}

export async function apkDl(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      const link = 'https://www.apkmirror.com' + $('.downloadButton').attr('href')

      if (link.includes('#downloads')) {

        const link2 = $('meta[property="og:url"]').attr('content') + "#downloads"
        const responses2 = await fetch(link2);
        const htmls2 = await responses2.text();
        const $s = cheerio.load(htmls2);
        const result = [];

        $s('.table-row.headerFont').each((index, row) => {
          const rowData = {
            version: $s(row).find('a.accent_color').text().trim(),
            bundle: $s(row).find('.apkm-badge.success').eq(0).text().trim(),
            splits: $s(row).find('.apkm-badge.success').eq(1).text().trim(),
            apkUrl: 'https://www.apkmirror.com' + $s(row).find('a.accent_color').attr('href'),
            downloadDate: $s(row).find('.dateyear_utc').data('utcdate')
          };

          // Memeriksa apakah setidaknya salah satu properti memiliki nilai
          const hasOutput = Object.values(rowData).some(value => value !== undefined && value !== '');
          if (hasOutput) {
            result.push(rowData);
          }
        });
        const response3 = await fetch(result[1].apkUrl);
        const html3 = await response3.text();
        const $t = cheerio.load(html3);

        const link3 = 'https://www.apkmirror.com' + $t('.downloadButton').attr('href')

        const response2 = await fetch(link3);
        const html2 = await response2.text();
        const $$ = cheerio.load(html2);

        const formElement2 = $$('#filedownload');
        const id2 = formElement2.find('input[name="id"]').attr('value');
        const key2 = formElement2.find('input[name="key"]').attr('value');

        const linkdl = `https://www.apkmirror.com/wp-content/themes/APKMirror/download.php?id=${id2}&key=${key2}`;

        return {
          title: $('meta[property="og:title"]').attr('content'),
          gambar: $('meta[property="og:image"]').attr('content'),
          link: link,
          linkdl: linkdl,
          downloadText: $('.downloadButton').text().trim(),
          author: url.split('/')[4].toUpperCase(),
          info: $('.infoSlide').text().trim(),
          description: $('#description .notes').text().trim()
        };
      } else {
        const response2 = await fetch(link);
        const html2 = await response2.text();
        const $$ = cheerio.load(html2);

        const formElement = $$('#filedownload');
        const id = formElement.find('input[name="id"]').attr('value');
        const key = formElement.find('input[name="key"]').attr('value');
        const forcebaseapk = formElement.find('input[name="forcebaseapk"]').attr('value');
        const linkdl = `https://www.apkmirror.com/wp-content/themes/APKMirror/download.php?id=${id}&key=${key}&forcebaseapk=${forcebaseapk}`;

        return {
          title: $('meta[property="og:title"]').attr('content'),
          gambar: $('meta[property="og:image"]').attr('content'),
          link: link,
          linkdl: linkdl,
          downloadText: $('.downloadButton').text().trim(),
          author: url.split('/')[4].toUpperCase(),
          info: $('.appspec-value').text().trim(),
          description: $('#description .notes').text().trim(),
          size: $('.appspec-row:nth-child(2) .appspec-value').text().trim(),
          tanggal: $('.appspec-row:last-child .appspec-value .datetime_utc').attr('data-utcdate')
        }
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  }
  
  export async function searchApp(q) {
  try {
    const url = 'https://m.playmods.net/id/search/' + q; // Ganti dengan URL sumber HTML

    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const dataArray = [];

    $('a.beautify.ajax-a-1').each((index, element) => {
      const $element = $(element);

      const data = {
        link: 'https://m.playmods.net' + $element.attr('href'),
        title: $element.find('.common-exhibition-list-detail-name').text().trim(),
        menu: $element.find('.common-exhibition-list-detail-menu').text().trim(),
        detail: $element.find('.common-exhibition-list-detail-txt').text().trim(),
        image: $element.find('.common-exhibition-list-icon img').attr('data-src'),
        downloadText: $element.find('.common-exhibition-line-download').text().trim(),
      };

      dataArray.push(data);
    });
    return dataArray;
  } catch (error) {
    console.log(error);
  }
}

export async function getApp(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const data = {
      title: $('h1.name').text().trim(),
      image: $('.icon').attr('src'),
      name: $('.app-name span').text().trim(),
      score: $('.score').text().trim(),
      edisi: $('.edition').text().trim(),
      size: $('.size .operate-cstTime').text().trim(),
      create: $('.size span').text().trim(),
      link: $('a.a_download').attr('href'),
      detail: $('.game-describe-gs').text().trim(),
      screenshots: $('.swiper-slide img').map((index, element) => $(element).attr('data-src')).get(),
      describe: $('.datail-describe-pre div').text().trim(),
    };

    return data;
  } catch (error) {
    console.log(error);
  }
}

function generateList(array) {
  const list = array.map((item, index) => `${index + 1}. ${item}`).join('\n');
  return list;
}

function addNewline(text) {
  const newText = text.replace(/•/g, '\n•');
  return newText;
}

export async function cai(text) {
axios.create("https://beta.character.ai", {
 headers: {
				"User-Agent": this.AGENT,
	        },
        });
return data
}

export async function canvas(text, pp, salam) {

// All these values are dynamic
let data = {
    "bi": "https://source.unsplash.com/n2XqPm7Bqhk/1280x720",
    "h": "720",
    "w": "1280",
    "a.tp": "rect",
    "a.x": "738",
    "a.y": "457",
    "a.w": "980",
    "a.h": "480",
    "a.c": "#ffffff",
    "a.sdw": "2 0 0 rgb(0,0,0)",
    "a.rx": "45",
    "a.ry": "45",
    "b.tp": "rect",
    "b.ox": "right",
    "b.x": "1228",
    "b.y": "580",
    "b.w": "976",
    "b.h": "12",
    "b.c": "#000",
    "b.a": "0",
    "c.tp": "textbox",
    "c.x": "735",
    "c.y": "296",
    "c.w": "663",
    "c.h": "167",
    "c.c": "#000000",
    "c.a": "0",
    "c.t": text,
    "c.ta": "center",
    "c.fs": "33",
    "c.fw": "400",
    "c.ff": "Duru Sans",
    "c.oy": "top",
    "c.maxHeight": "183",
    "c.padding": "20",
    "d.tp": "textbox",
    "d.x": "738",
    "d.y": "645",
    "d.w": "640",
    "d.h": "68",
    "d.c": "#000000",
    "d.sc": "15",
    "d.t": "open",
    "d.ta": "center",
    "d.fs": "60",
    "d.fw": "400",
    "d.ff": "Alegreya SC",
    "d.maxHeight": "183",
    "d.padding": "20",
    "e.tp": "image",
    "e.x": "148",
    "e.y": "142",
    "e.w": "400",
    "e.h": "400",
    "e.sw": "1",
    "e.sx": "0.58",
    "e.sy": "0.58",
    "e.rx": "500",
    "e.ry": "500",
    "e.src": pp,
    "f.tp": "textbox",
    "f.x": "733",
    "f.y": "136",
    "f.w": "708",
    "f.h": "68",
    "f.c": "#ffff00",
    "f.bc": "transparent",
    "f.t": salam,
    "f.ta": "center",
    "f.fs": "60",
    "f.fw": "400",
    "f.ff": "Aclonica",
    "f.tbc": "transparent",
    "f.maxHeight": "183",
    "f.padding": "20"
} 

// Generate apiURL from data
let results = 'https://img.bruzu.com/?'+new URLSearchParams(data).toString();
return results

}

export async function welcome1(a, b, c, d, e, f) {
const imeg = await new ling.Welcome()
    .setUsername(a)
    .setGuildName(b)
    .setGuildIcon(c)
    .setMemberCount(d)
    .setAvatar(e)
    .setBackground(f)
    .toAttachment();
    
 let dat = imeg.toBuffer();
  await fs.writeFileSync('./src/welcome1.png', dat)
}

export async function goodbye1(g, h, i, j, k, l) {
const image = await new ling.Goodbye()
    .setUsername(g)
    .setGuildName(h)
    .setGuildIcon(i)
    .setMemberCount(j)
    .setAvatar(k)
    .setBackground(l)
    .toAttachment();
  
 let tad = image.toBuffer();
  await fs.writeFileSync('./src/goodbye1.png', tad)
}

export async function ChatGpt(text) {
  try {
    const { data } = await axios(`https://onlinegpt.org/wp-json/mwai-ui/v1/chats/submit`, {
      method: "post",
      data: {
        botId: "default",
        newMessage: text,
        stream: false
      },
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json"
      }
    })
    return data
  } catch (err) {
    console.log(err.response.data)
    return err.response.data.message
  }
}


export async function diff(prompt, negativePrompt) {
  return new Promise(async (resolve, reject) => {
    axios("https://api.tensor.art/works/v1/works/task", {
      headers: headers,
      data: {
        "params": {
            "baseModel": {
             "modelId": "606685584192268852",
             "modelFileId": "606685584191220277"
         },
           "sdxl": {
          "refiner": false
      },
    "models": [],
    "sdVae": "vae-ft-mse-840000-ema-pruned.ckpt",
    "prompt": prompt,
    "negativePrompt": negativePrompt,
    "height": 768,
    "width": 512,
    "imageCount": 1,
    "steps": 28,
    "samplerName": "DPM++ SDE Karras",
    "images": [],
    "cfgScale": 5,
    "seed": "-1",
    "clipSkip": 2,
    "etaNoiseSeedDelta": 31337,
    "enableHr": true,
    "hrUpscaler": "4x-UltraSharp",
    "hrSecondPassSteps": 0,
    "denoisingStrength": 0.3,
    "hrResizeX": 512,
    "hrResizeY": 768
  },
  "credits": 1.11,
  "taskType": "TXT2IMG"
  },
      "method": "POST"
    }).then(a => {
      axios("https://api.tensor.art/works/v1/works/mget_task", {
        headers: headers,
        data: {
          ids: [a.data.data.task.taskId]
        },
        "method": "POST"
      }).then(yanz => {
        resolve(yanz.data.data.tasks);
      });
    });
  });
};

export async function obfus(query) {
			return new Promise((resolve, reject) => {
				try {
					const obfuscationResult = jsobfus.obfuscate(query,
					{
						compact: true,
						controlFlowFlattening: true,
						controlFlowFlatteningThreshold: 1,
						numbersToExpressions: true,
						simplify: true,
						stringArrayShuffle: true,
						splitStrings: true,
						stringArrayThreshold: 1
					});
					const result = {
						status: 200,
						author: `//Encrypt By Tio\n//Yoxy multi device\n\n`,
						result: obfuscationResult.getObfuscatedCode()
					}
					resolve(result)
				} catch (e) {
					reject(e)
				}
			})
		}
		
    export async function githubstalk(user) {
    return new Promise((resolve, reject) => {
        axios.get('https://api.github.com/users/'+user)
        .then(({ data }) => {
            let hasil = {
                username: data.login,
                nickname: data.name,
                bio: data.bio,
                id: data.id,
                nodeId: data.node_id,
                profile_pic: data.avatar_url,
                url: data.html_url,
                type: data.type,
                admin: data.site_admin,
                company: data.company,
                blog: data.blog,
                location: data.location,
                email: data.email,
                public_repo: data.public_repos,
                public_gists: data.public_gists,
                followers: data.followers,
                following: data.following,
                ceated_at: data.created_at,
                updated_at: data.updated_at
            }
            resolve(hasil)
        })
    })
}

export async function imgHd(url, scales) {
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

export async function igdl(url) {
  return new Promise(async (resolve, reject) => {
    const payload = new URLSearchParams(
      Object.entries({
        url: url,
        host: "instagram"
      })
    )
    await axios.request({
      method: "POST",
      baseURL: "https://saveinsta.io/core/ajax.php",
      data: payload,
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        cookie: "PHPSESSID=rmer1p00mtkqv64ai0pa429d4o",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      }
    })
    .then(( response ) => {      
      const $ = cheerio.load(response.data)
      const mediaURL = $("div.row > div.col-md-12 > div.row.story-container.mt-4.pb-4.border-bottom").map((_, el) => {
        return "https://saveinsta.io/" + $(el).find("div.col-md-8.mx-auto > a").attr("href")
      }).get()
      const res = {
        status: 200,
        media: mediaURL
      }
      resolve(res)
    })
    .catch((e) => {
      console.log(e)
      throw {
        status: 400,
        message: "error",
      }
    })
  })
}

export async function igdl2(url) {
  try {
    let result = { status: true, media: [] }
    const { data } = await axios(`https://www.y2mate.com/mates/analyzeV2/ajax`, {
      method: "post",
      data: {
        k_query: url,
        k_page: "Instagram",
        hl: "id",
        q_auto: 0
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "user-agent": "PostmanRuntime/7.32.2"
      }
    })
    await data.links.video.map((video) => result.media.push(video.url))
    return result
  } catch (err) {
    const result = {
      status: false,
      message: `Media not found`
    }
    return result
  }
}

export async function igstalk(Username) {
  return new Promise((resolve, reject) => {
    axios.get('https://dumpoir.com/v/'+Username, {
      headers: {
        "cookie": "_inst_key=SFMyNTY.g3QAAAABbQAAAAtfY3NyZl90b2tlbm0AAAAYWGhnNS1uWVNLUU81V1lzQ01MTVY2R0h1.fI2xB2dYYxmWqn7kyCKIn1baWw3b-f7QvGDfDK2WXr8",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
      }
    }).then(res => {
      const $ = cheerio.load(res.data)
      const result = {
        profile: $('#user-page > div.user > div.row > div > div.user__img').attr('style').replace(/(background-image: url\(\'|\'\);)/gi, ''),
        fullname: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > a > h1').text(),
        username: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > h4').text(),
        post: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1)').text().replace(' Posts',''),
        followers: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2)').text().replace(' Followers',''),
        following: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3)').text().replace(' Following',''),
        bio: $('#user-page > div.user > div > div.col-md-5.my-3 > div').text()
      }
      resolve(result)
    })
  })
}

export async function instaDl(url) {
            let res = await axios("https://indown.io/");
            let _$ = cheerio.load(res.data);
            let referer = _$("input[name=referer]").val();
            let locale = _$("input[name=locale]").val();
            let _token = _$("input[name=_token]").val();
            let { data } = await axios.post(
              "https://indown.io/download",
              new URLSearchParams({
                link: url,
                referer,
                locale,
                _token,
              }),
              {
                headers: {
                  cookie: res.headers["set-cookie"].join("; "),
                },
              }
            );
            let $ = cheerio.load(data);
            let result = [];
            let __$ = cheerio.load($("#result").html());
            __$("video").each(function () {
              let $$ = $(this);
              result.push({
                type: "video",
                thumbnail: $$.attr("poster"),
                url: $$.find("source").attr("src"),
              });
            });
            __$("img").each(function () {
              let $$ = $(this);
              result.push({
                type: "image",
                url: $$.attr("src"),
              });
            });
          
        return result;
     }
     
     async function lirik(judul){
	return new Promise(async(resolve, reject) => {
   		axios.get('https://www.musixmatch.com/search/' + judul)
   		.then(async({ data }) => {
   		const $ = cheerio.load(data)
   		const hasil = {};
   		let limk = 'https://www.musixmatch.com'
   		const link = limk + $('div.media-card-body > div > h2').find('a').attr('href')
	   		await axios.get(link)
	   		.then(({ data }) => {
		   		const $$ = cheerio.load(data)
		   		hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
		  		$$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function(a,b) {
		   hasil.lirik = $$(b).find('span > p > span').text() +'\n' + $$(b).find('span > div > p > span').text()
		   })
	   })
	   resolve(hasil)
   })
   .catch(reject)
   })
}

export async function mediafire(url) {
const res = await axios.get(url) 
const $ = cheerio.load(res.data)
const hasil = []
const link = $('a#downloadButton').attr('href')
const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('', '')
const seplit = link.split('/')
const nama = seplit[5]
mime = nama.split('.')
mime = mime[1]
hasil.push({ nama, mime, size, link })
return hasil
}

async function npmstalk(packageName) {
  let stalk = await axios.get("https://registry.npmjs.org/"+packageName)
  let versions = stalk.data.versions
  let allver = Object.keys(versions)
  let verLatest = allver[allver.length-1]
  let verPublish = allver[0]
  let packageLatest = versions[verLatest]
  return {
    name: packageName,
    versionLatest: verLatest,
    versionPublish: verPublish,
    versionUpdate: allver.length,
    latestDependencies: Object.keys(packageLatest.dependencies).length,
    publishDependencies: Object.keys(versions[verPublish].dependencies).length,
    publishTime: stalk.data.time.created,
    latestPublishTime: stalk.data.time[verLatest]
  }
}

async function pinterest(query) {
  
    let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
    let json = await res.json();
    let data = json.resource_response.data.results;
    if (!data.length) throw `Query "${query}" not found :/`;
    return data[~~(Math.random() * data.length)].images.orig.url;
  
}

export async function searchMp3(q) {
    const url = 'https://justnaija.com/search?q=' + q + '&SearchIt='; 
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const articles = [];

        $('article.result').each((index, element) => {
            const title = $(element).find('h3.result-title a').text().trim();
            const url = $(element).find('h3.result-title a').attr('href');
            const thumb = $(element).find('div.result-img img').attr('src');
            const desc = $(element).find('p.result-desc').text().trim();

            const article = {
                title,
                url,
                thumb,
                desc
            };
            articles.push(article);
        });

        return articles;
    } catch (err) {
        console.error(err);
    }
}

export async function stickersearch(query) {
return new Promise((resolve) => {
axios.get(`https://getstickerpack.com/stickers?query=${query}`).then(({ data }) => {
const $ = cheerio.load(data)
const link = [];
$('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
link.push($(b).attr('href'))
})
let rand = link[Math.floor(Math.random() * link.length)]
axios.get(rand).then(({data}) => {
const $$ = cheerio.load(data)
const url = [];
$$('#stickerPack > div > div.row > div > img').each(function(a, b) {
url.push($$(b).attr('src').split('&d=')[0])
})
resolve({
creator: 'xx',
title: $$('#intro > div > div > h1').text(),
author: $$('#intro > div > div > h5 > a').text(),
author_link: $$('#intro > div > div > h5 > a').attr('href'),
sticker: url
})
})
})
})
}

export async function sfileSearch(query, page = 1) {
	let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
	let $ = cheerio.load(await res.text())
	let result = []
	$('div.list').each(function () {
		let title = $(this).find('a').text()
		let size = $(this).text().trim().split('(')[1]
		let link = $(this).find('a').attr('href')
		if (link) result.push({ title, size: size.replace(')', ''), link })
	})
	return result
}

export async function sfileDl(url) {
	let res = await fetch(url)
	let $ = cheerio.load(await res.text())
	let filename = $('div.w3-row-padding').find('img').attr('alt')
	let mimetype = $('div.list').text().split(' - ')[1].split('\n')[0]
	let filesize = $('#download').text().replace(/Download File/g, '').replace(/\(|\)/g, '').trim()
	let download = $('#download').attr('href') + '&k=' + Math.floor(Math.random() * (15 - 10 + 1) + 10)
	return { filename, filesize, mimetype, download }
}

let wss = 'wss://runwayml-stable-diffusion-v1-5.hf.space/queue/join';

export async function stableIdif(prompt) {
return new Promise(async(resolve, reject) => {
let result = {}
let send_has_payload = {
  "session_hash": "pmr4m7bm2x",
  "fn_index": 2
}
let send_data_payload = {
  "fn_index": 2,
  "data": [
    prompt 
  ],
  "session_hash": "pmr4m7bm2x"
}

const ws = new WebSocket(wss);
    ws.onopen = function() {
     console.log("Connected to websocket")
    };

    ws.onmessage = async function(event) {
      let message = JSON.parse(event.data);

      switch (message.msg) {
        case 'send_hash':
          ws.send(JSON.stringify(send_has_payload));
          break;

        case 'send_data':
          console.log('Processing your image....');        
          ws.send(JSON.stringify(send_data_payload));
          break;
        case 'process_completed':      
        let yanz = message.output.data[0][0].replace('data:image/jpeg;base64,', '')
         let buffer = new Buffer.from(yanz, 'base64')
          result.base64 = buffer 
          break;
      }
    };

    ws.onclose = function(event) {
      if (event.code === 1000) {
        console.log('Process completed️');
      } else {
        msg.reply('Err : WebSocket Connection Error:\n');
      }
      resolve(result)
    };
  })
}

export async function tiktokStalk(username) {
    return new Promise(async (resolve, reject) => {
      await axios
        .request({
          baseURL: 'https://tiktokstalk.com',
          url: "/user/" + username,
          method: "GET"
      })
      .then(( response ) => {
        const $ = cheerio.load(response.data)
        const result = {
          status: 200,
          profile: $("div.row > div.col-lg-7.separate-column > div.user-info > figure > img").attr("src"),
          username: $("div.row > div.col-lg-7.separate-column > div.user-info > div.article > div.top > div.title > h1").text().trim(),
          name: $("div.row > div.col-lg-7.separate-column > div.user-info > div.article > div.top > div.title > h2").text().trim(),
          desc: $("div.row > div.col-lg-7.separate-column > div.user-info > div.article > div.description > p").text().trim(),
          likes: $("div.col-lg-5.separate-column > div.row > div.col > div.number-box > .count").eq(0).text().trim(),
          followers: $("div.col-lg-5.separate-column > div.row > div.col > div.number-box > .count").eq(1).text().trim(),
          following: $("div.col-lg-5.separate-column > div.row > div.col > div.number-box > .count").eq(2).text().trim(),
        }
        resolve(result)
      })
      .catch((e) => {
        console.log(e)
        reject({
          status: 300,
          message: "request failed",
        });
      })
    })
  }

export async function tiktokStalk2(user) {
return new Promise(async(resolve, reject) => {
const options = {
method: 'POST',
url: 'https://toolxox.com/seo/find-tiktok-account-analyze.php',
headers: {
"content-type": 'application/x-www-form-urlencoded',
"user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
},
formData: {
url: user
}
}
request(options, async function(error, response, body) {
const $ = cheerio.load(body)
if (!$('#profile > tbody > tr > td:nth-child(1)').text().replace(/\D/g, '')) return resolve({status: false, message: 'user not found'})
const { data } = await axios.get(`https://urlebird.com/user/${user}/`)
const $$ = cheerio.load(data)
const result = {
status: true,
username: $$('body').find('div.col-md-auto.text-center.text-md-left.pl-0 > h1').text(),
nickname: $$('body').find('div.col-md-auto.text-center.text-md-left.pl-0 > div > h5').text(),
ppurl: $$('body').find('div.col-md-auto.justify-content-center.text-center > img').attr('src'),
followers: $('#profile > tbody > tr > td:nth-child(1)').text().replace(/\D/g, ''),
following: $('#profile > tbody > tr > td:nth-child(2)').text().replace(/\D/g, ''),
likes: $('#profile > tbody > tr > td:nth-child(3)').text().replace(/\D/g, ''),
videos: $('#profile > tbody > tr > td:nth-child(4)').text().replace(/\D/g, ''),
}
resolve(result)
})
})
}

async function surah(no){
	return new Promise(async(resolve, reject) => {
		axios.get('https://kalam.sindonews.com/surah/' + no)
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const result = [];
			const ar = [];
			const id = [];
			const lt = [];
			const au = [];
			$('div.breadcrumb-new > ul > li:nth-child(5)').each(function(c,d) {
			result.audio = $(d).find('a').attr('href').replace('surah','audioframe')
			})
			$('div.ayat-arab').each(function(a, b) {
				ar.push($(b).text()) 
			})
			$('li > div.ayat-text').each(function(e, f) {
				id.push($(f).text().replace(',','').trim()) })
			$('div.ayat-latin').each(function(g, h) {
				lt.push($(h).text().trim())	})
			for(let i = 0; i < ar.length ; i++){
			result.push({
				arab: ar[i],
				indo: id[i],
				latin: lt[i],
			})
		}
			resolve(result)
		})
		.catch(reject)
	})
}

async function tiktokDl(query) {
  let response = await axios("https://lovetik.com/api/ajax/search", {
    method: "POST",
    data: new URLSearchParams(Object.entries({ query })),
  });

  let result = {};

  result.creator = "Tioxy";
  result.title = clean(response.data.desc);
  result.author = clean(response.data.author);
  result.nowm = await shortener(
    (response.data.links[0].a || "").replace("https", "http")
  );
  result.watermark = await shortener(
    (response.data.links[1].a || "").replace("https", "http")
  );
  result.audio = await shortener(
    (response.data.links[2].a || "").replace("https", "http")
  );
  result.thumbnail = await shortener(response.data.cover);
  return result;
}
export async function tiktokDl2(url) {
  let result = {}
  const bodyForm = new formData()
  bodyForm.append("q", url)
  bodyForm.append("lang", "id")
  try {
    const { data } = await axios(`https://savetik.co/api/ajaxSearch`, {
      method: "post",
      data: bodyForm,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "User-Agent": "PostmanRuntime/7.32.2"
      }
    })
    const $ = cheerio.load(data.data)
    result.status = true
    result.caption = $("div.video-data > div > .tik-left > div > .content > div > h3").text()
    ;(result.server1 = {
      quality: "MEDIUM",
      url: $("div.video-data > div > .tik-right > div > p:nth-child(1) > a").attr("href")
    }),
      (result.serverHD = {
        quality: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").text().split("MP4 ")[1],
        url: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").attr("href")
      }),
      (result.audio = $("div.video-data > div > .tik-right > div > p:nth-child(4) > a").attr("href"))
    return result
  } catch (err) {
    result.status = false
    result.message = "Gatau kenapa"
    console.log(result)
    return result
  }
}

export async function tmpFiles(buffer) {
  return new Promise(async (resolve, reject) => {
    const { ext, mime } = await fileTypeFromBuffer(buffer)
    const form = new FormData();
    form.append('file', buffer, {
      filename: new Date() * 1 + '.' + ext,   
      contentType: mime
    });

    const { data } = await axios.post("https://tmpfiles.org/api/v1/upload", form, {
      headers: {
        ...form.getHeaders(),
      },
    })
    .catch((e) => resolve(e?.response))
    resolve(data) 
  })
}

export async function pomf(media) {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append('files[]', media, { 
      filename: new Date() * 1 + '.jpg' 
    });
    await axios.post('https://pomf2.lain.la/upload.php', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      resolve(e?.response)
    });
  })
}

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

export async function testCode(text, code) {
		
var kode = await axios("https://codepal.ai/api/code-generator", {
  "headers": {
    "accept": "application/json",
    "content-type": "application/json"
  },
  data: {
  "code": text,
  "detected_input_language": "css",
  "language": code,
  "debug": 1
},
  "method": "POST"
})

let ress = kode.data

return {
    ress
}
}

export async function getIp(ip) {
    const response = await axios.get(`http://ipinfo.io/${ip}/json?token=882ffefc502ce1`);
    return response.data;
  }
  
  export async function tiktokSearch(query) {
	return new Promise(async(resolve,reject) => {

axios("https://tikwm.com/api/feed/search", {
  headers: {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "cookie": "current_language=en",
    "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
  },
  data: {
    "keywords": query,
    "count": 12,
    "cursor": 0,
    "web": 1,
     "hd": 1
   },
  "method": "POST"
}).then(res => { 
 resolve(res.data.data) 
})
})
}

export async function tiktokUser(username) {
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

export async function yt(url, quality, type, bitrate, server = 'en68') {
  let ytId = ytIdRegex.exec(url)
  url = 'https://youtu.be/' + ytId[1]
  let res = await post(`https://www.y2mate.com/mates/${server}/analyze/ajax`, {
    url,
    q_auto: 0,
    ajax: 1
  })
  let json = await res.json()
  let { document } = (new JSDOM(json.result)).window
  let tables = document.querySelectorAll('table')
  let table = tables[{ mp4: 0, mp3: 1 }[type] || 0]
  let list
  switch (type) {
    case 'mp4':
      list = Object.fromEntries([...table.querySelectorAll('td > a[href="#"]')].filter(v => !/\.3gp/.test(v.innerHTML)).map(v => [v.innerHTML.match(/.*?(?=\()/)[0].trim(), v.parentElement.nextSibling.nextSibling.innerHTML]))
      break
    case 'mp3':
      list = {
        '128kbps': table.querySelector('td > a[href="#"]').parentElement.nextSibling.nextSibling.innerHTML
      }
      break
    default:
      list = {}
  }
  let filesize = list[quality]
  let id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
  let thumb = document.querySelector('img').src
  let title = document.querySelector('b').innerHTML
  let res2 = await post(`https://www.y2mate.com/mates/${server}/convert`, {
    type: 'youtube',
    _id: id[1],
    v_id: ytId[1],
    ajax: '1',
    token: '',
    ftype: type,
    fquality: bitrate
  })
  let json2 = await res2.json()
  let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
  let resUrl = /<a.+?href="(.+?)"/.exec(json2.result)[1]
  return {
    dl_link: resUrl.replace(/https/g, 'http'),
    thumb,
    title,
    filesizeF: filesize,
    filesize: KB
  }
}

export async function ytmp3(url) {
	try {
		const { videoDetails } = await ytdl.getInfo(url, {
			lang: "id",
		});
		const stream = ytdl(url, {
			filter: "audioonly",
			quality: 140,
		});
		const chunks = [];
		stream.on("data", (chunk) => {
			chunks.push(chunk);
		});
		await new Promise((resolve, reject) => {
			stream.on("end", resolve);
			stream.on("error", reject);
		});
		const buffer = Buffer.concat(chunks);
		return {
			meta: {
				title: videoDetails.title,
				channel: videoDetails.author.name,
				seconds: videoDetails.lengthSeconds,
				description: videoDetails.description,
				image: videoDetails.thumbnails.slice(-1)[0].url,
			},
			buffer: buffer,
			size: buffer.length,
		};
	} catch (error) {
		throw error;
	}
}

export async function ytmp4(url) {
  return new Promise((resolve, reject) => {
    try {
      const id = ytdl.getVideoID(url)
      const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`)
      .then((data) => {
        let pormat = data.formats
        let video = []
        for (let i = 0; i < pormat.length; i++) {
          if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
            let vid = pormat[i]
            video.push(vid.url)
          }
        }
        const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
        const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
        const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
        const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
        const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
        const duration = data.player_response.lengthSeconds
        
        const result = {
          title: title,
          duration: duration,
          thumb: thumb,
          channel: channel,
          published: published,
          views: views,
          url: video[0]
        }
        return(result)
      })
      resolve(yutub)
    } catch (error) {
        reject(error);
      }
      console.log(error)
  })
}

export async function tiktokTts(text, model) {
try {
const modelVoice = model ? model : 'id_001';
const { status, data } = await axios('https://tiktok-tts.weilnet.workers.dev/api/generation', {
method: "post",
data: { text: text, voice: modelVoice },
headers: {
"content-type": "application/json",
},
}
);
return Buffer.from(data.data, "base64");
} catch (err) {
console.log(err.response.data);
return err.response.data;
}
}
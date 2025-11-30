import axios from 'axios'
import cheerio from 'cheerio'
import request from 'request'

export async function ttStalk(user) {
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
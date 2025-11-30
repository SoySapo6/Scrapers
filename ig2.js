/* jangan hapus wm bang 
script by rijalganzz
base? tio nightmare 
whatsapp 34604216991 ( rijalganzz)
*/

import axios from 'axios';
import cheerio from 'cheerio';

async function ig(match) {
  const result = [];
  const form = {
    url: match,
    submit: '',
  };
  const { data } = await axios.post('https://downloadgram.org/', form);
  const $ = cheerio.load(data);
  $('#downloadhere > a').each(function (a, b) {
    const url = $(b).attr('href');
    if (url) result.push(url);
  });
  return result;
}

export {
  ig
};
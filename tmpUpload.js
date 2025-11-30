import axios from 'axios'
import FormData from 'form-data'
import { fileTypeFromBuffer } from "file-type"
import fs from "fs"
import fetch from 'node-fetch'

async function tmpFiles(buffer) {
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

/*async function fileIo(buffer) {
  const { ext, mime } = await fileTypeFromBuffer(buffer) || {}
  let form = new FormData()
  const blob = new Blob([buffer.toArrayBuffer()], { type: mime })
  form.append('file', blob, 'tmp.' + ext)
  let res = await axios.post('https://file.io/?expires=1d', { // 1 Day Expiry Date
    method: 'POST',
    body: form
  })
  let json = await res.json()
  if (!json.success) throw json
  return json.link
}
*/
async function pomf(media) {
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

export {
tmpFiles,
pomf
}
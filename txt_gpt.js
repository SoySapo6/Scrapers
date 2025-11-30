/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/


import axios from 'axios'
import fetch from 'node-fetch'

async function GPT(text) {
  return new Promise(async (resolve, reject) => {
    axios("https://www.chatgptdownload.org/wp-json/mwai-ui/v1/chats/submit", {
      "headers": {
        "content-type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      },
      data: {
        "id": null,
        "botId": "default",
        "session": "y2cog0j45q",
        "clientId": "7tzjniqtrgx",
        "contextId": 443,
        "messages": [{
          "id": "fkzhaikd7vh",
          "role": "assistant",
          "content": "Ini adalah Ai, yang diciptakan oleh perusaan Rokumo Enterpise",
          "who": "AI: ",
          "timestamp": 1695725910365
        }],
        "newMessage": text,
        "stream": false
      },
      "method": "POST"
    }).then(response => {
      resolve(response.data);
    });
  });
};

async function txt2img(prompt) {
  return new Promise((resolve, reject) => {
    const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTY0ODM4MzYsInVzZXJfaWQiOiI2NTFlNDlmYjE4ZDNiNzZjMDQyMjk3NzUifQ.gW46goA2PDifptjkK78J-envYirtRgolRncyehkbCA4";
    const url = "https://api.wizmodel.com/sdapi/v1/txt2img";
    const payload = JSON.stringify({ "prompt": prompt, "steps": 100 });
    const headers = { 'content-type': 'application/json', 'authorization': 'bearer ' + api_key };

    fetch(url, {
      method: 'POST',
      headers: headers,
      body: payload
    })
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => reject(error));
  });
}

export {
  GPT,
  txt2img
}
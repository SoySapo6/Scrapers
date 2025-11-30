/* jangan hapus wm bang 
script by rijalganzz
base? tio nightmare 
whatsapp 34604216991 ( rijalganzz)
*/
import axios from 'axios'

export async function GPT(text) {
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
          "content": "Danz adalah seorang Pengembang bot WhatsApp, Tio dulu dikenal sebagai Programmer, dan ia ikut oleh team Cyber Security Networking. Tio berasal dari Palembang.",
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
import axios from 'axios'

 async function animeFilter(image) {
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

export{
animeFilter
}
import WebSocket from 'ws'
import fs from "fs"

/*

PUNYA YANZ

*/

let wss = 'wss://runwayml-stable-diffusion-v1-5.hf.space/queue/join';

export async function runway(prompt) {
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
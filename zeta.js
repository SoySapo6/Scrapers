/* jangan hapus wm bang 
script by rijalganzz
base? tio nightmare 
whatsapp 34604216991 ( rijalganzz)
*/
import WebSocket from 'ws'; // Importing the WebSocket module

// Function to generate random letters of given length
function generateRandomLetters(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * 27); // Generate a random index between 0 and 26
    const randomLetter = String.fromCharCode('a'.charCodeAt(0) + randomIndex); // Get corresponding letter
    result += randomLetter;
  }
  return result;
}

// Asynchronous function to process audio data
async function zeta(audioBuffer) {
  return new Promise(async (resolve, reject) => {
    // Generate a random filename with .mp4 extension
    let randomFileName = Math.floor(Math.random() * 0x16345785d8a0000) + await generateRandomLetters(5) + ".mp4";
    let resultData = {};
    
    // Data to be sent in the WebSocket connection
    let initialData = {
      'fn_index': 2,
      'session_hash': "xyuk2cf684b"
    };
    
    let audioData = {
      'fn_index': 2,
      'data': [{
        'data': "data:audio/mpeg;base64," + audioBuffer.toString("base64"),
        'name': randomFileName
      }, 0, 'pm', 0.26, false, '', "en-US-AnaNeural-Female"],
      'event_data': null,
      'session_hash': "xyuk2cf684b"
    };

    // Create a new WebSocket connection
    const ws = new WebSocket("wss://yanzbotz-waifu-yanzbotz.hf.space/queue/join");

    ws.onopen = function () {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = async function (event) {
      let message = JSON.parse(event.data);
      switch (message.msg) {
        case "send_hash":
          ws.send(JSON.stringify(initialData));
          break;
        case "send_data":
          console.log("Processing your audio...");
          ws.send(JSON.stringify(audioData));
          break;
        case "process_completed":
          resultData.base64 = "https://yanzbotz-waifu-yanzbotz.hf.space/file=" + message.output.data[1].name;
          break;
      }
    };

    ws.onclose = function (event) {
      if (event.code === 1000) {
        console.log("Process completed");
      } else {
        console.error("WebSocket Connection Error");
      }
      resolve(resultData);
    };
  });
}

export { zeta };
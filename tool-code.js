import axios from 'axios'

async function codes(text, code) {
		
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

export {
    codes
}
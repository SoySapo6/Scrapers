import WebSocket from 'ws'
import fs from "fs"

const wss = 'wss://yanzbotz-instrument.hf.space/queue/join';

function generateRandomLetters(length) {
    let result = '';
    const alphabetLength = 26;

    for (let i = 0; i < length; i++) {
        const randomValue = Math.floor(Math.random() * alphabetLength);
        const randomLetter = String.fromCharCode('a'.charCodeAt(0) + randomValue);
        result += randomLetter;
    }

    return result;
}

function inst(audio) {
    return new Promise(async (resolve, reject) => {
        let result = {};
        let name = Math.floor(Math.random() * 100000000000000000) + await generateRandomLetters() + '.mp4';
        let send_has_payload = { "fn_index": 0, "session_hash": "6inywdd0rtw" };
        let send_data_payload = {
            "data": [
                {
                    "data": "data:audio/mpeg;base64," + audio.toString('base64'),
                    "name": name
                }
            ],
            "event_data": null,
            "fn_index": 0,
            "session_hash": "6inywdd0rtw"
        };

        const ws = new WebSocket(wss);
        ws.onopen = function () {
            console.log("Connected to websocket");
        };

        ws.onmessage = async function (event) {
            let message = JSON.parse(event.data);

            switch (message.msg) {
                case 'send_hash':
                    ws.send(JSON.stringify(send_has_payload));
                    break;

                case 'estimation':
                    console.log('Menunggu antrean: ️' + message.rank);
                    break;

                case 'send_data':
                    console.log('Processing your audio....');
                    ws.send(JSON.stringify(send_data_payload));
                    break;
                case 'process_completed':
                    result.vocal = 'https://yanzbotz-instrument.hf.space/file=' + message.output.data[0].name;
                    result.instrument = 'https://yanzbotz-instrument.hf.space/file=' + message.output.data[1].name;
                    break;
            }
        };

        ws.onclose = function (event) {
            if (event.code === 1000) {
                console.log('Process completed️');
            } else {
                console.log('Err : WebSocket Connection Error:\n');
            }
            resolve(result);
        };
    });
}

export default inst
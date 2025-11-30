import WebSocket from 'ws'
import fs from "fs"

const wss = 'wss://yanzbotz-waifu-yanzbotz.hf.space/queue/join';

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

function all(character, audio) {
    return new Promise(async (resolve, reject) => {
        let result = {};
        let name = Math.floor(Math.random() * 100000000000000000) + await generateRandomLetters() + '.mp4';
        let characters = {
            "kobo": 2,
            "zeta": 0,
            "gura": 20,
            "kaela": 4,
            "pekora": 6,
            "miko": 8,
            "subaru": 10,
            "korone": 12,
            "luna": 14,
            "anya": 16,
            "reine": 18,
            "calli": 22,
            "kroni": 24
        };
        let getCharacter = characters[character];

        let send_has_payload = { "fn_index": getCharacter, "session_hash": "dtniinetjz6" };
        let send_data_payload = {
            "fn_index": getCharacter,
            "data": [
                {
                    "data": "data:audio/mpeg;base64," + audio.toString('base64'),
                    "name": name
                },
                0,
                "pm",
                0.6,
                false,
                "",
                "en-US-AnaNeural-Female"
            ],
            "event_data": null,
            "session_hash": "dtniinetjz6"
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
                    result.base64 = 'https://yanzbotz-waifu-yanzbotz.hf.space/file=' + message.output.data[1].name;
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

export default all
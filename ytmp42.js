/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from 'axios'

export async function ytmp4(url) {
    const urls = { url };
    try {
        const response = await axios.post('https://socdown.com/wp-json/aio-dl/video-data/', urls, {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36',
            }
        });
        const result = {
            data: response.data.medias,
        };
        return result;
        console.log(result)
    } catch (error) {
        console.error(error);
        return error.message;
    }
}
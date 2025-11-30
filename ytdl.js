/**
ytdl-core 
**/

import ytdl from "ytdl-core";

async function yt(url) {
    
        try {

            let id = await ytdl.getVideoID(url);
            let {
                formats,
                videoDetails
            } = await ytdl.getInfo(id);
            let title = videoDetails.title;
            let durasi = videoDetails.lengthSeconds;
            let desc = videoDetails.shortDescription;
            let view = videoDetails.viewCount;
            let author = videoDetails.author;
            let video = [],
                audio = []
            Object.values(formats).filter(v => v.hasVideo == true).forEach(v => {
                video.push(v)
            })
            Object.values(formats).filter(v => v.hasAudio == true).forEach(v => {
                audio.push(v)
            })
            return {
                title,
                durasi,
                view,
                author,
                desc,
                video,
                audio
            }

        } catch (e) {
            return {msg: e}
        }
    
}

export { yt }
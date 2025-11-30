import ytdl from "ytdl-core";
import fetch from "node-fetch";

async function ytmp3(url) {
	try {
		const { videoDetails } = await ytdl.getInfo(url, {
			lang: "id",
		});
		const stream = ytdl(url, {
			filter: "audioonly",
			quality: 140,
		});
		const chunks = [];
		stream.on("data", (chunk) => {
			chunks.push(chunk);
		});
		await new Promise((resolve, reject) => {
			stream.on("end", resolve);
			stream.on("error", reject);
		});
		const buffer = Buffer.concat(chunks);
		return {
			meta: {
				title: videoDetails.title,
				channel: videoDetails.author.name,
				seconds: videoDetails.lengthSeconds,
				description: videoDetails.description,
				image: videoDetails.thumbnails.slice(-1)[0].url,
			},
			buffer: buffer,
			size: buffer.length,
		};
	} catch (error) {
		throw error;
	}
}

export {
ytmp3
}
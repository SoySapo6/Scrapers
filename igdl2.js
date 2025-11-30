import axios from 'axios'

export async function igdl2(url) {
  try {
    let result = { status: true, media: [] }
    const { data } = await axios(`https://www.y2mate.com/mates/analyzeV2/ajax`, {
      method: "post",
      data: {
        k_query: url,
        k_page: "Instagram",
        hl: "id",
        q_auto: 0
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "user-agent": "PostmanRuntime/7.32.2"
      }
    })
    await data.links.video.map((video) => result.media.push(video.url))
    return result
  } catch (err) {
    const result = {
      status: false,
      message: `Media not found`
    }
    return result
  }
}
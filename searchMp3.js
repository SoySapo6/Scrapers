import axios from 'axios'
import cheerio from 'cheerio'

export async function searchMp3(q) {
    const url = 'https://justnaija.com/search?q=' + q + '&SearchIt='; 
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const articles = [];

        $('article.result').each((index, element) => {
            const title = $(element).find('h3.result-title a').text().trim();
            const url = $(element).find('h3.result-title a').attr('href');
            const thumb = $(element).find('div.result-img img').attr('src');
            const desc = $(element).find('p.result-desc').text().trim();

            const article = {
                title,
                url,
                thumb,
                desc
            };
            articles.push(article);
        });

        return articles;
    } catch (err) {
        console.error(err);
    }
}
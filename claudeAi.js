import { v4 as uuidv4 } from "uuid"
import fetch from 'node-fetch'

export class Claude {
  constructor(cookie) {
    this.cookie = cookie;
    this.organizationId = undefined;
  }

  getHeaders() {
    return {
      accept: "text/event-stream, text/event-stream",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      baggage:
        "sentry-environment=production,sentry-release=7056d48863ef1ff17036d5f9a9ce84133c63abfc,sentry-public_key=58e9b9d0fc244061a1b54fe288b0e483,sentry-trace_id=963e5c5cde6a43219b5c61e9fd8b5be6",
      "content-type": "application/json",
      "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sentry-trace": "963e5c5cde6a43219b5c61e9fd8b5be6-b9f5b45af75131c2-0",
      cookie: this.cookie,
      Referer: "https://claude.ai/chats",
    };
  }

  getOrganizationId() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("https://claude.ai/api/organizations", {
          headers: this.getHeaders(),
        });
        const res = await response.json();
      //  const uuid = res[0].uuid;
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  create() {
    return new Promise(async (resolve, reject) => {
      try {
        const organizationId = await this.getOrganizationId();
        this.organizationId = organizationId;
        const response = await fetch(
          `https://claude.ai/api/organizations/4cc4ea19-f8da-4afa-8a97-ce3e15c61d6d/chat_conversations`,
          {
            headers: this.getHeaders(),
            method: "POST",
            body: JSON.stringify({
              uuid: uuidv4(),
              name: "",
            }),
          },
        );
        const res = await response.json();
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  chat(text) {
    return new Promise(async (resolve, reject) => {
      try {
        const chat = await this.create();
        const response = await fetch(
          `https://claude.ai/api/organizations/4cc4ea19-f8da-4afa-8a97-ce3e15c61d6d/chat_conversations/de37331e-19d3-4bb6-9e39-18f9400b9ac1/completion`,
          {
            headers: this.getHeaders(),
            method: "POST",
            body: JSON.stringify({
              prompt: text,
              timezone: "Asia/Jakarta",
              model: "claude-2.1",
              attachments: [],
              files: [],
            }),
          },
        );
        const data = await response.text();
        console.log(data)
        const regex = /"completion":"(.*?)"/g;
        let matches = [];
        let match;

        while ((match = regex.exec(data)) !== null) {
          matches.push(match[1]);
        }
        const textResult = matches.join("").replace(/ +/g, " ").trim();
        resolve({result: textResult.replace(/\\n/g, '\n')});
      } catch (e) {
        reject(e);
      }
    });
  }
}
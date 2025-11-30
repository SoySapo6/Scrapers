import fetch from 'node-fetch';
import chalk from 'chalk';

class ApiGratis {
    constructor(baseURL = 'https://api.apigratis.site') {
        this.baseURL = baseURL || 'https://api.apigratis.site';
    }

    async getStatus() {
        try {
            const response = await fetch(`${this.baseURL}/cai/status`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });
            const data = await response.json();
            return response.ok ? data : Promise.reject(new Error('Failed to fetch status'));
        } catch (error) {
            console.error(chalk.red('Error fetching status:', error.message));
            throw error;
        }
    }

    async searchCharacters(query) {
        try {
            const response = await fetch(`${this.baseURL}/cai/search_characters?query=${query}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });
            const data = await response.json();
            return response.ok ? data : Promise.reject(new Error('Failed to search characters'));
        } catch (error) {
            console.error(chalk.red('Error searching characters:', error.message));
            throw error;
        }
    }

    async getCharacterInfo(externalId) {
        try {
            const response = await fetch(`${this.baseURL}/cai/character_info?external_id=${externalId}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });
            const data = await response.json();
            return response.ok ? data : Promise.reject(new Error('Failed to fetch character info'));
        } catch (error) {
            console.error(chalk.red('Error fetching character info:', error.message));
            throw error;
        }
    }

    async sendMessage(externalId, message) {
        try {
            const response = await fetch(`${this.baseURL}/cai/send_message`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    external_id: externalId,
                    message,
                    chat_id: "",
                    n_ressurect: false
                })
            });
            const data = await response.json();
            return response.ok ? data : Promise.reject(new Error('Failed to send message'));
        } catch (error) {
            console.error(chalk.red('Error sending message:', error.message));
            throw error;
        }
    }
}

export {
    ApiGratis
};
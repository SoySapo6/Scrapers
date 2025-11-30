import axios from 'axios'
const ipinfoToken = '882ffefc502ce1'; // Ganti dengan token API ipinfo.io

async function getIPInfo(ip) {
    const response = await axios.get(`http://ipinfo.io/${ip}/json?token=${ipinfoToken}`);
    return response.data;
  }

export {
getIPInfo
}
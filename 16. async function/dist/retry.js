"use strict";
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchWithRetry = async (url, retryCount = 3, delay = 1000) => {
    for (let attempt = 0; attempt < retryCount; attempt++) {
        try {
            const response = await fetch(url);
            return await response.json();
        }
        catch (error) {
            if (attempt === retryCount - 1) {
                throw error;
            }
            await wait(delay * 2 ** attempt);
        }
    }
};
fetchWithRetry("https://api.example.com/data")
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
//# sourceMappingURL=retry.js.map
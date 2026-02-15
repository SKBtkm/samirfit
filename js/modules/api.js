import { CONFIG } from '../config.js';

export const AI = {
    async sendMessage(messages) {
        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CONFIG.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: CONFIG.MODEL,
                    messages: [
                        { role: "system", content: CONFIG.SYSTEM_PROMPT },
                        ...messages
                    ],
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка API: ' + response.status);
            }

            const data = await response.json();
            return data.choices[0].message.content;
            
        } catch (error) {
            console.error("Критическая ошибка связи с ИИ:", error);
            return "Извините, возникли технические неполадки. Попробуйте позже.";
        }
    }
};
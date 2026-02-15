import { CONFIG } from './config.js';
import { AI } from './modules/api.js';

const DOM = {
    profileScreen: document.getElementById('profile-screen'),
    chatScreen: document.getElementById('chat-screen'),
    startBtn: document.getElementById('start-btn'),
    userName: document.getElementById('user-name'),
    chatMessages: document.getElementById('chat-messages'),
    chatInput: document.getElementById('chat-input'),
    sendBtn: document.getElementById('send-btn')
};

// Хранилище диалога
let chatHistory = [];

const showChat = () => {
    DOM.profileScreen.classList.add('hidden');
    DOM.chatScreen.classList.remove('hidden');
    DOM.chatScreen.style.display = 'flex';
};

const addMessage = (text, role) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role} fade-in`;
    msgDiv.textContent = text;
    DOM.chatMessages.appendChild(msgDiv);
    DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
};

const handleSend = async () => {
    const text = DOM.chatInput.value.trim();
    if (!text) return;

    // 1. Отображаем сообщение пользователя
    addMessage(text, 'user');
    DOM.chatInput.value = '';
    chatHistory.push({ role: 'user', content: text });

    // 2. Запрос к ИИ
    const aiResponse = await AI.sendMessage(chatHistory);
    
    // 3. Отображаем ответ ИИ
    addMessage(aiResponse, 'bot');
    chatHistory.push({ role: 'assistant', content: aiResponse });
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    DOM.startBtn.addEventListener('click', () => {
        if (!DOM.userName.value) return;
        showChat();
        addMessage(`Привет, ${DOM.userName.value}! Я Самир, твой личный тренер. С чего начнем?`, 'bot');
    });

    DOM.sendBtn.addEventListener('click', handleSend);
    DOM.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
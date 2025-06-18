// script.js

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Chat UI functionality
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  // Add user message to chat
  appendMessage('user-message', message);

  // Fake bot response for now
  setTimeout(() => {
    const response = generateBotResponse(message);
    appendMessage('bot-message', response);
  }, 600);

  userInput.value = '';
}

function appendMessage(className, text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateBotResponse(userMsg) {
  // Very basic response logic
  if (userMsg.toLowerCase().includes('market')) {
    return 'You can view live markets in the Market section above.';
  } else if (userMsg.toLowerCase().includes('tools')) {
    return 'We offer advanced tools including bots, risk suite, and charts.';
  } else if (userMsg.toLowerCase().includes('sign up')) {
    return 'Click the "Create Account" button above to sign up.';
  } else {
    return 'Thanks for your message! A support team member will reply soon.';
  }
}

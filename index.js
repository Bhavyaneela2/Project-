const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const transactionInfo = document.getElementById('transactionInfo');
const gasFee = document.getElementById('gasFee');

// Simulated Hedera consensus timestamps
let consensusTimestamp = 0.034567;

function generateTransactionId() {
  const random = Math.random().toString(36).substring(2, 15);
  return `0.0.${Math.floor(Math.random() * 99999)}-${consensusTimestamp}-${random}`;
}

function updateGasFee() {
  const baseFee = 0.00001;
  const variation = (Math.random() * 0.00001).toFixed(8);
  gasFee.textContent = `${(baseFee + parseFloat(variation)).toFixed(8)} ℏ`;
}

function formatTimestamp() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addMessage(text, isSent = true) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(isSent ? 'sent' : 'received');
  messageElement.textContent = text;
  messageElement.setAttribute('data-timestamp', formatTimestamp());
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function simulateHederaTransaction() {
  const txId = generateTransactionId();
  transactionInfo.textContent = `Processing transaction: ${txId}`;
  
  // Simulate network delay and consensus
  await new Promise(resolve => setTimeout(resolve, 800));
  
  consensusTimestamp += 0.000001;
  transactionInfo.textContent = `Transaction ${txId} confirmed at ${consensusTimestamp}`;
  updateGasFee();
  
  // Clear transaction info after a delay
  setTimeout(() => {
    transactionInfo.textContent = '';
  }, 3000);
}

async function handleSendMessage() {
  const text = messageInput.value.trim();
  if (text) {
    sendButton.disabled = true;
    addMessage(text, true);
    await simulateHederaTransaction();
    
    // Simulate network response
    setTimeout(async () => {
      addMessage(`Message confirmed on Hedera network`, false);
      sendButton.disabled = false;
    }, 1000);
    
    messageInput.value = '';
  }
}

sendButton.addEventListener('click', handleSendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !sendButton.disabled) {
    handleSendMessage();
  }
});

// Initialize
updateGasFee();
addMessage('Welcome to Hedera Chat Demo! Your messages will be stored on the Hedera network.', false);
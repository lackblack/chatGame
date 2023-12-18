// Function to fetch chat history from a text file
async function fetchChatHistory() {
  try {
    const response = await fetch('chat_history.txt'); // Replace 'chat_history.txt' with your file path
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return null;
  }
}

// Function to parse the chat data
function parseChatData(chatText) {
  const messages = chatText.split('\n');
  const parsedMessages = [];

  messages.forEach(message => {
    const [timestamp, content] = message.split(' - ');
    if (content) {
      const [sender, messageContent] = content.split(': ');
      if (sender && messageContent) {
        parsedMessages.push({ sender: sender.trim(), message: messageContent.trim() });
      }
    }
  });

  return parsedMessages;
}

let currentQuoteIndex = -1; // Index of the current quote displayed

// Function to display the quote and options
function displayQuoteAndOptions(chatHistory) {
  const quoteContainer = document.getElementById('quote');
  const optionsContainer = document.getElementById('options');

  currentQuoteIndex = Math.floor(Math.random() * chatHistory.length);
  const randomQuote = chatHistory[currentQuoteIndex];

  // Display the quote
  quoteContainer.textContent = randomQuote.message;

  // Display options as buttons
  optionsContainer.innerHTML = '';
  chatHistory.forEach(chat => {
    const optionButton = document.createElement('button');
    optionButton.textContent = chat.sender;
    optionButton.addEventListener('click', () => checkAnswer(chat.sender, randomQuote.sender));
    optionsContainer.appendChild(optionButton);
  });
}

// Function to check the answer
function checkAnswer(selectedFriend, correctFriend) {
  const quoteContainer = document.getElementById('quote');
  const optionsContainer = document.getElementById('options');
  const feedbackContainer = document.getElementById('feedback');

  // Display feedback
  feedbackContainer.innerHTML = '';
  const feedback = document.createElement('p');
  feedback.textContent = selectedFriend === correctFriend ? 'Correct! You guessed it right!' : `Oops! The correct answer was ${correctFriend}.`;
  feedbackContainer.appendChild(feedback);

  // Show more text before and after the quote
  const chatHistory = parsedChatHistory;
  const totalMessages = chatHistory.length;
  const messagesToShow = 3; // Number of messages to display

  const startIndex = Math.max(0, currentQuoteIndex - messagesToShow);
  const endIndex = Math.min(totalMessages - 1, currentQuoteIndex + messagesToShow);

  let context = '';
  for (let i = startIndex; i <= endIndex; i++) {
    context += `${chatHistory[i].sender}: ${chatHistory[i].message}<br>`;
  }
  feedbackContainer.innerHTML += `<p><strong>Context:</strong><br>${context}</p>`;

  // Display a button for a new game
  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'New Game';
  newGameButton.addEventListener('click', () => {
    displayQuoteAndOptions(parsedChatHistory);
    feedbackContainer.innerHTML = '';
  });
  feedbackContainer.appendChild(newGameButton);

  // Disable option buttons after answer
  optionsContainer.querySelectorAll('button').forEach(button => {
    button.disabled = true;
  });
}

// Load chat history and parse when the page loads
window.onload = async () => {
  const chatText = await fetchChatHistory();
  if (chatText) {
    const parsedChatHistory = parseChatData(chatText);
    displayQuoteAndOptions(parsedChatHistory);
  } else {
    console.error('Failed to load chat history.');
  }
};

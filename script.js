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

// Function to display the quote and options
function displayQuoteAndOptions(chatHistory) {
  const quoteContainer = document.getElementById('quote');
  const optionsContainer = document.getElementById('options');

  // Get a random quote from the chat history
  const randomIndex = Math.floor(Math.random() * chatHistory.length);
  const randomQuote = chatHistory[randomIndex];

  // Display the quote
  quoteContainer.textContent = randomQuote.message;

  // Create an array of friend names
  const friends = chatHistory.map(chat => chat.sender);
  // Remove duplicates from the array
  const uniqueFriends = [...new Set(friends)];

  // Shuffle friend names for options
  const shuffledFriends = uniqueFriends.sort(() => Math.random() - 0.5);

  // Display options as buttons
  optionsContainer.innerHTML = '';
  shuffledFriends.forEach(friend => {
    const optionButton = document.createElement('button');
    optionButton.textContent = friend;
    optionButton.addEventListener('click', () => checkAnswer(friend, randomQuote.sender));
    optionsContainer.appendChild(optionButton);
  });
}

// Function to check the answer
function checkAnswer(selectedFriend, correctFriend) {
  if (selectedFriend === correctFriend) {
    alert('Correct! You guessed it right!');
    // Increase score or perform any other actions for a correct answer
  } else {
    alert(`Oops! The correct answer was ${correctFriend}. Try again!`);
    // Handle incorrect guess (optional)
  }

  // Display a new quote and options after the guess
  displayQuoteAndOptions(parsedChatHistory);
}

// Load chat history and parse when the page loads
window.onload = async () => {
  const chatText = await fetchChatHistory();
  if (chatText) {
    const parsedChatHistory = parseChatData(chatText);
    console.log(parsedChatHistory); // Check if the data is parsed correctly
    displayQuoteAndOptions(parsedChatHistory); // Start the game with the parsed chat history
  } else {
    console.error('Failed to load chat history.');
  }
};

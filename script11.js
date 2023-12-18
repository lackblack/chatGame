// ... (Your existing functions for fetching, parsing, and displaying quotes)

// Function to display the conversation around the selected quote
function displayConversationAroundQuote(chatHistory, currentQuoteIndex) {
  const conversationContainer = document.getElementById('conversation');
  conversationContainer.innerHTML = '';

  const messagesToShow = 4;
  const startIndex = Math.max(0, currentQuoteIndex - messagesToShow);
  const endIndex = Math.min(chatHistory.length - 1, currentQuoteIndex + messagesToShow);

  for (let i = startIndex; i <= endIndex; i++) {
    const message = chatHistory[i];
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${message.sender}</strong> (${message.timestamp}): ${message.message}`;
    conversationContainer.appendChild(messageElement);
  }
}

// Update checkAnswer function to display the conversation around the quote
function checkAnswer(selectedFriend, correctFriend) {
  if (selectedFriend === correctFriend) {
    alert('Correct! You guessed it right!');
    // Increase score or perform any other actions for a correct answer
  } else {
    alert(`Oops! The correct answer was ${correctFriend}. Try again!`);
    // Handle incorrect guess (optional)
  }

  // Display the conversation around the quote
  displayConversationAroundQuote(parsedChatHistory, currentQuoteIndex);
}

// Load chat history and parse when the page loads
window.onload = async () => {
  const chatText = await fetchChatHistory();
  if (chatText) {
    const parsedChatHistory = parseChatData(chatText);
    console.log(parsedChatHistory); // Check if the data is parsed correctly
    const currentQuoteIndex = Math.floor(Math.random() * parsedChatHistory.length);
    displayQuoteAndOptions(parsedChatHistory); // Start the game with the parsed chat history
    displayConversationAroundQuote(parsedChatHistory, currentQuoteIndex); // Display conversation around the quote
  } else {
    console.error('Failed to load chat history.');
  }
};

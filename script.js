// Sample data for demonstration purposes (replace this with your actual data)
const chatHistory = [
  { sender: 'Friend1', message: 'Hey, how are you?' },
  { sender: 'Friend2', message: 'Did you see that movie?' },
  { sender: 'Friend3', message: 'I can't believe it!' },
  // Add more chat history objects here...
];

const friends = ['Friend1', 'Friend2', 'Friend3']; // List of friends' names

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * chatHistory.length);
  return chatHistory[randomIndex];
}

function displayQuoteAndOptions() {
  const quoteContainer = document.getElementById('quote');
  const optionsContainer = document.getElementById('options');

  // Get a random quote
  const randomQuote = getRandomQuote();

  // Display the quote
  quoteContainer.textContent = randomQuote.message;

  // Shuffle friends' names for options
  const shuffledFriends = friends.sort(() => Math.random() - 0.5);

  // Display options as buttons
  optionsContainer.innerHTML = '';
  shuffledFriends.forEach(friend => {
    const optionButton = document.createElement('button');
    optionButton.textContent = friend;
    optionButton.addEventListener('click', () => checkAnswer(friend, randomQuote.sender));
    optionsContainer.appendChild(optionButton);
  });
}

function checkAnswer(selectedFriend, correctFriend) {
  if (selectedFriend === correctFriend) {
    alert('Correct! You guessed it right!');
    // Increase score or perform any other actions for a correct answer
  } else {
    alert(`Oops! The correct answer was ${correctFriend}. Try again!`);
    // Handle incorrect guess (optional)
  }

  // Display a new quote and options after the guess
  displayQuoteAndOptions();
}

// Display the first quote and options when the page loads
displayQuoteAndOptions();

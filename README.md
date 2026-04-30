# Scaler Leadership AI

A React-based AI chatbot that simulates conversations with Scaler's leadership: Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra. 

The coolest part of this project is the hidden Chain-of-Thought logic. The app forces the LLM to write out its internal reasoning inside `<thought_process>` XML tags before it answers. The frontend React layer dynamically strips those tags out while the text streams. This means the AI stays perfectly in character, but the user only ever sees a clean, final answer (with a nice bouncing dot animation while the AI "thinks").

## Features
* **3 Distinct Personas:** Each leader is engineered with highly specific prompts and unique few-shot examples.
* **Real-Time Streaming:** Text streams seamlessly into the chat bubbles just like ChatGPT.
* **Fully Responsive:** Flexbox/fluid layout that looks great on both desktop and mobile screens.

## Setup Instructions

Follow these quick steps to get the app running locally on your machine.

### 1. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed on your computer. Open your terminal, navigate to the project folder, and run:
```bash
npm install
```

### 2. Set Up Your API Key
Paste your api key in the .env file.
```text
VITE_OPENAI_API_KEY=your_api_key_here
```

### 3. Start the Development Server
Once your packages are installed and your API key is setup, fire up the Vite server:
```bash
npm run dev
```

The terminal will spit out a local host link (usually `http://localhost:5173`). Just Ctrl+Click that link to open the app in your browser and start chatting!
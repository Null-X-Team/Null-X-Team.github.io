// js/assistant.js

const BASE44_BASE_URL = "https://nullai.base44.app";
const BASE44_APP_ID = "6687ebfbbbaa7e8910eb4eb9";
const BASE44_API_KEY = "c00d41eb8e5c8e44ebae08764a75";

// Generate a random unique ID for this chat session
const chatId = "session_" + Math.random().toString(36).substring(2, 15);

/**
 * Sends a message to the Base44 database and retrieves the AI's response
 */
async function sendChatMessage(userText) {
    try {
        // 1. Send the User's message to the Base44 database
        const userMessageResponse = await fetch(`${BASE44_BASE_URL}/entities/Message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-app-id": BASE44_APP_ID, // Passing your App ID
                "api_key": BASE44_API_KEY   // Passing your API Key
            },
            body: JSON.stringify({
                role: "user",
                content: userText,
                chat_id: chatId
            })
        });

        if (!userMessageResponse.ok) {
            throw new Error("Failed to send user message to Base44 storage.");
        }

        // 2. Add a slight pause to allow the background AI Agent to process and insert its reply
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 3. Fetch the latest messages for this chat_id to get the assistant's reply
        const getMessagesResponse = await fetch(`${BASE44_BASE_URL}/entities/Message?chat_id=${chatId}&sort=createdAt:desc&limit=1`, {
            method: "GET",
            headers: {
                "x-app-id": BASE44_APP_ID,
                "api_key": BASE44_API_KEY
            }
        });

        if (!getMessagesResponse.ok) {
            throw new Error("Failed to fetch assistant reply from Base44.");
        }

        const messages = await getMessagesResponse.json();
        
        // Find the latest message that came from the assistant
        if (messages && messages.length > 0 && messages[0].role === "assistant") {
            return messages[0].content;
        } else {
            return "Thinking... (Try sending another message if I didn't catch that)";
        }

    } catch (error) {
        console.error("[Base44 Chat Error]:", error);
        return "Connection error. Unable to reach NullAI right now.";
    }
}

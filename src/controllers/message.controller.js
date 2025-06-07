import axios from "axios";
import dotenv from "dotenv"
dotenv.config()

const BOT_TOKEN = process.env.BOT_TOKEN;

const sendMessage = async (req, res) => {
  const { channel, text } = req.body;
  try {
    const response = await axios.post(
      "https://slack.com/api/chat.postMessage",
      { channel, text },
      { headers: { Authorization: `Bearer ${BOT_TOKEN}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const scheduleMessage = async (req, res) => {
  const { channel, text, post_at } = req.body;
  try {
    const response = await axios.post(
      "https://slack.com/api/chat.scheduleMessage",
      { channel, text, post_at },
      { headers: { Authorization: `Bearer ${BOT_TOKEN}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};


const getMessageHistory = async (req, res) => {
  const channel = req.params.channel;
  try {
    const response = await axios.get("https://slack.com/api/conversations.history", {
      params: { channel, limit: 10 },
      headers: { Authorization: `Bearer ${BOT_TOKEN}` },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};


const editMessage = async (req, res) => {
  const { channel, ts, text } = req.body;
  try {
    const response = await axios.post(
      "https://slack.com/api/chat.update",
      { channel, ts, text },
      { headers: { Authorization: `Bearer ${BOT_TOKEN}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const deleteMessage = async (req, res) => {
  const { channel, ts } = req.body;
  try {
    const response = await axios.post(
      "https://slack.com/api/chat.delete",
      { channel, ts },
      { headers: { Authorization: `Bearer ${BOT_TOKEN}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};


export {sendMessage, scheduleMessage, getMessageHistory, editMessage, deleteMessage}
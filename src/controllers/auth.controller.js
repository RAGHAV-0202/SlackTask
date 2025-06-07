import axios from "axios";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:3000/auth/slack/callback";

export const redirectToSlack = (req, res) => {
  const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${CLIENT_ID}&scope=chat:write,channels:read,chat:write.public,channels:history&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  res.redirect(slackAuthUrl);
};

export const slackCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const response = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI,
        },
      }
    );

    if (response.data.ok) {
      res.json(response.data);
    } else {
      res.status(400).json({ error: response.data.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

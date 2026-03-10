import {
    getLinkedInAccessToken,
    getLinkedInUser
  } from "../services/linkedinService.js";
  
  export const redirectToLinkedIn = (req, res) => {
    const clientId = (process.env.LINKEDIN_CLIENT_ID || "").trim();
    const redirectUri = (process.env.LINKEDIN_REDIRECT_URI || "").trim();
    const scope = "openid profile email";

    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope.trim(),
    });
    const redirectUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;

    res.redirect(redirectUrl);
  };
  
  export const linkedinCallback = async (req, res) => {
  
    const code = req.query.code;
  
    try {
  
      const accessToken = await getLinkedInAccessToken(code);
      const user = await getLinkedInUser(accessToken);
  
      res.redirect(
        `${process.env.FRONTEND_URL}/auth-success?user=${encodeURIComponent(
          JSON.stringify(user)
        )}`
      );
  
    } catch (error) {
      console.error(error);
      res.status(500).send("LinkedIn authentication failed");
    }
  };
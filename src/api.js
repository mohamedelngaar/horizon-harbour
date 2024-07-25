export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjNzJlN2UzMC01MWMyLTQ1ZTUtODRjYy0xZDNhZWUwYWZlNzAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNTk1NzE3NywiZXhwIjoxODczNzQ1MTc3fQ.TnzFifqaXf3MGeiovCS3pDdupQGv_IQbu1VjBeXQ2oc";

export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};

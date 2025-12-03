export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    let body;
    // parse json body
    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return { statusCode: 400, body: "Invalid JSON" };
    }

    const { signedMsg, email, residency } = body;

    // check missing fields
    if (!signedMsg || !email || !residency) {
      console.log(`Missing fields: ${body}`);
      return { statusCode: 400, body: "Missing required fields" };
    }

    // validate signed message format
    const url_base = "https://signer.is/verify/";
    if (!signedMsg.includes(url_base) || signedMsg === url_base) {
      console.log(`Invalid signed message URL: ${body}`);
      return { statusCode: 400, body: "Invalid signed message URL" };
    }

    // decode base64 payload
    let base64 = signedMsg.split("/verify/")[1].split(/[?#/]/)[0];

    let decoded;
    try {
      decoded = JSON.parse(decodeURIComponent(atob(base64)));
    } catch (e) {
      console.log(`Invalid signer payload: ${e.message}`);
      return { statusCode: 400, body: "Invalid signer payload" };
    }

    // validate expected message
    const expected_msg = "I am part of the EthStaker community and requesting an OVHcloud discount code";
    if (decoded["claimed_message"] !== expected_msg) {
      console.log(`Invalid signed message: ${decoded["claimed_message"]} | ${body}`);
      return { statusCode: 400, body: "Signed message does not match expected message" };
    }

    // send discord message
    const webhook = process.env.DISCORD_WEBHOOK_URL;
    if (!webhook) {
      console.log(`Missing DISCORD_WEBHOOK_URL env var: ${body}`);
      return { statusCode: 500, body: "Server misconfiguration" };
    }

    const message = `📬 New OVH Code Request | [Signer.is ↗](${signedMsg})
Address: [${decoded["claimed_signatory"]}](https://collectors.poap.xyz/scan/${decoded["claimed_signatory"]}?search=ethstaker)
Email: ${email}
US Resident: ${residency}`;

    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message })
      });
    } catch (err) {
      console.log(`Webhook Error: ${err.message} | ${body}`);
      return { statusCode: 502, body: "Failed to send webhook" };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };


  } catch (err) {
    console.log(`Unexpected error: ${err.message} | ${event.body}`);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};



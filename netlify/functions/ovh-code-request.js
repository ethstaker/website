export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { signedMsg, email } = JSON.parse(event.body || "{}");
    if (!signedMsg || !email) {
      console.log(`Missing signedMsg or email: ${event.body}`);
    }


    // decode signed msg
    let url_base = "https://signer.is/verify/";
    if (!signedMsg.includes(url_base) || signedMsg == url_base) {
      console.log(`Invalid signed message: ${signedMsg} | ${email}`);
      return
    }
    let base64 = signedMsg.split("/verify/")[1].split(/[?#/]/)[0];
    let decoded;
    try {
      decoded = JSON.parse(decodeURIComponent(atob(base64)));
    } catch (e) {
      console.log(`Invalid signer payload: ${e.message} | ${event.body}`);
    }    


    // send discord message
    let expected_msg = "I am part of the EthStaker community and requesting an OVHcloud discount code";
    if (decoded["claimed_message"] == expected_msg) {
      const webhook = process.env.DISCORD_WEBHOOK_URL;
      if (!webhook) {
        console.log(`Missing DISCORD_WEBHOOK_URL env var: ${decoded} | ${email}`);
      }
      message = `📬 New OVH Code Request | [Signer.is ↗](${signedMsg})
Address: [${decoded["claimed_signatory"]}](https://collectors.poap.xyz/scan/${decoded["claimed_signatory"]}?search=ethstaker)
Email: ${email}`;
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message })
      }).catch(err=>console.error(`Webhook failed: ${message}`));
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.log(`Unexpected error: ${err.message} | ${event.body}`);
  }
};


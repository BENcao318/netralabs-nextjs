var SibApiV3Sdk = require("sib-api-v3-typescript");

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
var apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

export const sendEmail = async () => {
  const sendSmtpEmail = {
    to: [
      {
        email: "cby204@gmail.com",
        name: "Ben Cao",
      },
    ],
    templateId: 1,
    headers: {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
    },
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

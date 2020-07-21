const keys = require("../keys");


module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "Reset password",
    html: `
      <h1>Forgot your password?</h1>
      <p>If no, please ignore this email</p>
      <p>If yes, please click on link below</p>
      <p><a href="${keys.BASE_URL}/auth/password/${token}">Reset password</a></p>

      <hr />
      <a href="${keys.BASE_URL}">Go to courses shop</a>
    `,
  };
}
const { transport } = require("./mail");

function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `);
  }
}

//Its better to write a seperate queue service to send mail
async function sendOfferEmails(emails, offer) {
  for (let email of emails) {
    await transport.sendMail({
      from: "juned@nimblechapps.com",
      to: email,
      subject: `New Offer - ${offer.title}`,
      html: `
      <div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
      ">
        <h2>${offer.title}</h2>
        <p>${offer.description}</p>
        <p>Juned Lanja</p>
      </div>
    `
    });
  }
}

exports.sendOfferEmails = sendOfferEmails;
exports.hasPermission = hasPermission;

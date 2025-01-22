import nodemailer from "nodemailer";
import { IOrder } from "../models/Order";


const transporter = nodemailer.createTransport({
  host: "send.one.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.MAIL_USER, // generated ethereal user
    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
});

export const sendOrderToMailingService = (order: IOrder): Promise<string> => {
  const emailBody = `
  <!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
          .ReadMsgBody { width:100%; }
          .ExternalClass { width:100%; }
          .ExternalClass * { line-height:100%; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px) {
            @-ms-viewport { width:320px; }
            @viewport { width:320px; }
          }</style><!--<![endif]--><!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style type="text/css">@media only screen and (max-width:480px) {
      table.full-width-mobile { width: 100% !important; }
      td.full-width-mobile { width: auto !important; }
    }</style><style type="text/css">/* Custom styles for the email layout */
      .content-wrapper {
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        background-color: #ffffff;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        padding: 20px;
      }
      .heading {
        font-size: 24px;
        font-weight: bold;
        color: #7C401E;
        margin-bottom: 10px;
        text-align: center;
      }
      .subheading {
        font-size: 16px;
        color: #555;
        text-align: center;
        margin-bottom: 20px;
      }
      .list-item {
        background-color: #f9f9f9;
        padding: 12px;
        margin-bottom: 10px;
        border-radius: 6px;
        font-size: 14px;
      }
      .footer-text {
        text-align: center;
        font-size: 14px;
        color: #777;
        margin-top: 20px;
      }
      .aantal {
        font-weight: bold;
        color: #7C401E;
      }
      .email {
        color: #7C401E;
      }</style></head><body style="background-color:#f7f7f7;"><div style="background-color:#f7f7f7;"><!-- Container for the email content --><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="content-wrapper-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div class="content-wrapper" style="Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0;text-align:center;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><!-- Image section --><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:550px;"><img alt="Pastadag givers 2025" height="auto" src="https://maximpeeters.be/img/Banner.aad9b470.jpg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="550"></td></tr></tbody></table></td></tr><!-- Heading --><tr><td align="left" class="heading" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;">Bedankt voor je bestelling, ${order.naam}!</div></td></tr><!-- Subheading --><tr><td align="left" class="subheading" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;">Hier zijn de details van je bestelling:</div></td></tr><!-- List of items --><tr><td align="left" class="list-item" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;"><strong>Aantal Porties Spaghetti Bolognese:</strong> <span class="aantal">${order.aantalPortiesSpaghettiBolognese}</span></div></td></tr><tr><td align="left" class="list-item" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;"><strong>Aantal Porties Pasta Pesto:</strong> <span class="aantal">${order.aantalPortiesPastaPesto}</span></div></td></tr><tr><td align="left" class="list-item" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;"><strong>Aantal Porties Pasta Prei Spek:</strong> <span class="aantal">${order.aantalPortiesPastaPreiSpek}</span></div></td></tr><tr><td align="left" class="list-item" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;"><strong>Aantal Choco Mousse:</strong> <span class="aantal">${order.aantalChocoMouse}</span></div></td></tr><tr><td align="left" class="list-item" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;"><strong>Aantal Koekjestaart:</strong> <span class="aantal">${order.aantalKoekjestaart}</span></div></td></tr><tr><td align="left" class="list-item" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;"><strong>Afhalen of Binnen eten:</strong> <span class="aantal">${order.binnenAfhalen}</span></div></td></tr><tr><td align="left" class="list-item" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;"><strong>Tijd:</strong> <span class="aantal">${order.tijd}</span></div></td></tr><!-- Closing text --><tr><td align="left" class="footer-text" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;">Indien er vragen of opmerkingen zijn kan je simpelweg antwoorden op deze mail. Je kan ons ook altijd bereiken via <span class="email"><mj-link href="mailto:givers@scoutsengidsenretie.be">givers@scoutsengidsenretie.be</mj-link></span></div></td></tr><tr><td align="left" class="footer-text" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;">We kijken ernaar uit je te zien!</div></td></tr><tr><td align="left" class="footer-text" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;">Stevige linker,</div></td></tr><tr><td align="left" class="footer-text" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#333333;">De giverleiding</div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>
  `;

  return sendMail(order.email, "Orderbevestiging Pastadag Givers 2025", emailBody, "maximpeeters38@gmail.com");
};

export const sendMail = async (to: string, subject: string, html: string, bcc: string) => {
  try {
    await transporter.sendMail({
      from: '"Pastadag givers 2025" <pastadag@scoutsengidsenretie.be>',
      to,
      subject,
      html,
      bcc,
    });
    return "Email sent successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};
const crypto = require('crypto')
require('dotenv').config()

function MailGunWebHookHandler(req,res) {
    const value = req.body.timestamp+req.body.token;
    const hash = crypto.createHmac('sha256',
              process.env.MAILGUN_API_KEY)
                   .update(value)
                   .digest('hex');
    if (hash !== req.body.signature) {
        return `Invalid signature webhook signature`
    }
    const message = `📩 New Email\nSender: ${req.body.sender} \nTo: ${req.body.recipient}\nSubject: ${req.body.subject}`
    return message
}

module.exports = MailGunWebHookHandler;


const mailTemplate = (data) => {
    return `
        <!DOCTYPE>
            <html style="margin: 0; padding: 0;">
                <head>
                    <title>* 기자재 대여 이메일 인증 *</title>
                </head>
                <body style="margin: 0; padding: 0;">
                <table cellpadding="0" cellspacing="0" style="width: 660.0px;color: #181818;font-weight: bold;font-size: 25.0px;text-align: center;padding: 30.0px 0;letter-spacing: -0.5px;border-spacing: 0;">
                <tbody>
                <tr>
                <td style="">안녕하세요.<br><span style="color: #7739DC;">기자재 대여 이메일</span>입니다.
                </td>
                </tr>
                </tbody>
                </table>
                <table cellpadding="0" cellspacing="0" style="width: 660.0px;border: 1.0px solid #404041;text-align: center;border-spacing: 0;font-size: 16.0px;">
                <tbody>
                <tr>
                <td style="padding-top: 25.0px;">요청하신 이메일 인증번호입니다.</td>
                </tr>
                <tr>
                <td style="padding: 10.0px 0 25.0px 0;font-size: 28.0px;font-weight: bold;color: #7739DC;"><span>${data}</span>
                </td>
                </tr>
                </tbody>
                </table>
                </body>
            </html>
    `
}

module.exports = { mailTemplate };
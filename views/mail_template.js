const mailTemplate = (data) => {
    return `
        <!DOCTYPE>
            <html style="margin: 0; padding: 0;">
                <head>
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
                <td style="padding-top: 25.0px;padding-bottom: 20.0px">대여하신 기자재의 반납예정일이 </td>
                </tr>
                <tr>
                <td><span style="font-size: 28.0px;font-weight: bold;color: #7739DC;">${data}</span> 까지입니다.
                </td>			
                </tr>
				<tr>
                <td style="padding-top: 20.0px;padding-bottom: 25.0px">기간 내에 반납하시길 바랍니다. </td>
                </tr>
                </tbody>
                </table>
                </body>
            </html>
    `
}

module.exports = { mailTemplate };
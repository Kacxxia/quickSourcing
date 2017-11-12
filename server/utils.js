import os from 'os'
import jwt from 'jsonwebtoken'
import nodeMailer from 'nodemailer'
import config from './config/main'


export const API_URL = process.env.NODE_ENV === 'production' ?`https://quicksourcing.info:443/api` :  'http://localhost:3000/api'

export const mailTransporter = nodeMailer.createTransport({
    host: 'smtp.qq.com',
port: 587,
secure: false, // upgrade later with STARTTLS
auth: {
    user: '296741334@qq.com',
    pass: 'ydnuwvffqylrbijc'
}})



export function generateToken(user)  {
    return jwt.sign(user, config.secret, { expiresIn: '7d' })
}

export function filterUserInfo(user) {
    const { email, avatar, _id } = user
    return { email, avatar, _id }
}

export function simplifyDate(dateObj) {
    return `${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`
}

export function generateFiexedLengthDigitsString(length) {
    let t = ''
    for (let i=0; i<length; i++) {
        t += Math.floor(Math.random()*9)
    }
    return t
}

export function generateHtmlMail(captcha) {
    return `<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tbody><tr>
    <td bgcolor="#f7f9fa" align="center" style="padding:22px 0 20px 0" class="responsive-table">
    <table border="0" cellpadding="0" cellspacing="0" style="background-color:f7f9fa; border-radius:3px;border:1px solid #dedede;margin:0 auto; background-color:#ffffff" width="552" class="responsive-table">
    <tbody><tr>
    <td bgcolor="#0373d6" height="54" align="center" style="border-top-left-radius:3px;border-top-right-radius:3px;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tbody><tr>
    <td align="center" class="zhwd-high-res-img-wrap zhwd-zhihu-logo"><div style='font-size: 28px; color: white;'>quickSourcing</div>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    <tr>
    <td bgcolor="#ffffff" align="center" style="padding: 0 15px 0px 15px;">
    <table border="0" cellpadding="0" cellspacing="0" width="480" class="responsive-table">
    <tbody><tr>
    <td>
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
    <tbody><tr>
    <td>
    <table cellpadding="0" cellspacing="0" border="0" align="left" class="responsive-table">
    <tbody><tr>
    <td width="550" align="left" valign="top">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
    
    <tbody><tr>
    <td bgcolor="#ffffff" align="left" style="background-color:#ffffff; font-size: 17px; color:#7b7b7b; padding:28px 0 0 0;line-height:25px;"><b>Kacxxia，你好，</b>
    </td>
    </tr>
    <tr>
    <td align="left" valign="top" style="font-size:14px; color:#7b7b7b; line-height: 25px; font-family:Hiragino Sans GB; padding: 20px 0px 20px 0px">你此次重置密码的验证码如下，请在 30 分钟内输入验证码进行下一步操作。 如非你本人操作，请忽略此邮件。
    </td>
    </tr>
    <tr>
    <td style="border-bottom:1px #f1f4f6 solid; padding: 0 0 40px 0;" align="center" class="padding">
    <table border="0" cellspacing="0" cellpadding="0" class="responsive-table">
    <tbody><tr>
    <td>
    <span style="font-family:Hiragino Sans GB;"><div style="padding:10px 18px 10px 18px;border-radius:3px;text-align:center;text-decoration:none;background-color:#ecf4fb;color:#4581E9;font-size:20px; font-weight:700; letter-spacing:2px; margin:0;white-space:nowrap"><span style="border-bottom: 1px dashed rgb(204, 204, 204); z-index: 1; position: static;" t="7" onclick="return false;" >${captcha}</span>
    </div>
    </span>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>
    </td>
    </tr>
    </tbody></table>`
}

export function computeArraySum(array) {
    return array.reduce((acc, value) => acc + value, 0)
}

export function computeVendorCos(a, b) {
    return computeArraySum(a.map((value, index) => value * b[index])) / (computeArraySum(a.map(value => value * value)) * computeArraySum(b.map(value => value * value)))
}
export function getCurrentIp(perfer) {
    const ifaces = os.networkInterfaces()
    const connectedIfaces = Object.keys(ifaces).filter(ifname => {
        return ifname.toLowerCase().includes('wlan') || ifname.toLowerCase().includes('eth')
    })

    console.log(connectedIfaces)

    perfer = perfer === undefined ? '' : perfer.toLowerCase()
    
    return perfer !== '' ? ifaces[perfer].filter(iface => iface.family.toLowerCase() == 'ipv4')[0].address : ifaces[connectedIfaces[0]].filter(iface => iface.family.toLowerCase() == 'ipv4')[0].address
}
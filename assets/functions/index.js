
var mailer = require('nodemailer');
require('dotenv').config();

function send(id, pw, data, k) {
    const client = mailer.createTransport({
        host: 'www3387.sakura.ne.jp', 
        port: 587, 
        auth: {user: id, pass: pw}, 
        authMethod: 'CRAM-MD5', 
        secure: false, 
        debug: true, 
        connectionTimeout: 10000
    });
    client.sendMail({
        from: 'ビビッドカラーズ株式会社 <info@vividcolors.co.jp>', 
        to: data.email, 
        bcc: 'info@vividcolors.co.jp', 
        subject: data.subject, 
        text: data.body
    }, k);

}

function cookBody(map) {
    return '　（このメールはお問い合わせ確認用に自動的に送信されています）\n' + 
      '\n' + 
      'この度はビビッドカラーズにお問い合わせいただきありがとうございます。\n' + 
      '下記の通り、お問い合わせを承りました。\n' + 
      '担当者より折り返しご連絡いたしますのでお待ちください。\n' + 
      '\n' + 
      '\n' + 
      '■ お名前\n' + 
      map.name + '\n' + 
      '\n' + 
      '■ 会社名\n' +  
      map.corp + '\n' + 
      '\n' + 
      '■ メールアドレス\n' + 
      map.email + '\n' + 
      '\n' + 
      '■ 電話番号\n' + 
      map.tel + '\n' + 
      '\n' + 
      '■ お問い合わせ種別\n' + 
      map.kind + '\n' + 
      '\n' + 
      '■ お問い合わせ内容\n' + 
      map.content + '\n' + 
      '\n' + 
      '\n' + 
      '------------------------------------------------------------\n' + 
      '受信者に喜ばれるファイル送信サービスflowy　https://flowy.jp/\n' + 
      '------------------------------------------------------------\n' + 
      'ビビッドカラーズ株式会社\n' + 
      'E-MAIL：info@vividcolors.co.jp　TEL：050-5213-2482\n' + 
      '261-0023 千葉市美浜区中瀬1-3 幕張テクノガーデンCB棟3F MBP内\n' + 
      'https://www.vividcolors.co.jp/\n';
}

exports.postMail = (req, res) => {
    if (req.method === 'OPTIONS') {
	    res.set('Access-Control-Allow-Origin', 'https://www.vividcolors.co.jp')
           .set('Access-Control-Allow-Methods', 'POST')
           .set('Access-Control-Allow-Headers', 'Content-Type')
           .status(200)
           .end();
	    return;
    }

    var data = req.body;
    data.subject = '【ビビッドカラーズ】お問い合わせありがとうございます';
    data.body = cookBody(data);
    send(process.env.SMTP_USER, process.env.SMTP_PASSWORD, data, function (err) {
        if (err) {
            console.log(err);
            res.set('Access-Control-Allow-Origin', 'https://www.vividcolors.co.jp')
               .status(500)
               .send('NG');
        } else {
            res.set('Access-Control-Allow-Origin', 'https://www.vividcolors.co.jp')
               .send('OK');
        }
    });
}


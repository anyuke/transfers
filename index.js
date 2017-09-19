/**
 * Created by Administrator on 2017/7/12.
 */
require('./init');

var url = 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers';
var agentOptions = {
    pfx: config.third.weixin.pfx, // 证书
    passphrase: config.third.weixin.mchId // 商户号
};
var bizData = {
    mch_appid: '',
    mchid: '',
    nonce_str: utils.createRandomStr(32),
    partner_trade_no: 'T' + utils.dateFormat(new Date(), 'yyyyMMddhhmmssS') + 'U' + 100001,
    openid: 'ol7yH0qim9f6Wu_1sEWNQk9GxqfQ',//用户openid
    check_name: 'NO_CHECK',
    amount: '1',
    desc: '七星江苏麻将',
    spbill_create_ip: '39.108.11.211'
};
bizData.sign = cryptoJs.MD5(utils.link(utils.sort(utils.filter(bizData))) + '&key=AAKCAQEAoEJ65ei3fIZSMjOkslB2ThWk').toString().toUpperCase();
var builder = new xml2js.Builder();
var parser = new xml2js.Parser({trim: true, explicitArray: false, explicitRoot: false});
var xmlData = builder.buildObject(bizData);
request.post(url, {form: xmlData, agentOptions: agentOptions}, function(err, rsp, body) {
    if (err) {
        logger.error(err);
        return;
    }
    parser.parseString(body, function(err, json) {
        if (err) {
            logger.error(err);
        }
        logger.info(json);
    });
});



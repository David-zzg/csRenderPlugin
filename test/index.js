const csParse = require('../libs/csParse');
const csInclude = require('../libs/csInclude');
const csVar = require('../core/csVar');
const csIf = require('../core/csIf');
const render = require('../core/csInclude');
const csFor = require('../core/csFor');
const path = require('path');
const renderObj = require('../core/render')

var content = `<!DOCTYPE html>
<html>
<head>
<title></title>
<base id="base" href="/overseawallet_hk/" />
<?cs include:PARSE_PATH("/hkwallet/inc/html/meta.shtml") ?>
<?cs include:PARSE_PATH("/hkwallet/inc/js/update_wx.shtml") ?>
<!-- 引入sw-->
<?cs include:PARSE_PATH("/hkwallet/inc/js/sw-js.shtml") ?>
<meta content="90039003" name="logger_error">

<script type="text/javascript">

var G_speedPointTime = [];
G_speedPointTime[0] = (new Date()).getTime();
G_speedPointTime[1] = (new Date()).getTime();       /*进入页面*/
    var fixPara = function(data){
       return data || "";
    }
    var fen2Yuan = function(val){
        req_time:"<?cs var:item.req_time ?>",//绑卡申请时间
        charge_type:"<?cs var:item.charge_type ?>",//绑卡充值类型，1为DDA卡，0为正常卡
        bind_status:"<?cs var:item.bind_status ?>",//绑卡类型，3为正常绑卡，1为DDA卡提交申请，2为DDA卡金额验证，45为DDA卡银行待处理
         bank_name:"<?cs var:item.bank_name ?>",
         card_expiry: "<?cs var:item.card_expiry ?>",
         card_number: "<?cs var:item.card_number ?>",
         cvv_length:"<?cs var:item.cvv_length ?>",
         defaultPM:"<?cs var:item.defaultPM ?>",
         description: "<?cs var:item.description ?>",
         information:"<?cs var:item.information ?>",
         instrument:"<?cs var:item.instrument ?>",
        
        
    }
    
    <?cs if:('zh_cn' == Language)?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_cn/base.json") ?>;
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_hk/base.json") ?>;
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_hk/base.json") ?>;
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_hk/base.json") ?>;
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;
  <?cs elif ('zh_hk' == Language || 'zh_tw' == Language)?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_hk/base.json") ?>;
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;
  <?cs /if ?>
     
     //绑卡信息
    <?cs each:item = array_bind_card ?>
    para.bindCards.payment_methods.push({
        req_time:"<?cs var:item.req_time ?>",//绑卡申请时间
        charge_type:"<?cs var:item.charge_type ?>",//绑卡充值类型，1为DDA卡，0为正常卡
        bind_status:"<?cs var:item.bind_status ?>",//绑卡类型，3为正常绑卡，1为DDA卡提交申请，2为DDA卡金额验证，45为DDA卡银行待处理
         bank_name:"<?cs var:item.bank_name ?>",
         card_expiry: "<?cs var:item.card_expiry ?>",
         card_number: "<?cs var:item.card_number ?>",
         cvv_length:"<?cs var:item.cvv_length ?>",
         defaultPM:"<?cs var:item.defaultPM ?>",
         description: "<?cs var:item.description ?>",
         information:"<?cs var:item.information ?>",
         instrument:"<?cs var:item.instrument ?>",
         name_on_card:"<?cs var:item.name_on_card ?>",
         payment_id:"<?cs var:item.payment_id ?>",
         verified:"<?cs var:item.verified ?>",
         issue_bank:"<?cs var:item.issue_bank ?>"
    })
   <?cs /each ?>
   
    
    <?cs include:PARSE_PATH("/vtools/banks/sort_utf8.js") ?>
    <?cs include:PARSE_PATH("/vtools/banks/ad_banks_utf8.js") ?>
    <?cs include:PARSE_PATH("/vtools/banks/bankconfig_utf8.js") ?>
     
    
//test
    
    
    `;


var content = `}
    var fen2Yuan = <?cs var:Language ?>`;


renderObj.renderContent(content,{
    Language:'zh_cn'
},(result)=>{
    console.log(result);
});

return;

const result = csIf(content, {
    Language:'zh_cn'
});
console.log(result);
return;
//
// const result=  csParse.getExpress(content,(expressObj)=>{
//    console.log(expressObj);
// });


// csInclude.parse(content,(obj)=>{
//    console.log(obj);
// });

// console.log(path.join('/asdsd/sad/ss/','../ddd'))
`  
     //绑卡信息
    <?cs each:item = array_bind_card ?>
    para.bindCards.payment_methods.push({
        req_time:"<?cs var:item.req_time ?>",//绑卡申请时间
        charge_type:"<?cs var:item.charge_type ?>",//绑卡充值类型，1为DDA卡，0为正常卡
        bind_status:"<?cs var:item.bind_status ?>",//绑卡类型，3为正常绑卡，1为DDA卡提交申请，2为DDA卡金额验证，45为DDA卡银行待处理
         bank_name:"<?cs var:item.bank_name ?>",
         card_expiry: "<?cs var:item.card_expiry ?>",
         card_number: "<?cs var:item.card_number ?>",
         cvv_length:"<?cs var:item.cvv_length ?>",
         defaultPM:"<?cs var:item.defaultPM ?>",
         description: "<?cs var:item.description ?>",
         information:"<?cs var:item.information ?>",
         instrument:"<?cs var:item.instrument ?>",
         name_on_card:"<?cs var:item.name_on_card ?>",
         payment_id:"<?cs var:item.payment_id ?>",
         verified:"<?cs var:item.verified ?>",
         issue_bank:"<?cs var:item.issue_bank ?>"
    })
   <?cs /each ?>`


    ` <?cs if:('zh_cn' == Language)?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_cn/base.json") ?>;
  <?cs elif ('zh_hk' == Language || 'zh_tw' == Language)?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/zh_hk/base.json") ?>;
  <?cs elif ('en' == Language)?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;
  <?cs else ?>
       lgdata = <?cs include:PARSE_PATH("/i18n/wallet/en/base.json") ?>;
  <?cs /if ?>`

const fileContent = render.readCsFile('a.html', {
    basePath: path.resolve(__dirname, '../demo/'),
});
console.log(fileContent);



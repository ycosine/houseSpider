
var Sequelize = require('sequelize');
var config = require('../config');
var moment = require('moment');

var uuidUtils = {
    inc: moment().valueOf(),
    // id生成
    uid: function() {
        var new_id = 0;
        // 毫秒时间戳
        new_id += moment().valueOf();
        // 自增
        this.inc += 1;
        new_id += this.inc;
        return new_id;
    },
};


var sequelize = new Sequelize(
    config.DB.name,
    config.DB.user,
    config.DB.passwd,
    {
        'dialect': 'mysql',
        'host': config.DB.host,
        'port': config.DB.port
    }
);

var HouseSchema = sequelize.define('house', require('./house')); 
var HouseHySchema = sequelize.define('houseHy', require('./houseHy')); 
var landlordSchema = sequelize.define('landlord', require('./landlord')); 
var landlordHySchema = sequelize.define('landlordHy', require('./landlordHy')); 
var reviewSchema = sequelize.define('review', require('./review')); 
var reviewSchtenantSchemaema = sequelize.define('tenant', require('./tenant')); 

var House = {
    //重复判断, 无论如何进行houseHy 表的更新
    save(data){
        console.log('****DATABASE_EVENT:SAVE-House****')        
        HouseHySchema.create({
            id:uuidUtils.uid(),
            houseId:data.id,
            price:data.price,
            scoreAll:data.score.score,
            scoreDetails:data.score.details,
        })
        HouseSchema.findOne({
            where:{
                id:data.id
            }
        }).then(res=>{
            if(!res){
                HouseSchema.create({
                    id:data.id,
                    landlordId:data.landlord.id,
                    title:data.info.title,
                    address:data.info.address,
                    labels:data.info.labels,
                    introduce:data.introduce,
                    info1:data.des.info1,
                    info2:data.des.info2,
                    info3:data.des.info3,
                    info4:data.des.info4,
                    info5:data.des.info5,
                    info6:data.des.info6,
                    info2:data.introduce,
                })
            } else {
                console.log('****ALERT***HOUSE_EXIST')                        
            }

        })
    }
}
var Tenant = {
    save(info){
        console.log('saveTenant')
        console.log(info)        
    }
}
var Review = {
    save(info){
        console.log('saveReview')
        console.log(info)        
    }
}
var Landlord = {
    //判断是否存在房东详情页),无论如何进行landlordHistory表的更新
    save(info){
        console.log('saveLandlord')
        console.log(info)
    }
}
module.exports = {
    House,
    Landlord,
    Tenant,
    Review
};
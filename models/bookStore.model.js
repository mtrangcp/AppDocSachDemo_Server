var db = require('./db');

const tacgiaChema = new db.mongoose.Schema(
    {
        ten: { type: String, required: true },
        namSinh: { type: Number, required: true },
        sachs: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'sachModel' }]
    },
    { collection: 'TacGia' }
);

const sachChema = new db.mongoose.Schema(
    {
        tenSach: { type: String, required: true },
        moTa: { type: String, required: true },
        namsx: { type: Number, required: false },
        tacGia: { type: db.mongoose.Schema.Types.ObjectId, ref: 'tgModel' },
        binhLuan: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'blModel' }],
        anhBia: { type: String, required: false }
    },
    { collection: 'Sach' }
);

const userChema = new db.mongoose.Schema(
    {
        username: { type: String, required: true },
        passwork: { type: String, required: true },
        email: { type: String, required: false },
        fullname: { type: String, required: false }

    },
    { collection: 'NguoiDung' }
);

const binhLuanChema = new db.mongoose.Schema(
    {
        noiDung: { type: String, required: true },
        date: { type: String, required: false },
        idSach: { type: db.mongoose.Schema.Types.ObjectId, ref: 'sachModel' },
        idUser: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel' }

    },
    { collection: 'BinhLuan' }
);

let tgModel = db.mongoose.model('tgModel', tacgiaChema);
let sachModel = db.mongoose.model('sachModel', sachChema);
let userModel = db.mongoose.model('userModel', userChema);
let blModel = db.mongoose.model('blModel', binhLuanChema);

module.exports = { tgModel, sachModel, userModel, blModel };


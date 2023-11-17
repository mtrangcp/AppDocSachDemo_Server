var { sachModel, tgModel, blModel } = require('../../models/bookStore.model');

var objReturn = {
    status: 1,
    msg: 'ok'
}

exports.getListSach = async (req, res, next) => {
    let listSach = [];

    try {
        listSach = await sachModel.find();
        if (listSach) {
            objReturn.data = listSach;
            objReturn.status = 1;
            objReturn.msg = 'lay thanh cong'

        } else {
            objReturn.status = 0;
            objReturn.msg = 'k co du lieu'
        }

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.getOneSach = async (req, res, next) => {
    try {
        const id = req.params.id;
        const sach = await sachModel.findById(id).populate('tacGia').populate('binhLuan');

        if (sach) {
            objReturn.data = sach;
            objReturn.status = 1;
            objReturn.msg = 'lay thanh cong'

        } else {
            objReturn.status = 0;
            objReturn.msg = 'k co du lieu'
        }

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);

}

exports.addSach = async (req, res, next) => {

    try {
        const newData = req.body;
        console.log(newData);
        const dataRes = await sachModel.create(newData);

        if (req.body.tacGia) {
            const tacgia = tgModel.findById(req.body.tacGia);
            await tacgia.updateOne({ $push: { sachs: dataRes._id } });
        }

        return res.status(200).json(dataRes)

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.updateSach = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await sachModel.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json(result);

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}


exports.deleteSach = async (req, res, next) => {

    try {
        const id = req.params.id;

        await blModel.deleteMany({ idSach: id })

        await tgModel.updateMany({ sachs: id }, { $pull: { sachs: id } });

        const result = await sachModel.findByIdAndDelete(id);
        return res.status(200).json(result);
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

















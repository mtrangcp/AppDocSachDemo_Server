var { tgModel, sachModel } = require('../../models/bookStore.model');

var objReturn = {
    status: 1,
    msg: 'ok'
}

exports.getListTG = async (req, res, next) => {
    let listTG = [];

    try {
        listTG = await tgModel.find();
        if (listTG) {
            objReturn.data = listTG;
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

exports.getOneTG = async (req, res, next) => {
    try {
        const id = req.params.id;

        const tacgia = await tgModel.findById(id).populate('sachs');

        if (tacgia) {
            objReturn.data = tacgia;
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

exports.addTG = async (req, res, next) => {

    try {
        const newData = req.body;
        console.log(newData);
        const dataRes = await tgModel.create(newData);
        return res.status(200).json(dataRes)

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}


exports.updateTG = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await tgModel.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json(result);

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.deleteTG = async (req, res, next) => {

    try {
        const id = req.params.id;

        await sachModel.updateMany({ tacGia: id }, { tacGia: null });

        const result = await tgModel.findByIdAndDelete(id);
        return res.status(200).json(result);
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}


















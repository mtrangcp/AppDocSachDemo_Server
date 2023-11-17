var { blModel, sachModel, userModel } = require('../../models/bookStore.model');

var objReturn = {
    status: 1,
    msg: 'ok'
}

exports.getListBLuan = async (req, res, next) => {
    let listBLuan = [];
    try {
        listBLuan = await blModel.find();
        if (listBLuan) {
            objReturn.data = listBLuan;
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

    return res.status(200).json(objReturn);
}

exports.getOneBluan = async (req, res, next) => {
    try {
        const id = req.params.id;
        const bLuan = await blModel.findById(id).populate('idSach').populate('idUser');

        if (bLuan) {
            objReturn.data = bLuan;
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

    return res.status(200).json(objReturn);
}

exports.addBLuan = async (req, res, next) => {

    try {
        const newData = req.body;
        console.log(newData);
        const binhLuan = await blModel.create(newData);

        if (req.body.idSach) {
            const sach = sachModel.findById(req.body.idSach);
            await sach.updateOne({ $push: { binhLuan: binhLuan._id } });
        }

        return res.status(200).json(binhLuan);

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.status(200).json(objReturn);
}

exports.updateBLuan = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        // if (req.body.idSach) {
        //     const sach = sach.findById(req.body.idSach);
        //     await sach.updateOne({ $push: { binhLuan: updatedData._id } });
        // }

        const result = await blModel.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json(result);

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.deleteBLuan = async (req, res, next) => {

    try {
        const id = req.params.id;

        await sachModel.updateMany(
            { binhLuan: id },
            { $pull: { binhLuan: id } }
        );

        const result = await blModel.findByIdAndDelete(id);
        return res.status(200).json(result);
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.status(200).json(objReturn);
}







debugger;

    const oldDoc = await model.findById('69bc147dc7751bc3036fb2b7').lean();

    if (!oldDoc) throw new Error("Document not found");

    // remove old _id
    delete oldDoc._id;
    oldDoc._id = '672cac644a0dded765b5c3b2';
    //oldDoc._merchantId = new req.mdb.db.ObjectId('672cac644a0dded765b5c3b2');

    // insert new doc
    //await model.create(oldDoc);
    await model.deleteOne({ _id:'69bc147dc7751bc3036fb2b7' });

    let d = new model(oldDoc);

    debugger;

    await d.save();

    // delete old doc
const express = require("express");
const Message = require("../models/message");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const palindromeHelper = require('../helpers/palindrome_check')

router.post(
    "",
    checkAuth,

    (req, res, next) => {
        const url = req.protocol + "://" + req.get("host");

        //console.log(palindromeHelper.isPalindrome(req.body.content))
        const message = new Message({
            title: req.body.title,
            content: req.body.content,
            isPalindrome: palindromeHelper(req.body.content),
            creator: req.userData.userId,
        });
        message.save().then((createdMessage) => {
            res.status(201).json({
                status: "Message added successfully",
                data: {
                    ...createdMessage._doc,
                    id: createdMessage._id,
                },
            });
        });
    }
);

router.put(
    "/:id",
    checkAuth,

    (req, res, next) => {
        // let imagePath = req.body.imagePath;
        // if (req.file) {
        //     const url = req.protocol + "://" + req.get("host");
        //     imagePath = url + "/images/" + req.file.filename;
        // }
        const message = new Message({
            _id: req.params.id,
            title: req.body.title,
            content: req.body.content,
            isPalindrome: palindromeHelper(req.body.content)
        });
        Message.updateOne({ _id: req.params.id, creator: req.userData.userId },
            message
        ).then((result) => {

            console.log(result, result.deletedCount);
            if (result.modifiedCount > 0) {
                res.status(200).json({ status: "Update successful!" });
            } else {
                res.status(401).json({ status: "Not authorized!" });
            }
        });
    }
);

router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const messageQuery = Message.find();
    let fetchedMessages;
    if (pageSize && currentPage) {
        messageQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    messageQuery
        .then((documents) => {
            fetchedMessages = documents;
            return Message.count();
        })
        .then((count) => {
            if (count == 0) {
                res.status(200).json({
                    status: "No messages found.Please add some!",
                    messages: fetchedMessages,
                    maxMessages: count,
                });
            } else {
                res.status(200).json({
                    status: "Messages fetched successfully!",
                    messages: fetchedMessages,
                    maxMessages: count,
                });
            }
        });
});

router.get("/:id", (req, res, next) => {
    Message.findById(req.params.id).then((message) => {
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ status: "Message not found!" });
        }
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Message.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
        (result) => {
            console.log(result, result.deletedCount);
            if (result.deletedCount > 0) {
                res.status(200).json({ status: "Deletion successful!" });
            } else {
                res.status(401).json({ status: "Not authorized!" });
            }
        }
    );
});

module.exports = router;
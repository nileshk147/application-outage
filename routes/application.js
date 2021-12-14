var express = require('express');
var router = express.Router();
const applicationController = require('../controller/application-controller');


router.get('/application-list', applicationController.getApplications);
router.put('/update-status',applicationController.updateApplicationStatus);

module.exports = router;

/**
 * @author Nilesh kumar
 * @description This function is for handling response returned back to api
 *              Returns same Object for all APIs
 */
 module.exports = (req, res, next) => {
    const responseObj = {
        isSuccess: false,
        message: '',
        data: '',
        error: ''
    };
    res.success = (data, message) => {
        return res.json({ ...responseObj, data, message, isSuccess: true });
    };
    res.error = (error) => {
        return res.json({ ...responseObj, error });
    };
    res.warning = (data, message) =>{
        return res.json({ ...responseObj, data, message, isSuccess: true });
    }
    next();
}

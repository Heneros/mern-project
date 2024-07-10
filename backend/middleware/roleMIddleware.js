const { ADMIN, USER, EDITOR } = require('../constants/index');

const ROLES = {
    User: USER,
    Editor: EDITOR,
    Admin: ADMIN,
};

const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user || !req?.roles) {
            return res.status(401).json({
                message: 'You are not authorized to use our platform',
            });
        }
 const allowedRoleValues = allowedRoles.flat().map(role => ROLES[role]);
        console.log('Allowed role values:', allowedRoleValues);

        const roleFound = req.roles.some(role => allowedRoleValues.includes(role));

        if (!roleFound) {
            return res.status(401).json({
                message: 'You are not authorized to perform this request',
            });
        }

        next();
    };
};


const role = { ROLES, checkRole };
module.exports = role;
const { ADMIN, USER, } = require('../constants/index');

const ROLES = {
    User: USER,
    Admin: ADMIN,
};

const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user && !req?.roles) {
            res.status(401).json({
                message: 'You are not authorized to use our platform',
            });
        }

        const rolesArray = [...allowedRoles];

        const roleFound = req.roles
            .map((role) => rolesArray.includes(role))
            .find((value) => value === true);

        if (!roleFound) {
            res.status(401).json({
                message: 'You are not authorized to perform this request',
            });
        }

        next();
    };
};

const role = { ROLES, checkRole };
module.exports = role;

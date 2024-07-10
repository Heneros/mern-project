const User = require('../../models/Users');
const asyncHandler = require('../../middleware/asyncHandler');

// $-title   Delete My Account
// $-path    DELETE /api/v1/user/profile
// $-auth    Private

const deleteMyAccount = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    await User.findByAndDelete(userId);
    res.json({ success: true, message: 'Your user account has been deleted' });
});

module.exports = deleteMyAccount;

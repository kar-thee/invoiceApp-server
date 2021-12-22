const CheckRoleAccess = (roleArray, role) => {
  try {
    if (!role || roleArray.length === 0) {
      return false;
    }

    const isPresent = roleArray.find((eachRoleItem) => eachRoleItem === role);

    return isPresent ? true : false;
  } catch (e) {
    console.log(e.message, " err-inRoleCheckMiddleware");
  }
};

module.exports = CheckRoleAccess;

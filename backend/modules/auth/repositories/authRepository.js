import User from "../models/user.js";
import Role from "../models/role.js";
import RefreshToken from "../models/refreshToken.js";
import VerificationToken from "../models/verificationToken.js";

class AuthRepository {
  async findUserByEmail(email) {
    return await User.findOne({ email })
      .select("+password")
      .populate("role");
  }

  async createUser(payload) {
    return await User.create(payload);
  }

  async findRoleByName(name) {
    return await Role.findOne({name});
  }

  async createRefreshToken(payload) {
    return await RefreshToken.create(payload);
  }

  async deleteRefeshToken(payload){
    return await RefreshToken.delete(payload);
  }

  async createVerificationToken(payload) {
    return await VerificationToken.create(payload);
  }

}

export default new AuthRepository();
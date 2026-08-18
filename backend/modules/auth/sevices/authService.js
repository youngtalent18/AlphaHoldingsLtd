import bcrypt from "bcryptjs"
import authRepository from "../repositories/authRepository"
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt"

class AuthService {
    async register(payload) {
        const {firstName, lastName, email, phone ,password} = payload;

        const exisitingUser = await authRepository.findUserByEmail(email);

        if (exisitingUser) {
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(12);

        const hashedPass = await bcrypt.hash(password, salt);

        const customerRole = await authRepository.findRoleByName("Customer");

        if (!customerRole) {
            throw new Error("Default customer role not found");
        }

        const user = await authRepository.createUser({
            password: hashedPass,
            email,
            phone,
            firstName,
            lastName,
            role: customerRole._id
        });

        return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }

        
    }

    async login(payload) {
        const { email, password} = payload;

        // finding the user
        const user = await authRepository.findUserByEmail(email);

        //sending an error message if user exists not
        if(!user) {
            throw new Error("Invalid email or password");
        }

        // we compare the passwords if user is found
        const passwordMatch = await bcrypt.compare(password, user.password);

        // we throw an error if password don't match
        if (!passwordMatch) {
            throw new Error("password mis-match");
        }

        // we check the status of the account
        if (!user.isActive) {
            throw new Error("Account is disabled");
        }

        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken(user);

        await authRepository.createRefreshToken({
            user: user._id,
            token: refreshToken,
            expiesAt: new Date(
                Date.now() + 30*24*60*60*1000
            )
        });

        return {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role.name
            },
            accessToken,

            refreshToken
        };

    }

    async logout(){

    }
}



export default new AuthService();
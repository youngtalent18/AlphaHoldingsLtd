import authService from "../sevices/authService";

class authController {
    async login(req, res, next) {
        try {
            const {email, password} = req.body;

            const result = await authService.login(
                email,
                password
            );

            res.cookie("refreshToken", result.refreshToken,{
                httpOnly: true,
                sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
                secure: process.env.NODE_ENV === "production",
                maxAge: 30*24*60*60*1000
            })

            res.status(200).json({
                success: true,
                message: "login success",
                data: {
                    user: result.user,
                    accessToken: result.accessToken
                },
            })

        }catch(error){
            next(error);
        }
    }
}

export default new authController();
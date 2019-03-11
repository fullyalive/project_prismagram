import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import JwtStrategy from "passport-jwt";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const jwtOptions = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secret: process.env.JWT_SECRET
};

const verifyUser = (payload, done) => {
    // done: 유저를 찾으면 부르는 function
    try {
        const user = await prisma.user({ id: payload.id });
        if (user !== null) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}; 

passport.use(new JwtStrategy(jwtOptions, verifyUser));

import { Request } from "express";
import bcrypt from "bcrypt";
import { Session } from "express-session";
import { LoginCredantialDto, SignupDto, SignupResponseDto } from "../dtos";
import { BadRequestError, NotFoundError } from "../error";
import { User } from "../model";
import { UserQueryHelper } from "../helper";
import { RedisLib } from "../lib/redis.lib";
import { AuthenticatedRequest, SessionUser } from "../types";

const AuthProvider = {
  login: async (
    request: Request,
    credential: LoginCredantialDto
  ): Promise<User> => {
    const user = await UserQueryHelper.findByEmail(credential.email);

    if (!user) throw new NotFoundError("User not found");

    const isPasswordValid = await bcrypt.compare(
      credential.password,
      user.password
    );

    if (!isPasswordValid) throw new BadRequestError("Invalid credentials");

    await UserQueryHelper.updateDoc(
      { lastLoginAt: Date.now(), isActive: true },
      { email: user.email }
    );

    (request.session as Session & { user?: SessionUser }).user = {
      uuid: user.uuid,
      email: user.email,
    };

    await request.session.save();

    return user;
  },

  signUp: async (newUser: SignupDto): Promise<SignupResponseDto> => {
    const existingUser = await UserQueryHelper.findByEmail(newUser.email);

    if (existingUser)
      throw new BadRequestError("Your email is already registered");

    const hashedPassword = bcrypt.hashSync(newUser.password, 10);

    const createdUser = await User.create({
      ...newUser,
      password: hashedPassword,
    });

    return {
      name: createdUser.name,
      email: createdUser.email,
      uuid: createdUser.uuid,
    };
  },

  logout: async (
    request: AuthenticatedRequest,
    sessionKey: string,
    user: User
  ): Promise<void> => {
    await UserQueryHelper.updateDoc({ isActive: false }, { email: user.email });
    await RedisLib.delete(sessionKey);

    return new Promise((resolve, reject) => {
      request.session.destroy((err) => {
        if (err) {
          reject(new BadRequestError("Failed to destroy session"));
        } else {
          resolve();
        }
      });
    });
  },
};

export default AuthProvider;

import bcrypt from "bcrypt";
import { LoginCredantialDto, SignupDto, SignupResponseDto } from "../dtos";
import { BadRequestError, NotFoundError } from "../error";
import { User } from "../model";
import { BookQueryHelper } from "../helper";

export const loginProvider = async (credential: LoginCredantialDto) => {
  const user = await BookQueryHelper.findByEmail(credential.email);

  if (!user) throw new NotFoundError("User not found");

  const hasPasswordValid = await bcrypt.compare(
    credential.password,
    user.password
  );

  if (!hasPasswordValid) throw new BadRequestError("Invalid Credentials");

  await BookQueryHelper.updateDoc(
    { lastLoginAt: Date.now(), isActive: true },
    { email: credential.email }
  );
};

export const signUpProvider = async (
  newUser: SignupDto
): Promise<SignupResponseDto> => {
  const user = await BookQueryHelper.findByEmail(newUser.email);

  if (user) throw new BadRequestError("Your email already in our app");

  const hashedPasword = bcrypt.hashSync(newUser.password, 10);

  const createdUser = await User.create({
    ...newUser,
    password: hashedPasword,
  });

  return {
    name: createdUser.name,
    email: createdUser.email,
    uuid: createdUser.uuid,
  };
};

export const logoutProvider = async (user: User) => {
  await BookQueryHelper.updateDoc({ isActive: false }, { email: user.email });
};

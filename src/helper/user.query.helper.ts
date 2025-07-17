import { User } from "../model";

const UserQueryHelper = {
  findByEmail: (email: String): Promise<User | null> => {
    return User.findOne({ where: { email: email } });
  },

  findByUUID: (uuid: string): Promise<User | null> => {
    return User.findOne({ where: { uuid } });
  },

  updateDoc: (
    updatedUser: Record<string, any>,
    whereContition: Record<string, any>
  ): Promise<[affectedCount: number]> => {
    return User.update({ ...updatedUser }, { where: { ...whereContition } });
  },
};

export default UserQueryHelper;

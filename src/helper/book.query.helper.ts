import { User } from "../model";

const BookQueryHelper = {
  findByEmail: (email: String): Promise<User | null> => {
    return User.findOne({ where: { email: email } });
  },

  updateDoc: (
    updatedUser: Record<string, any>,
    whereContition: Record<string, any>
  ) : Promise<[affectedCount: number]> => {
    return User.update({ ...updatedUser }, { where: { ...whereContition } });
  },
};

export default BookQueryHelper;

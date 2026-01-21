import { UserModel } from "../../DB/model/index.js";

export const addNewAccount = async (inputs) => {
  const { name, email, password, role } = inputs;
  const checkEmail = await UserModel.findOne({ where: { email } });
  if (checkEmail) {
    throw new Error("email exist", { cause: { status: 409 } });
  }

  const user = UserModel.build(
    { name, email, password, role },
    { fields: ["name", "email", "password", "role"] },``
  );
  await user.save({ validate: false });
};
export const updateProfile = async (inputs, userId) => {
  const checkID = await UserModel.update(inputs, { where: { id: userId } });
  if (!checkID[0]) {
    throw new Error("invalid account ID", { cause: { status: 404 } });
  }
  return checkID;
};
export const getUserBYEmail = async (inputs) => {
  const getUserBYEmail = await UserModel.findOne({
    where: { email: inputs.email },
  });
  if (getUserBYEmail === null) {
    throw new Error("No User found", { cause: { status: 404 } });
  }
  return getUserBYEmail;
};
export const RetrieveUser = async (inputs) => {
  const getUserBYId = await UserModel.findByPk(
    inputs.id,

    { attributes: { exclude: "role" } },
  );
  if (getUserBYId === null) {
    throw new Error("No User found", { cause: { status: 404 } });
  }
  return getUserBYId;
};

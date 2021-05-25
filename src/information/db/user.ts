const asyncGetDB = async () => {
  const { db } = await import("../../common/utils/firebase");
  return db;
};

export const getUser = async (uid: string) => {
  const db = await asyncGetDB();

  return db.collection("users").where("uid", "==", uid).get();
};

export const updateUser = async (
  userDocId: string,
  birthYear: number,
  gender: string
) => {
  const db = await asyncGetDB();

  return db.collection("users").doc(userDocId).update({
    birthYear,
    gender,
  });
};

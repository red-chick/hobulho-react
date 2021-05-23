import firebase from "firebase";

const asyncGetDB = async () => {
  const { db } = await import("../../common/utils/firebase");
  return db;
};

export const getAll = async () => {
  const db = await asyncGetDB();

  const snapshot = await db
    .collection("questions")
    .where("hide", "!=", true)
    .orderBy("hide")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot;
};

export const addOne = async (uid: string, createdAt: number, title: String) => {
  const db = await asyncGetDB();

  const snapshot = await db
    .collection("questions")
    .add({ uid, title, createdAt, answers: [], hide: false });

  return snapshot;
};

export const hideOne = async (id: string) => {
  const db = await asyncGetDB();

  const snapshot = await db.collection("questions").doc(id).update({
    hide: true,
  });

  return snapshot;
};

export const addAnswer = async (
  questionId: string,
  uid: string,
  like: boolean,
  createdAt: number
) => {
  const db = await asyncGetDB();

  db.collection("questions")
    .doc(questionId)
    .update({
      answers: firebase.firestore.FieldValue.arrayUnion({
        uid,
        like,
        createdAt,
      }),
    });
};

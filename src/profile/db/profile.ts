import firebase from "firebase";

const asyncGetDB = async () => {
  const { db } = await import("../../common/utils/firebase");
  return db;
};

export const getUser = async (uid: string) => {
  const db = await asyncGetDB();

  return db.collection("users").where("uid", "==", uid).get();
};

export const getQuestionsToLimit = async (
  uid: string,
  limit: number,
  lastVisible?: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
) => {
  const db = await asyncGetDB();

  const snapshot = await db
    .collection("questions")
    .where("uid", "==", uid)
    .where("hide", "!=", true)
    .orderBy("hide")
    .orderBy("createdAt", "desc")
    .startAfter(lastVisible)
    .limit(limit)
    .get();

  return snapshot;
};

export const addOneQuestion = async (
  uid: string,
  createdAt: number,
  title: String
) => {
  const db = await asyncGetDB();

  const snapshot = await db
    .collection("questions")
    .add({ uid, title, createdAt, answers: [], hide: false });

  return snapshot;
};

export const hideOneQuestion = async (id: string) => {
  const db = await asyncGetDB();

  await db.collection("questions").doc(id).update({
    hide: true,
  });
};

export const updateNewAnswer = async (
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

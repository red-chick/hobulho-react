import { useRouter } from "next/router";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { useUserContext } from "../../common/contexts/UserContext";
import { getUser, updateUser } from "../db/user";

type GENDER_TYPE = "MALE" | "FEMALE" | "OTHER";

const useUserInformation = () => {
  const {
    state: { uid },
  } = useUserContext();

  const router = useRouter();
  const [userDocId, setUserDocId] = useState(null);
  const [birthYear, setBirthYear] = useState(0);
  const [gender, setGender] = useState<GENDER_TYPE>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (uid) {
      (async () => {
        const { docs } = await getUser(uid);
        const userDoc = docs[0];
        const user = userDoc.data();
        if (user.birthYear && user.gender) router.push("/");
        else {
          setUserDocId(userDoc.id);
          setLoading(false);
        }
      })();
    }
  }, [uid]);

  const onChangeBirthYear = (birthYear: number) => {
    setBirthYear(birthYear);
  };

  const onChangeGender = (e: MouseEvent, gender: GENDER_TYPE) => {
    e.preventDefault();
    setGender(gender);
  };

  const onSubmit = async (e: FormEvent) => {
    if (!gender || !birthYear) return;

    e.preventDefault();

    setLoading(true);

    try {
      await updateUser(userDocId, birthYear, gender);
      router.push("/");
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    birthYear,
    onChangeBirthYear,
    gender,
    onChangeGender,
    onSubmit,
    loading,
    error,
  };
};

export default useUserInformation;

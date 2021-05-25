import Link from "next/link";

import { getYears } from "../../login/utils/date";
import useUserInformation from "../hooks/useUserInformation";

import Loading from "../../common/components/Loading";

import { Button } from "../../common/styled-components/Button.style";
import { Form, Control } from "../../common/styled-components/Form.style";
import { ButtonGroup, Error, Select } from "./InformationForm.style";

const InformationForm = () => {
  const {
    birthYear,
    onChangeBirthYear,
    gender,
    onChangeGender,
    onSubmit,
    loading,
    error,
  } = useUserInformation();

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Control>
          <Select
            value={birthYear}
            onChange={(e) => onChangeBirthYear(Number(e.target.value))}
          >
            {getYears().map((year) => (
              <option value={year}>{year}</option>
            ))}
            <option value={0} disabled={true}>
              출생연도
            </option>
          </Select>
        </Control>
        <Control>
          <ButtonGroup>
            <Button
              className={`${gender === "MALE" ? "is-success is-selected" : ""}`}
              onClick={(e) => onChangeGender(e, "MALE")}
            >
              남성
            </Button>
            <Button
              className={`${
                gender === "FEMALE" ? "is-success is-selected" : ""
              }`}
              onClick={(e) => onChangeGender(e, "FEMALE")}
            >
              여성
            </Button>
            <Button
              className={`${
                gender === "OTHER" ? "is-success is-selected" : ""
              }`}
              onClick={(e) => onChangeGender(e, "OTHER")}
            >
              그 외
            </Button>
          </ButtonGroup>
        </Control>
        <Control>
          <Link href="/">
            <Button
              className="is-light"
              type="submit"
              style={{ marginRight: 10 }}
            >
              건너뛰기
            </Button>
          </Link>
          <Button
            type="submit"
            className="is-primary"
            disabled={!birthYear || !gender}
          >
            정보 등록
          </Button>
        </Control>
      </Form>
      {loading && <Loading />}
      {error && <Error>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</Error>}
    </>
  );
};

export default InformationForm;

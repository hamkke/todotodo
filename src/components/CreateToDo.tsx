import { useRecoilValue, useSetRecoilState } from "recoil";
import { additionalCategories, categoryState, toDoState } from "../atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 60%;
  border-bottom: 5px dashed #000;
  input {
    margin-right: 5px;
    padding: 5px 10px;
    background-color: transparent;
    border: none;
    border: 3px dashed #000;
    outline: none;
    font-weight: bold;
  }
  button {
    padding: 5px 10px;
    background-color: transparent;
    border: 3px dashed #000;
    font-weight: bold;
    &:hover {
      border-color: #f8495e;
    }
  }
`;

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const setToDos = useSetRecoilState(toDoState);
  const selectCategory = useRecoilValue(categoryState);
  const isEmptyArray = useRecoilValue(additionalCategories);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    if (isEmptyArray.length === 0) {
      alert("범주를 먼저 만들어줘잉");
      setValue("toDo", "");
      return;
    }
    setToDos((prev) => [
      { text: toDo, category: selectCategory, id: Date.now() },
      ...prev,
    ]);
    setValue("toDo", "");
  };
  return (
    <Wrap>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: "빈칸 안돼" })}
          placeholder="무엇을?"
        />
        <button>추가하기</button>
      </form>
    </Wrap>
  );
};

export default CreateToDo;

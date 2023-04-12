import { additionalCategories } from "atoms";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Wrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 600px;
  height: 200px;
  background-color: #ffffff;
  border: 3px solid #000;
  span {
    position: absolute;
    top: 25px;
    right: 25px;
    font-size: 30px;
    color: #000;
    cursor: pointer;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  input {
    font-size: 20px;
    outline: none;
    border: none;
    border-bottom: 3px solid #000;
    width: 50%;
    background-color: transparent;
    margin-right: 10px;
    padding: 5px 10px;
  }
  button {
    font-size: 20px;
    background-color: transparent;
    border: none;
    border: 3px solid #000;
    &:hover {
      border: 3px solid ${(props) => props.theme.accentColor};
    }
  }
`;
interface IForm {
  toDo: string;
}
interface IOnclick {
  onClick: () => void;
}
const MakeNewCategoryModal = ({ onClick }: IOnclick) => {
  console.log(onClick);
  const [add, setAdd] = useRecoilState(additionalCategories);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setAdd((prev) => [...prev, toDo]);
    setValue("toDo", "");
    onClick();
  };
  return (
    <Wrap>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: "빈칸 안돼" })}
          placeholder="추가할 범주명을 작성해줘"
        />
        <button>추가하기</button>
      </form>
      <span onClick={onClick}>X</span>
    </Wrap>
  );
};

export default MakeNewCategoryModal;

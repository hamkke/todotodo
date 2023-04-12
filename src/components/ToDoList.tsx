import { useState } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  toDoSelector,
  toDoState,
  categoryState,
  Categories,
  additionalCategories,
} from "atoms";
import MakeNewCategoryModal from "./MakeNewCategoryModal";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10vh auto;
  padding: 5vh;
  width: 50vw;
  border: 5px dashed #000;
  h1 {
    text-emphasis: "⚡️";
    margin-bottom: 10px;
    border-bottom: 5px dashed #000;
    font-size: 40px;
  }
`;
const CreateBtn = styled.button`
  position: fixed;
  top: 100px;
  left: 100px;
  padding: 10px 12px;
  background-color: transparent;
  border: 5px dashed #000;
  font-size: 20px;
  font-weight: bold;
  &:hover {
    border-color: #f8495e;
  }
`;
const CategoryUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-bottom: 5px dashed #000;
  & li {
    padding: 5px;
    cursor: pointer;
  }
  & li + li {
    margin-left: 10px;
  }
  & button {
    background-color: transparent;
    border: none;
    color: #f8495e;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
`;
const ListUl = styled.ul`
  margin-top: 30px;
  width: 100%;
  & li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  & h2 {
    width: 50%;
  }
  & button {
    margin-left: 5px;
    padding: 5px 10px;
    background-color: transparent;
    border: 3px dashed #000;
    font-weight: bold;
    &:first-child {
      margin-left: 0;
    }
    &:hover {
      border-color: #f8495e;
    }
  }
`;
const ToDoList = () => {
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const toDos = useRecoilValue(toDoSelector);
  const setToDos = useSetRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const addCategory = useRecoilValue(additionalCategories);
  const onInput = (changeCategory: string) =>
    setCategory(changeCategory as Categories);
  const makeNewCategory = () => {
    setIsOpenCategory((prev) => !prev);
  };
  const setDeleteCategory = useSetRecoilState(additionalCategories);
  const handleDeleteCategory = (nowCategory: string) => {
    setToDos((prevToDos) =>
      prevToDos.filter((a) => a.category !== nowCategory)
    );
    setDeleteCategory((prev) => {
      return prev.filter((a) => a !== nowCategory);
    });
  };
  return (
    <Wrap>
      <h1>오늘의 계획</h1>
      <CategoryUl>
        {addCategory.map((a) => (
          <li key={`${Math.floor(Math.random() * 10)}-${a}`}>
            <h2 onClick={() => onInput(a)}>
              {a === category ? `🐸${a}` : a}
              <button onClick={() => handleDeleteCategory(a)}>X</button>
            </h2>
          </li>
        ))}
      </CategoryUl>
      <CreateBtn onClick={makeNewCategory}>범주 만들기 +</CreateBtn>

      <CreateToDo />

      <ListUl>
        {toDos?.map((a) => (
          <ToDo key={a.id} {...a} />
        ))}
      </ListUl>

      {isOpenCategory && <MakeNewCategoryModal onClick={makeNewCategory} />}
    </Wrap>
  );
};

export default ToDoList;

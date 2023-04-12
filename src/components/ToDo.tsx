import { MouseEvent } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Categories, IToDo, additionalCategories, toDoState } from "atoms";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const nowCategories = useRecoilValue(additionalCategories);
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    // setToDos((prevToDos) => {
    //   return prevToDos.map((toDo) =>
    //     toDo.id === id ? { ...toDo, category: name as IToDo["category"] } : toDo
    //   );
    // });
    setToDos((prev) =>
      prev.reduce<IToDo[]>((acc, curr) => {
        return curr.id === id
          ? [...acc, { ...curr, category: name as Categories }]
          : [...acc, { ...curr }];
      }, [])
    );
  };
  const handleDelete = () => {
    setToDos((prev) => {
      const newToDos = prev.filter((item) => item.id !== id);
      return newToDos;
    });
  };

  return (
    <li>
      <h2>{text}</h2>
      {/* {category !== Categories.TO_DO && (
          <button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </button>
        )}
        {category !== Categories.DOING && (
          <button name={Categories.DOING} onClick={onClick}>
            Doing
          </button>
        )}
        {category !== Categories.DONE && (
          <button name={Categories.DONE} onClick={onClick}>
            Done
          </button>
        )} */}
      <div>
        {nowCategories.map(
          (a) =>
            category !== a && (
              <button key={a} name={a} onClick={onClick}>
                {a}
              </button>
            )
        )}
        <button onClick={handleDelete}>삭제</button>
      </div>
    </li>
  );
};

export default ToDo;

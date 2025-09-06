import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTodos, updateTodo, deleteTodo } from "../lib/firebase";

function Edit() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTodos().then(todos => {
      const found = todos.find(t => t.id === id);
      setTodo(found);
    });
  }, [id]);

  if (!todo) return <div>로딩중...</div>;

  const handleUpdate = async () => {
    await updateTodo(id, { title: todo.title, detail: todo.detail, due: todo.due });
    navigate("/");
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteTodo(id);
        navigate("/");
      } catch (error) {
        alert("삭제 중 오류 발생: " + error.message);
      }
    }
  };

  return (
    <div>
      <input value={todo.title} onChange={e => setTodo({ ...todo, title: e.target.value })} />
      <textarea value={todo.detail} onChange={e => setTodo({ ...todo, detail: e.target.value })} />
      <input type="datetime-local" value={todo.due} onChange={e => setTodo({ ...todo, due: e.target.value })} />
      <button onClick={handleUpdate}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default Edit;

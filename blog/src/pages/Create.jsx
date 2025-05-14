import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../lib/firebase";

function Create() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [due, setDue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo({ title, detail, due });
    navigate("/");
  };

  return (
    <div className="form-container">
      <h1 className="form-title">할 일 추가</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>할 일 제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>할 일 내용</label>
          <textarea
            value={detail}
            onChange={e => setDetail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>마감 기한</label>
          <input
            type="datetime-local"
            value={due}
            onChange={e => setDue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">추가</button>
      </form>
    </div>
  );
}

export default Create;

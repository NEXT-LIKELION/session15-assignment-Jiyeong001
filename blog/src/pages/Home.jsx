
import { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "../lib/firebase"; // deletePost를 deleteTodo로 변경
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const data = await getTodos(); 
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteTodo(id);
        fetchPosts(); // 삭제 후 다시 목록 갱신
      } catch (e) {
        alert("삭제 중 오류: " + e.message);
        console.error(e);
      }
    }
  };

  const getDDay = (due) => {
    if (!due) return "";
    const today = new Date();
    const dueDate = new Date(due);
    // 시/분/초 무시
    today.setHours(0,0,0,0);
    dueDate.setHours(0,0,0,0);
    const diff = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
    if (diff > 0) return `D-${diff}`;
    if (diff === 0) return "D-day";
    return `D+${Math.abs(diff)}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <h1>할일 목록</h1>
      <Link to="/create">
        <button>새 할 일</button>
      </Link>
      <ul className="todo-list">
        {posts.length === 0 ? (
          <li className="todo-item">할 일이 없습니다.</li>
        ) : (
          posts.map((post) => (
            <li className="todo-item" key={post.id}>
              <h3 className="todo-title">{post.title}</h3>
              <p className="todo-detail">{post.detail}</p>
              <p className="todo-due">
                마감 기한: {post.due ? new Date(post.due).toLocaleString() : "없음"}
                {" "}
                <strong className="todo-dday">{getDDay(post.due)}</strong>
              </p>
              <button className="btn btn-delete" onClick={() => handleDelete(post.id)}>삭제하기</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;

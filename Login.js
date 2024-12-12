// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   let navigate = useNavigate();
//   let [userid, setUserid] = useState("");
//   let [userpwd, setUserpwd] = useState("");
//   let [userexerciselist, setUserexerciselist] = useState([]);
//   let [userlogin, setUserlogin] = useState("");
//   let [username, setUsername] = useState("");
//   let [userpwdchg1, setUserpwdchg1] = useState("");
//   let [userpwdchg2, setUserpwdchg2] = useState("");
//   let [userpwdchgmsg, setUserpwdchgmsg] = useState("");
//   let [userpwdchgbtnmsg, setUserpwdchgbtnmsg] = useState("");
//   let [isLoggedIn, setIsLoggedIn] = useState(false);
//   let [newExercise, setNewExercise] = useState({ name: "", sets: "", reps: "", date: "", note: "" });
//   let [editIndex, setEditIndex] = useState(null); // 수정할 운동의 인덱스

//   useEffect(() => {
//     if (userpwdchg1 === userpwdchg2) {
//       setUserpwdchgmsg("비밀번호가 일치합니다.");
//     } else {
//       setUserpwdchgmsg("비밀번호가 일치하지 않습니다.");
//     }
//   }, [userpwdchg1, userpwdchg2]);

//   const handleAddExercise = () => {
//     const newExerciseData = { ...newExercise, completed: false }; // 기본 완료 상태 추가
//     axios
//       .post(`http://localhost:8080/exercises/${userid}`, { exercise: newExerciseData })
//       .then((res) => {
//         if (res.data.ok) {
//           setUserexerciselist(res.data.exerciselist); // 서버로부터 최신 운동 리스트 동기화
//           setNewExercise({ name: "", sets: "", reps: "", date: "", note: "" }); // 입력 필드 초기화
//         } else {
//           console.error("운동 기록 등록 실패");
//         }
//       })
//       .catch((err) => console.error("서버 에러:", err));
//   };

//   const handleDeleteExercise = (index) => {
//     axios
//       .delete(`http://localhost:8080/exercises/${userid}/${index}`)
//       .then((res) => {
//         if (res.data.ok) {
//           setUserexerciselist(res.data.exerciselist);
//         } else {
//           console.error("운동 기록 삭제 실패");
//         }
//       })
//       .catch((err) => console.error("서버 에러:", err));
//   };

//   const handleEditExercise = (index) => {
//     const exercise = userexerciselist[index];
//     setNewExercise(exercise);
//     setEditIndex(index);
//   };

//   const saveUpdatedExercise = () => {
//     axios
//       .put(`http://localhost:8080/exercises/${userid}/${editIndex}`, { exercise: newExercise })
//       .then((res) => {
//         if (res.data.ok) {
//           setUserexerciselist(res.data.exerciselist);
//           setNewExercise({ name: "", sets: "", reps: "", date: "", note: "" });
//           setEditIndex(null); // 수정 모드 종료
//         } else {
//           console.error("운동 기록 수정 실패");
//         }
//       })
//       .catch((err) => console.error("서버 에러:", err));
//   };

//   const toggleCompleteExercise = (index) => {
//     const updatedExercise = {
//       ...userexerciselist[index],
//       completed: !userexerciselist[index].completed
//     };

//     axios
//       .put(`http://localhost:8080/exercises/${userid}/${index}`, { exercise: updatedExercise })
//       .then((res) => {
//         if (res.data.ok) {
//           setUserexerciselist(res.data.exerciselist);
//         } else {
//           console.error("운동 기록 완료 상태 변경 실패");
//         }
//       })
//       .catch((err) => console.error("서버 에러:", err));
//   };

//   return (
//     <div className="login">
//       <div>ID</div>
//       <div><input onChange={(event) => setUserid(event.target.value)} /></div>
//       <div>PW</div>
//       <div><input onChange={(event) => setUserpwd(event.target.value)} /></div>
//       <div>
//       <button onClick={() => {
//     axios.get("http://localhost:8080/login/" + userid + "/" + userpwd)
//         .then((res) => {
//             if (res.data.ok) {
//                 setUserlogin("로그인에 성공하셨습니다.");
//                 setUsername(res.data.user.name);
//                 setIsLoggedIn(true);
//                 setUserexerciselist(res.data.user.exerciselist || []); // 서버에서 운동 기록 받기
//             } else {
//                 setUserlogin("로그인에 실패하셨습니다.");
//                 setIsLoggedIn(false);
//                 setUserexerciselist([]); // 실패 시 운동 기록 초기화
//             }
//         })
//         .catch((err) => console.error("로그인 요청 중 오류 발생:", err));
// }}>로그인</button>
// </div>
//       <button onClick={() => navigate("/")}>회원가입 페이지</button>
//       <div><p>{userlogin}</p></div>
//       <div>
//         <h2>개인정보</h2>
//         <h2>이름 : {username}</h2>
//         {isLoggedIn && (
//         <div>
//         <h2>운동 기록</h2>
//         <div>
//           <input
//             placeholder="운동 이름"
//             value={newExercise.name}
//             onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
//           />
//           <input
//             placeholder="세트 수"
//             value={newExercise.sets}
//             onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
//           />
//           <input
//             placeholder="반복 횟수"
//             value={newExercise.reps}
//             onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
//           />
//           <input
//             placeholder="날짜"
//             type="date"
//             value={newExercise.date}
//             onChange={(e) => setNewExercise({ ...newExercise, date: e.target.value })}
//           />
//           <input
//             placeholder="메모"
//             value={newExercise.note}
//             onChange={(e) => setNewExercise({ ...newExercise, note: e.target.value })}
//           />
//           {editIndex !== null ? (
//             <button onClick={saveUpdatedExercise}>저장</button>
//           ) : (
//             <button onClick={handleAddExercise}>등록</button>
//           )}
//         </div>
//         <ul>
//   {userexerciselist.map((exercise, index) => (
//     <li key={index}>
//       <span>
//         {exercise.name} | {exercise.sets}세트 {exercise.reps}회 | {exercise.date} | {exercise.note} | {exercise.completed ? "완료" : "미완료"}
//       </span>
//       <button onClick={() => toggleCompleteExercise(index)}>완료 상태 변경</button>
//       <button onClick={() => handleEditExercise(index)}>수정</button>
//       <button onClick={() => handleDeleteExercise(index)}>삭제</button>
//     </li>
//   ))}
// </ul>
//       </div>
//       )}

//       </div>
//       <div>1차 비밀번호</div>
//       <div><input onChange={(event) => setUserpwdchg1(event.target.value)} /></div>
//       <div><p>{userpwdchgmsg}</p></div>
//       <div>2차 비밀번호</div>
//       <div><input onChange={(event) => setUserpwdchg2(event.target.value)} /></div>
//       <div>
//         <button onClick={() => {
//           axios.get("http://localhost:8080/changepw/" + userid + "/" + userpwdchg2).then((res) => {
//             if (res.data.ok) {
//               setUserpwdchgbtnmsg("비밀번호 변경에 성공하셨습니다.");
//             } else {
//               setUserpwdchgbtnmsg("비밀번호 변경에 실패하셨습니다.");
//             }
//           });
//         }}>비밀번호 변경</button>
//       </div>
//       <div><p>{userpwdchgbtnmsg}</p></div>
//     </div>
//   );
// }

// export default Login;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  let navigate = useNavigate();
  let [userid, setUserid] = useState("");
  let [userpwd, setUserpwd] = useState("");
  let [userexerciselist, setUserexerciselist] = useState([]);
  let [userlogin, setUserlogin] = useState("");
  let [username, setUsername] = useState("");
  let [userpwdchg1, setUserpwdchg1] = useState("");
  let [userpwdchg2, setUserpwdchg2] = useState("");
  let [userpwdchgmsg, setUserpwdchgmsg] = useState("");
  let [userpwdchgbtnmsg, setUserpwdchgbtnmsg] = useState("");
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [newExercise, setNewExercise] = useState({ name: "", sets: "", reps: "", date: "", note: "" });
  let [editIndex, setEditIndex] = useState(null); // 수정할 운동의 인덱스

  useEffect(() => {
    if (userpwdchg1 === userpwdchg2) {
      setUserpwdchgmsg("비밀번호가 일치합니다.");
    } else {
      setUserpwdchgmsg("비밀번호가 일치하지 않습니다.");
    }
  }, [userpwdchg1, userpwdchg2]);

  const handleAddExercise = () => {
    const newExerciseData = { ...newExercise, completed: false }; // 기본 완료 상태 추가
    axios
      .post(`http://localhost:8080/exercises/${userid}`, { exercise: newExerciseData })
      .then((res) => {
        if (res.data.ok) {
          setUserexerciselist(res.data.exerciselist); // 서버로부터 최신 운동 리스트 동기화
          setNewExercise({ name: "", sets: "", reps: "", date: "", note: "" }); // 입력 필드 초기화
        } else {
          console.error("운동 기록 등록 실패");
        }
      })
      .catch((err) => console.error("서버 에러:", err));
  };

  const handleDeleteExercise = (index) => {
    axios
      .delete(`http://localhost:8080/exercises/${userid}/${index}`)
      .then((res) => {
        if (res.data.ok) {
          setUserexerciselist(res.data.exerciselist);
        } else {
          console.error("운동 기록 삭제 실패");
        }
      })
      .catch((err) => console.error("서버 에러:", err));
  };



  const saveUpdatedExercise = () => {
    axios
      .put(`http://localhost:8080/exercises/${userid}/${editIndex}`, { exercise: newExercise })
      .then((res) => {
        if (res.data.ok) {
          setUserexerciselist(res.data.exerciselist);
          setNewExercise({ name: "", sets: "", reps: "", date: "", note: "" });
          setEditIndex(null); // 수정 모드 종료
        } else {
          console.error("운동 기록 수정 실패");
        }
      })
      .catch((err) => console.error("서버 에러:", err));
  };

  const toggleCompleteExercise = (index) => {
    const updatedExercise = {
      ...userexerciselist[index],
      completed: !userexerciselist[index].completed
    };

    axios
      .put(`http://localhost:8080/exercises/${userid}/${index}`, { exercise: updatedExercise })
      .then((res) => {
        if (res.data.ok) {
          setUserexerciselist(res.data.exerciselist);
        } else {
          console.error("운동 기록 완료 상태 변경 실패");
        }
      })
      .catch((err) => console.error("서버 에러:", err));
  };

  return (
    <div className="login">
      <div>ID</div>
      <div><input onChange={(event) => setUserid(event.target.value)} /></div>
      <div>PW</div>
      <div><input onChange={(event) => setUserpwd(event.target.value)} /></div>
      <div>
      <button onClick={() => {
    axios.get("http://localhost:8080/login/" + userid + "/" + userpwd)
        .then((res) => {
            if (res.data.ok) {
                setUserlogin("로그인에 성공하셨습니다.");
                setUsername(res.data.user.name);
                setIsLoggedIn(true);
                setUserexerciselist(res.data.user.exerciselist || []); // 서버에서 운동 기록 받기
            } else {
                setUserlogin("로그인에 실패하셨습니다.");
                setIsLoggedIn(false);
                setUserexerciselist([]); // 실패 시 운동 기록 초기화
            }
        })
        .catch((err) => console.error("로그인 요청 중 오류 발생:", err));
}}>로그인</button>
</div>
      <button onClick={() => navigate("/")}>회원가입 페이지</button>
      <div><p>{userlogin}</p></div>
      <div>
        <h2>개인정보</h2>
        <h2>이름 : {username}</h2>
        {isLoggedIn && (
        <div>
        <h2>운동 기록</h2>
        <div>
          <input
            placeholder="운동 이름"
            value={newExercise.name}
            onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
          />
          <input
            placeholder="세트 수"
            value={newExercise.sets}
            onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
          />
          <input
            placeholder="반복 횟수"
            value={newExercise.reps}
            onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
          />
          <input
            placeholder="날짜"
            type="date"
            value={newExercise.date}
            onChange={(e) => setNewExercise({ ...newExercise, date: e.target.value })}
          />
          <input
            placeholder="메모"
            value={newExercise.note}
            onChange={(e) => setNewExercise({ ...newExercise, note: e.target.value })}
          />
          {editIndex !== null ? (
            <button onClick={saveUpdatedExercise}>저장</button>
          ) : (
            <button onClick={handleAddExercise}>등록</button>
          )}
        </div>
        <ul>
  {userexerciselist.map((exercise, index) => (
    <li key={index}>
      <span>
        {exercise.name} | {exercise.sets}세트 {exercise.reps}회 | {exercise.date} | {exercise.note} | {exercise.completed ? "완료" : "미완료"}
      </span>
      <button onClick={() => toggleCompleteExercise(index)}>완료 상태 변경</button>
      <button onClick={() => handleDeleteExercise(index)}>삭제</button>
    </li>
  ))}
</ul>
      </div>
      )}

      </div>
      <div>1차 비밀번호</div>
      <div><input onChange={(event) => setUserpwdchg1(event.target.value)} /></div>
      <div><p>{userpwdchgmsg}</p></div>
      <div>2차 비밀번호</div>
      <div><input onChange={(event) => setUserpwdchg2(event.target.value)} /></div>
      <div>
        <button onClick={() => {
          axios.get("http://localhost:8080/changepw/" + userid + "/" + userpwdchg2).then((res) => {
            if (res.data.ok) {
              setUserpwdchgbtnmsg("비밀번호 변경에 성공하셨습니다.");
            } else {
              setUserpwdchgbtnmsg("비밀번호 변경에 실패하셨습니다.");
            }
          });
        }}>비밀번호 변경</button>
      </div>
      <div><p>{userpwdchgbtnmsg}</p></div>
    </div>
  );
}

export default Login;
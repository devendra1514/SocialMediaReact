import { useEffect, useState } from "react";
import apiCall from "./apiService";
import UserCard from "./User";

function Users() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('')

  const fetchUsers = async () => {
    const response = await apiCall(`api/v1/users?page=${page}&q=${q}&per_page=3`);
    if(response.status === 200){
      setUsers((prevUsers) => [...prevUsers, ...response.data.users])
    }
  }

  useEffect(() => {
    setPage(1)
    setUsers([])
  }, [q])

  useEffect(() => {
    fetchUsers();
  }, [page, q])
  return(
    <>
      <input
        type="text"
        id='q'
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{padding: '5px', textAlign: 'center'}}
      />
      
      {users.map((userData) => (
        <UserCard key={userData.user_id} user={userData} />
      ))}
      <button
        className="btn btn-primary mt-3"
        onClick={() => setPage((prevPage) => prevPage + 1)}
      >Load More
      </button>
    </>
  )
}

export default Users;
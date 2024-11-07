import { useEffect, useState } from "react";
import apiCall from "./apiService";
import UserCard from "./User";
import SearchBar from "./SearchBar";
import '../css/SearchBar.css';

function Users() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState('');
  const [queryChanged, setQueryChanged] = useState(false);

  const fetchUsers = async () => {
    const response = await apiCall(`api/v1/users?page=${page}&q=${q}&per_page=3`);
    if (response.status === 200) {
      setUsers((prevUsers) => [...prevUsers, ...response.data.users]); //used spread operator(...) to append new data in the existing array
    }
  };

  const handleSearch = (query) => {
    if (query !== q) {
      setQ(query);
      setPage(1);
      setUsers([]);
      setQueryChanged(true);
    }
  };

  useEffect(() => {
    if (queryChanged || page > 1 || q === '') {
      fetchUsers();
      setQueryChanged(false);
    }
  }, [page, q]);

  return (
    <>
      <div className="container w-75 my-3 p-4 rounded shadow-sm users-container">
        <SearchBar onSearch={handleSearch} />
        <div className="users-list-container" style={{ padding: '30px 20px' }}>
          {users.map((userData) => (
            <UserCard key={userData.user_id} user={userData} />
          ))}
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => setPage((prevPage) => prevPage + 1)}
          style={{ width: '30%' }}
        >
          Load More
        </button>
      </div>
    </>
  );
}

export default Users;

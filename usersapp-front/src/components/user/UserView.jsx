import axios from 'axios';
import React, { useCallback } from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const api = axios.create({baseURL: process.env.REACT_APP_API_URL});

const UserView = () => {

    
    const {id} = useParams();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        birthdate: '',
        phone: '',
        addresses: []
    })

    const loadUser = useCallback(async () => {
      const result = await api.get(`/api/users/user/${id}`);
      setUser(result.data);
    }, [id]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    
    //get the addresses from the addresses array
    const homeAddress = user.addresses.find(addr => addr.type === 'HOME')?.address || '';
    const workAddress = user.addresses.find(addr => addr.type === 'WORK')?.address || '';

  return (

    <div className="container mt-5">
      <h3 className="mb-4 text-center">User Details</h3>
      <table className="table table-bordered shadow">
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{user.firstName}</td>
            <th>Last Name</th>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>{user.gender}</td>
            <th>Phone</th>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <th>Birthdate</th>
            <td colSpan="3">{user.birthdate}</td>
          </tr>
          <tr>
            <th>Home Address</th>
            <td colSpan="3">{homeAddress}</td>
          </tr>
          <tr>
            <th>Work Address</th>
            <td colSpan="3">{workAddress}</td>
          </tr>
        </tbody>
      </table>
    <Link to={"/users"} type="submit" className="btn btn-outline-danger btn-lg">
        Back
    </Link>
    </div>
  
  )
}

export default UserView;
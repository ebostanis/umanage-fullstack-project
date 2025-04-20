import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

const api = axios.create({baseURL: process.env.REACT_APP_API_URL});

const AddUser = () => {

    
    const navigate = useNavigate();
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const[user, setUser] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        birthdate: '',
        phone: '',
        homeAddress: '',
        workAddress: ''
    })

    const{firstName, lastName, gender, birthdate, phone} = user;
    
    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const saveUser = async () => {
        const addresses = [];
        
        //store addresses depending on the type
        if (user.homeAddress.trim() !== '') {
            addresses.push({ type: 'HOME', address: user.homeAddress });
        }
    
        if (user.workAddress.trim() !== '') {
            addresses.push({ type: 'WORK', address: user.workAddress });
        }
    
        //user object after formatting the date and storing the addresses from the form
        const formattedUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            birthdate: formatDate(user.birthdate),
            phone: user.phone,
            addresses
        };
    
        try {
            await api.post("/api/users", formattedUser);
            setOpenSuccessDialog(true);

            setTimeout(() => {
                setOpenSuccessDialog(false);
                navigate("/");
            }, 1500);
        } catch (error) {
            console.error("Error saving user:", error);
            alert("Failed to save user");
        }
    };

  return (
    <div className='col-sm-8 py-5 px-5 offset-2 shadow border mt-3' 
            style={{borderRadius: '10px'}}>
        <form onSubmit={(e) => { e.preventDefault(); saveUser(); }}>
            <div className='input-group mb-5'>
                <label
                    className='input-group-text'
                    htmlFor='firstName'
                        >First Name</label>
                <input
                    className='form-control col-sm-6'
                    type='text'
                    name='firstName'
                    id='firstName'
                    pattern='^[a-zA-Z ]*$'
                    title= "Name can not include numbers"
                    required
                    value={firstName}
                    onChange={(e) => handleInputChange(e)}/>
            </div>
            <div className='input-group mb-5'>
                <label
                    className='input-group-text'
                    htmlFor='lastName'
                        >Last Name</label>
                <input
                    className='form-control col-sm-6'
                    type='text'
                    name='lastName'
                    id='lastName'
                    pattern='^[a-zA-Z ]*$'
                    title= "Name can not include numbers"
                    required
                    value={lastName}
                    onChange={(e) => handleInputChange(e)}/>
            </div>
            <div className='input-group mb-5'>
                <label
                    className='input-group-text'
                    htmlFor='gender'
                        >Gender</label>
                <select 
                    className="form-select-sm" 
                    name='gender' 
                    id="gender" 
                    required
                    value={gender}
                    onChange={(e) => handleInputChange(e)}>
                        <option disabled value="">Choose...</option>
                        <option>M</option>
                        <option>F</option>
                </select>
            </div>
            <div className='input-group mb-5'>
                <label
                    className='input-group-text'
                    htmlFor='birthdate'
                        >Birth-Date</label>
                <input
                    className='form-control col-sm-6'
                    type='date'
                    name='birthdate'
                    id='birthdate'
                    required
                    value={birthdate}
                    onChange={(e) => handleInputChange(e)}/>
            </div>
            <div className='input-group mb-5'>
                <label
                    className='input-group-text'
                    htmlFor='phone'
                        >Phone No.</label>
                <input
                    className='form-control col-sm-6'
                    type='tel'
                    name='phone'
                    id='phone'
                    value={phone}
                    onChange={(e) => handleInputChange(e)}
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number"/>
            </div>
            <div className='input-group mb-5'>
                <label 
                    className='input-group-text' 
                    htmlFor='homeAddress'>
                        Home Address</label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='homeAddress'
                        id='homeAddress'
                        value={user.homeAddress}
                        onChange={handleInputChange}
                        placeholder="Optional"/>
            </div>
            <div className='input-group mb-5'>
                <label 
                    className='input-group-text' 
                    htmlFor='workAddress'>
                        Work Address</label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='workAddress'
                        id='workAddress'
                        value={user.workAddress}
                        onChange={handleInputChange}
                        placeholder="Optional"/>
            </div>
            <div className="row mb-5">
				<div className="col-sm-2">
					<button
						type="submit"
						className="btn btn-outline-success btn-lg">
						Save
					</button>
				</div>

				<div className="col-sm-2">
					<Link
						to={"/"}
						type="submit"
						className="btn btn-outline-danger btn-lg">
						Cancel
					</Link>
				</div>
			</div>
        </form>
        <Dialog
            open={openSuccessDialog}
            onClose={() => setOpenSuccessDialog(false)}>
        <DialogTitle>Registration Complete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    User has been successfully registered!
                </DialogContentText>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddUser
"use client";

import React, { SetStateAction } from 'react'
import { useRouter } from 'next/navigation';
import {toast} from 'react-toastify';


const FormUser = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState<any | null>(null);
  const [error, setError] = React.useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevstate: any) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setError("");
    const response = await fetch("/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const message = await response.text();
      setError(message);
      toast.error(message);
    } else {
      toast.success("User created successfully");
      router.refresh();
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} method='POST' className='flex flex-col gap-3 w-1/2'>
      <h1>Create new user</h1>
      <label>Name</label>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formData?.name}
        className="border border-gray-300 p-2"
        required
      />
      <label>EMail</label>
      <input
        type="text"
        name="email"
        onChange={handleChange}
        value={formData?.email}
        className="border border-gray-300 p-2"
        required
      />
      <label>Password</label>
      <input
        type="text"
        name="password"
        onChange={handleChange}
        value={formData?.password}
        className="border border-gray-300 p-2"
        required
      />
      <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Creer un utilisateur</button>
      <p className='text-red-500'>{error}</p>
    </form>
    )
}

export default FormUser

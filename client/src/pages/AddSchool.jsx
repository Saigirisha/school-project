import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./AddSchool.css";

const AddSchool = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);
    if (data.image && data.image.length > 0) formData.append("image", data.image[0]);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/addSchool`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("School added successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Error adding school");
    }
  };

  return (
    <div className="form-page">
      <h2>Add School</h2>
      <form className="school-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name", { required: true })} placeholder="School Name" />
        {errors.name && <span>Name is required</span>}
        <input type="text" {...register("address", { required: true })} placeholder="Address" />
        {errors.address && <span>Address is required</span>}
        <input type="text" {...register("city", { required: true })} placeholder="City" />
        {errors.city && <span>City is required</span>}
        <input type="text" {...register("state", { required: true })} placeholder="State" />
        {errors.state && <span>State is required</span>}
        <input type="number" {...register("contact", { required: true })} placeholder="Contact" />
        {errors.contact && <span>Contact is required</span>}
        <input type="email" {...register("email_id", { required: true })} placeholder="Email" />
        {errors.email_id && <span>Email is required</span>}
        <input type="file" {...register("image")} />
        <button type="submit">Add School</button>
      </form>
    </div>
  );
};

export default AddSchool;

import React from "react";
import { Button } from "react-bootstrap";

const CreateCarForm = () => {
  async function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    const res = await fetch("/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    console.log(result);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Create car</h1>
        <div className='mb-3'>
          <label htmlFor='make' className='form-label'>
            Make
          </label>
          <input type='text' name='make' id='make' className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='model' className='form-label'>
            Model
          </label>
          <input type='text' name='model' id='model' className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='image' className='form-label'>
            Image URL
          </label>
          <input type='url' name='image' id='image' className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea name='description' id='description' className='form-control' rows='2'></textarea>
        </div>
        <Button type='submit'>Create car</Button>
      </form>
    </>
  );
};

export default CreateCarForm;

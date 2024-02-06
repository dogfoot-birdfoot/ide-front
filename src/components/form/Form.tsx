import React, { FC } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type FormProps = {
  title: string;
  getDataForm: (email: string, password: string) => void;
};

type Inputs = {
  email: string;
  password: string;
};

const Form: FC<FormProps> = ({ title, getDataForm }) => {
  const { register, handleSubmit, reset } = useForm<Inputs>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ email, password }) => {
    getDataForm(email, password);
    reset();
  };

  const userEmail = {
    required: '필수 필드입니다.',
  };

  const userPassword = {
    required: '필수 필드입니다.',
    minLength: {
      value: 6,
      message: '최소 6자입니다.',
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <input
          type='email'
          placeholder='E-mail'
          {...register('email', userEmail)}
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      </div>

      <div>
        <input
          type='password'
          placeholder='Password'
          {...register('password', userPassword)}
          className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      </div>
      <button
        type='submit'
        className='w-full px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700'
      >
        {title}
      </button>
    </form>
  );
};

export default Form;

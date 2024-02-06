import { Link } from 'react-router-dom';
import SignIn from './sign-in/SignIn';

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-6 m-4 bg-white rounded shadow-lg w-full max-w-xl text-center'>
        <h1 className='text-3xl font-bold mb-6'>로그인</h1>

        <SignIn />
        <p className='mt-4 text-center'>
          계정이 없습니까?{' '}
          <Link to={'/register'} className='text-blue-500 hover:text-blue-700'>
            가입하기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;



import Link from '@/components/NavLink'
import Form from '@/app/(auth)/post/Form'

function Modal(props) {

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-8 border w-96 shadow-lg rounded-md  bg-gray-100  text-black  dark:bg-slate-900 dark:text-white">
        <button type='button' className='absolute top-1 right-2' aria-label="close" onClick={props.closeModal}>
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z" fill="#ecebff"></path> </g></svg>
        </button>
        <div className="text-center">
          <h3 className="text-3xl font-bold">Create new post</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-lg text-gray-500"></p>
          </div>
          <div>
            <Form closeModal={props.closeModal} post={props.post} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal

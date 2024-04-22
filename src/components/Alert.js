import React, { useEffect, useState } from 'react';
import Link from 'next/link'

const Alert = () => {
    const [showAlert, setshowAlert] = useState(true)
    const closeAlert = () => {
        setshowAlert(false);
    }

    return (<>
        {(showAlert) && (
            <div className="relative selection:bg-fuchsia-300 language-html selection:text-fuchsia-900 font-['Nunito'] text-white  bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
                <div className="py-4 px-6">
                    <button type='button' className='absolute top-1 right-2' aria-label="close" onClick={closeAlert}>
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z" fill="#ecebff"></path> </g></svg>
                    </button>
                    <p className='mb-2'>Hey there 👋 you can try the backend api by clicking here:     <Link
                        href={`https://www.postman.com/payload-candidate-90171041/workspace/api-binary-blog/collection/31732887-467e8bb8-fa2b-4020-972d-211b763baca4?action=share&creator=31732887`}
                        className="ml-2 mr-3 text-sm font-medium uppercase text-fuchsia-500 hover:text-fuchsia-600 dark:hover:text-primary-400"
                        target='_blank'
                    >
                        Go to postman!
                    </Link></p>
                
                </div>
            </div>
        )}
    </>
    )
}

export default Alert

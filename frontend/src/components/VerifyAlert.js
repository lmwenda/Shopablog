"use client";
import verifyUser from "@/app/profile/verifyUser";

 

const VerifyAlert = () => {
    return(
        <>
            <div className="flex items-center p-3 mx-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <div className="flex items-center justify-between space-x-[80vw] p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                    <div className="justify-start flex items-center">
                        <svg className="shrink-0 inline w-4 h-3 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Info</span>

                        <div className="">
                            <span className="font-medium">Verify Email</span> 
                        </div>
                    </div>

                    <button className="items-end justify-end bg-yellow-400 text-blue-400 p-3 rounded" onClick={verifyUser}>
                        Send Email Verification
                    </button>
                </div>
            </div>
        </>
    );
}

export default VerifyAlert;
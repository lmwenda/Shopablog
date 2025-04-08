
function Page()
{
    return(
        <>
            <div className="text-center  mt-3 h-screen container mx-3 items-center flex-column">
                <h1 className="text-2xl"> Profile </h1>
                <div className="flex border border-black h-[50%] flex-column space-y-12">
                <label>Email</label>

                <label>Username</label>

                <label>Email Verified</label>
                    
                <label>Creator</label>
                </div>
            </div>
        </>
    );
}

export default Page;
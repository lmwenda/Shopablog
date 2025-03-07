"use client";

import BrowseBlog from "../../../components/BrowseBlog"

export default function Page(){
    return(
        <div className="">
            <div className="flex flex-col mx-auto h-screen border border-black flex-center items-center container">
                <BrowseBlog />
                <BrowseBlog />
                <BrowseBlog />
            </div>
        </div>
    )
}
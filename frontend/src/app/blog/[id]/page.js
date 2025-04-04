"use client";

import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();

    console.log(params);
    return(
        <div>
            <h1>Blog ID: {id}</h1>
        </div>
    );
}
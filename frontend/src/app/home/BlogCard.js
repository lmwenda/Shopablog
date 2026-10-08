  'use client';

  import { BASE_URL } from "../exportedDefinitions";
import { useEffect, useState } from "react";

  
  const BlogCard = ({ image, date, title, subtitle}) => {
    const [imageURL, setImageURL] = useState("dd");

    useEffect(() => {
        fetch(BASE_URL+ "/blogs/image",
            {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image_id: image
                })
            }
        )
        .then(async(res) => {
          const body = await res.json();
          console.log(body.url);
          setImageURL(body.url)
        })
    }, [image]);

    return (
      <div
        className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
      >
        <img src={imageURL} alt={"Sorry, Image cannot load right now"} className="w-full h-48 object-cover" />
        <div className="p-5">
          <p className="text-sm text-gray-500">{date}</p>
          <h3 className="text-xl font-bold text-blue-700 mt-1">{title}</h3>
          <p className="text-gray-700 mt-2">{subtitle}</p>
        </div>
      </div>
    );
  };


  export default BlogCard;
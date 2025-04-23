  const BlogCard = ({ image, date, title, subtitle}) => {
    const buffer = image.data; // e.g., <Buffer 89 50 4e ... >
    const b64 = new Buffer.from(buffer).toString('base64')
    const mimeType = "image/png" // e.g., image/png
    console.log(image);
    return (
      <div
        className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
      >
        <img src={`data:${mimeType};base64,${b64}`} alt={"Sorry, Image cannot load right now"} className="w-full h-48 object-cover" />
        <div className="p-5">
          <p className="text-sm text-gray-500">{date}</p>
          <h3 className="text-xl font-bold text-blue-700 mt-1">{title}</h3>
          <p className="text-gray-700 mt-2">{subtitle}</p>
        </div>
      </div>
    );
  };


  export default BlogCard;
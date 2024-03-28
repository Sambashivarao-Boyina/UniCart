
export default function Product({product}){
    return (
        <div className="w-96 bg-red  m-4  rounded-lg">
            <div className="w-full h-48 flex flex-row items-center justify-center">
                <img src={product.thumbnail} className="object-cover object-cente h-full   pb-2 rounded-t-lg" alt={product.title} /> 
            </div>
            <p className="text-xl font-bold">{product.title}</p>
            <p className="text-2xl font-extrabold">${product.price}</p>
        </div>
    )
}

export default function Product({product}){
    return (
        <div className="w-96 bg-red  m-4  rounded-lg">
            <div className="w-full h-48">
                <img src={product.thumbnail} className="object-cover h-full w-full pb-2 rounded-t-lg" alt={product.title} /> 
            </div>
            <p className="text-xl font-bold">{product.title}</p>
            <p className="text-2xl font-extrabold">${product.price}</p>
        </div>
    )
}
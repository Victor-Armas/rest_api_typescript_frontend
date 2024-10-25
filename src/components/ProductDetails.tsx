import {ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom"
import { TProducts } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: TProducts
}

export async function action({params}: ActionFunctionArgs) { //siempre se puede hacer asi la linea 4 con el Type
    if(params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect('/')
    }
    
} 

export default function ProductDetails({product} : ProductDetailsProps) {

    const fecher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800 text-center">
            { formatCurrency(product.price)}
        </td>
        <td className='p-3 font-semibold text-lg text-center'> 
            <fecher.Form method="POST">
                <button
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${isAvailable ? ' text-green-500 ':' text-red-500'} rounded-lg p-2 text-xs uppercase font-bold w-3/4 border border-black-100 hover:cursor-pointer`}
                >
                {isAvailable ? 'Disponible' : 'No Disponible'}
                </button>
            </fecher.Form>
            
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-4 items-center">
                <button
                    onClick={() => navigate(`product/${product.id}/edit`)}
                    className="bg-amber-500 text-white rounded-lg w-full p-2 uppercase font-bold text-sm text-center"
                >Editar</button>

                <Form 
                    className="w-full"
                    method='POST'
                    action={`product/${product.id}/delete`}
                    onSubmit={(e)=>{
                        if(!confirm('¿Deseas Eliminar Este Producto?')){
                            e.preventDefault()
                        }
                    }}
                >
                    <input
                        type="submit"
                        value='Eliminar'
                        className="bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-sm text-center"
                    />
                </Form>
            </div>
        </td>
    </tr> 
  )
}

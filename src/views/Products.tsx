import {ActionFunctionArgs, Link, useLoaderData} from 'react-router-dom'
import { getProduct, updateProductAvailability } from '../services/ProductService'
import ProductDetails from '../components/ProductDetails'
import { TProducts } from '../types'

export async function loader(){
  const products = await getProduct()
  return products
}


export async function action({request} : ActionFunctionArgs){
  const data = Object.fromEntries(await request.formData())
  await updateProductAvailability(+data.id)
  return null
}

export default function Products() {

  const products = useLoaderData() as TProducts[]

  return (
    <>
      <div className='flex justify-between'>
          <h2 className='text-4xl font-black text-slate-500'>Productos</h2>
          <Link 
              to="products/new-product"
              className=' rounded-lg bg-green-600 p-3 font-bold text-sm text-white hover:bg-green-500'
          > Agregar Producto </Link>
      </div>  

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className=" bg-blue-500 text-white">
              <tr>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Disponibilidad</th>
                  <th className="p-2">Acciones</th>
              </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductDetails
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>

    
    </>
  )
}

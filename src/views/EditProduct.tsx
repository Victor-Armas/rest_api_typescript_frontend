import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData} from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { updateProduct, getProductById } from "../services/ProductService"
import { TProducts } from "../types"
import ProductForm from "../components/ProductForm"

export async function loader({params} : LoaderFunctionArgs){
    if(params.id !== undefined){
        const product = await getProductById(Number(params.id))
        if(!product){
            return redirect('/')
        }
        return product
    }
    return {}
}

export async function action({request, params}: ActionFunctionArgs) { //siempre se puede hacer asi la linea 4 con el Type
    const data = Object.fromEntries(await request.formData()) //Asi se obtiene la informacion al momendo de dar en registrar producto
    let error = ''

    if(Object.values(data).includes('')){
        error = 'Todos los campos son obligatorios'
    }
    if(error.length){
        return error
    }
    if(params.id !== undefined){
        await updateProduct(data, Number(params.id))
        return redirect('/')
    }
    
        
    
    //return{}//Al momento de estar creando la recuperacion de informacion debes de retornar algo para que no te de error hasta que retornes al usuario al inicio
}

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
]

export default function EditProduct() {

    const product = useLoaderData() as TProducts
    const error = useActionData() as string
    


  return (
    <>
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Editar Producto</h2>
            <Link 
                to="/"
                className=' rounded-lg bg-green-600 p-3 font-bold text-sm text-white hover:bg-green-500'
            > Volver a Productos </Link>
        </div>  

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form
            className="mt-10"      
            method="POST"
        >
    
            <ProductForm
                product={product}
            />

            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="availability"
                >Disponibilidad:</label>
                <select 
                    id="availability"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="availability"
                    defaultValue={product?.availability.toString()}
                >
                    {availabilityOptions.map(option => (
                    <option key={option.name} value={option.value.toString()}>{option.name}</option>
                    ))}
                </select>
            </div>
            <input
            type="submit"
            className="mt-5 w-full bg-amber-500 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Actualizar Producto"
            />
        </Form>
    </>
  )
}

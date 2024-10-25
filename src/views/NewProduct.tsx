import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

export async function action({request}: ActionFunctionArgs) { //siempre se puede hacer asi la linea 4 con el Type
    const data = Object.fromEntries(await request.formData()) //Asi se obtiene la informacion al momendo de dar en registrar producto
    let error = ''

    if(Object.values(data).includes('')){
        error = 'Todos los campos son obligatorios'
    }
    if(error.length){
        return error
    }

    await addProduct(data)

    return redirect('/')

    //return{}//Al momento de estar creando la recuperacion de informacion debes de retornar algo para que no te de error hasta que retornes al usuario al inicio
}

export default function NewProduct() {

    const error = useActionData() as string

  return (
    <>
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Registro de Productos</h2>
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
    
            <ProductForm/>
            
            <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Registrar Producto"
            />
        </Form>
    </>
  )
}

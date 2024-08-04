import { Button, Image, Input, Textarea } from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useProductMutation } from '..'

interface FormInputs {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const NewProduct = () => {
  const productMutation = useProductMutation()

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      category: "men's clothing",
      image:
        'https://th.bing.com/th/id/R.6506131488878352ac95e1ca6bca389e?rik=N5wqyabsxMX24A&pid=ImgRaw&r=0'
    }
  })

  const newImage = watch('image')

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data)
    productMutation.mutate(data)
  }

  return (
    <div className='w-full flex-col'>
      <h1 className='text-2xl font-bold'>Nuevo producto</h1>

      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-around items-center'>
          <div className='flex-col w-[500px]'>
            <Controller
              control={control}
              name='title'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className='mt-2'
                  type='text'
                  label='Titulo del producto'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            ></Controller>

            <Controller
              control={control}
              name='price'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className='mt-2'
                  type='number'
                  label='Precio del producto'
                  value={field.value?.toString()}
                  onChange={(ev) => field.onChange(+ev.target.value)}
                />
              )}
            ></Controller>

            <Controller
              control={control}
              name='image'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className='mt-2'
                  type='url'
                  label='Url del producto'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            ></Controller>

            <Controller
              control={control}
              name='description'
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  className='mt-2'
                  label='Descripcion del producto'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            ></Controller>

            <Controller
              control={control}
              name='category'
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  className='rounded-md p-3 mt-2 bg-gray-800 w-full'
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value='jewelery'>Jewelery</option>
                  <option value='electronics'>Electronics</option>
                </select>
              )}
            ></Controller>

            <br />
            <Button
              type='submit'
              className='mt-2'
              color='primary'
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? 'Cargando...' : 'Crear producto'}
            </Button>
          </div>

          <div
            className='bg-white rounded-2xl p-10 flex items-center'
            style={{
              width: '500px',
              height: '600px'
            }}
          >
            <Image src={newImage} />
          </div>
        </div>
      </form>
    </div>
  )
}

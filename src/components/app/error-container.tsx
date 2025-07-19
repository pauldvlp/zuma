import * as Sentinel from 'http-sentinel'

// soruce https://www.npmjs.com/package/http-sentinel //

type IError = { error: Sentinel.ExpectedError }

export const ErrorContainer: React.FC<IError> = ({ error }) => {
  const msg = Sentinel.check_error_type(error, Sentinel.Forbidden)
    ? 'Demasiadas peticiones'
    : Sentinel.check_error_type(error, Sentinel.ServiceUnavailable || Sentinel.InternalServer)
      ? 'Se produjo un error en el servidor'
      : Sentinel.check_error_type(error, Sentinel.TooManyRequests)
        ? 'Muchas peticiones, intenta luego'
        : 'Error desconocido'

  return (<p className='text-center text-red-500'>{msg}</p>)
}

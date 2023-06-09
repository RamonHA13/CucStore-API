import { Request, Response } from 'express'
import * as BD from './../../helpers/bdActions'
import { Producto } from './../../models/TProductos.model'
import { Usuario } from './../../models/TUsuarios.model'
export function deleteUserProductById (req: Request, res: Response): void {
  const { usuario, productId } = req.body;

  (async () => {
    try {
      await BD.connectBD()
      const productoEliminado = await Producto.findByIdAndDelete({ _id: productId, idUsuario: usuario })
      await Usuario.updateOne({ _id: usuario }, { $pull: { productos: productId } })

      if (productoEliminado === null) {
        res.status(404).json({ mensaje: 'Producto no encontrado' })
        return
      }
      await Usuario.updateOne({ _id: usuario }, { $pull: { productos: productId } })
      await BD.disconnectBD()

      res.status(204).json({ mensaje: 'Eliminado con exito' })
    } catch (error) {
      res.status(500).json({ mensaje: 'Error en el servidor', error })
    }
  })().catch(error => res.status(500).json({ mensaje: 'Error en el servidor', error }))
}

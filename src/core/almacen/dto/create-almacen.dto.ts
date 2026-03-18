export class CreateAlmacenDto {
  codigo: string;
  descripcion: string;
  existencia: number;
  precio_compra: number;
  color: string;
  minimo: number;
  maximo: number;
  imagen: string;
  estatus: string;
  id_unidad: number;
  id_tipo_insumo: number;
}

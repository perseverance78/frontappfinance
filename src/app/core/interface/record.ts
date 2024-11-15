export interface Category {
    id:number;
    categoria_id:number;
    name:string;
    description:string;
  }

export interface Budget {
    id:number;
    presupuesto_id:number;
    name:string;
    description:string;
  }

export interface Debt {
  id:number;
  deuda_id: number;
  nombre: string;
  monto_total: number;
  monto_pagado: number;
  fecha_vencimiento: string;
  recordatorio:boolean;
}

export interface Incomes{
  id:number;
  ingreso_id:number;
  monto:number;
  fecha:string;
  es_fijo: boolean;
}

export interface Expenses{
  id:number;
  gasto_id:number;
  categoria_id:number;
  monto:number;
  fecha:string;
  descripcion:string;
  es_fijo: boolean;
}

  // dialog-field.interface.ts
export interface DialogField {
  key: string;        // Clave del campo, enlazado al objeto `data`
  label: string;      // Etiqueta que se muestra en el formulario
  type: string;       // Tipo de entrada, como 'text', 'number', etc.
  placeholder?: string; // (Opcional) Placeholder del campo
}




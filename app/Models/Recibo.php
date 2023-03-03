<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recibo extends Model
{
    use HasFactory;
    protected $table = 'recibos';

    public function legajo(){
        return $this->belongsTo(Legajo::class,'legajo_id');
    }

   /*  public function impuestoGanancias(){
        return $this->hasOne(impuestoGanancias::class,'impuesto_id');
    } */

}

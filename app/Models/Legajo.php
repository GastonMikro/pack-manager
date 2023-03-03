<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Legajo extends Model
{
    use HasFactory;
    protected $table = 'legajos';

    protected $fillable = [
        'nombre',
        'numero_legajo',
        'cuil',
        'fecha_alta',
        'usuario_id',
        'empresa_id',
        'activo',
        'email',
    ];

    /**
    * @return BelongsTo
    */
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class,'usuario_id' );
    }

    /**
    * @return BelongsTo
    */
    public function empresa(): BelongsTo
    {
        return $this->belongsTo(Empresa::class,'empresa_id','id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Localidad extends Model
{
    use HasFactory;
    protected $table = 'localidades';

    protected $fillable = [
        'departamento_id',
        'codigo',
        'nombre',
        'codigo_postal',
        'activo'
    ];

    /**
     * @return BelongsTo
     */
    public function departamento(): BelongsTo
    {
        return $this->belongsTo(Departamento::class,'departamento_id');
    }

    /**
     * @return HasMany
     */
    public function domicilios(): HasMany
    {
        return $this->hasMany(Domicilio::class,'localidad_id');
    }
}

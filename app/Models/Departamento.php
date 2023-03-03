<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Departamento extends Model
{
    use HasFactory;
    protected $table = 'departamentos';

    protected $fillable = [
        'provincia_id',
        'codigo',
        'nombre',
        'activo'
    ];

     /**
     * @return BelongsTo
     */
    public function provincia(): BelongsTo
    {
        return $this->belongsTo(Provincia::class,'provincia_id');
    }

    /**
     * @return HasMany
     */
    public function localidades(): HasMany
    {
        return $this->hasMany(Localidad::class,'departamento_id');
    }
}

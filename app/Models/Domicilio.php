<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Domicilio extends Model
{
    use HasFactory;
    protected $table = 'domicilios';

    protected $fillable = [
        'localidad_id',
        'domicilio',
        'activo'
    ];

    /**
     * @return BelongsTo
     */
    public function localidad(): BelongsTo
    {
        return $this->belongsTo(Localidad::class,'localidad_id');
    }

}

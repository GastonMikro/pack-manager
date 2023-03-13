<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Empresa extends Model
{
    use HasFactory;
    protected $table = 'empresas';

    protected $fillable = [
        'razon_social',
        'cuit',
        'logo_file_path',
        'url_api',
        'db_api',
        'usuario_api',
        'password_api',
        'domicilio_id',
        'prefijo',
        'activo',
    ];

    /**
     * @return BelongsToMany
     */
    public function usuarios(): BelongsToMany
    {
        return $this->belongsToMany(Usuario::class,'empresas_users','empresa_id','user_id');
    }

    /**
     * @return HasMany
     */
    public function legajos(): HasMany
    {
        return $this->hasMany(Legajo::class, 'empresa_id');
    }

    /**
     * @return BelongsTo
     */
    public function domicilio(): BelongsTo
    {
        return $this->belongsTo(Domicilio::class,'domicilio_id', 'id');
    }
}

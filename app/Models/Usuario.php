<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Usuario extends Model
{
    use HasFactory;
    protected $table = 'users';

    protected $fillable = [
        'nombre',
        'email',
        'email_verified_at',
        'password',
        'password_autenticacion',
        'cuil',
        'activo',
        'ultimo_acceso',
    ];

    protected $hidden = [
        'password',
        'password_autenticacion',
    ];

    /**
     * @return BelongsToMany
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Rol::class,'roles_users','user_id','rol_id');
    }

    /**
     * @return BelongsToMany
     */
    public function empresas(): BelongsToMany
    {
        return $this->belongsToMany(Empresa::class, 'empresas_users','user_id','empresa_id');
    }

    /**
     * @return HasMany
     */
    public function legajos(): HasMany
    {
        return $this->hasMany(Legajo::class);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Rol extends Model
{
    use HasFactory;
    protected $table = 'roles';

    /**
    * @return BelongsToMany
    */
    public function usuario(): BelongsToMany
    {
        return $this->belongsToMany(Usuario::class,'roles_users','rol_id','user_id');
    }
}

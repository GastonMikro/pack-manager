<?php

namespace App\Services;

use App\Models\Domicilio;

class DomicilioService
{
    public function nuevo(array $data){
        return Domicilio::create($data);
    }
}
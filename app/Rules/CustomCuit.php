<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
/* use Illuminate\Support\Facades\Validator; */

class CustomCuit implements Rule
{
    public function passes($attribute, $value)
    {
        $valid = false;
        $cuit = str_replace('_', '', str_replace('-', '', $value));
        $aMult = [5,4,3,2,7,6,5,4,3,2];

        if ($cuit && strlen($cuit)== 11) {
            $aCUIT = str_split($cuit);
            $iResult = 0;
            for($i = 0; $i <= 9; $i++)
            {
                $iResult += $aCUIT[$i] * $aMult[$i];
            }
            $iResult = ($iResult % 11);
            $iResult = 11 - $iResult;

            if ($iResult == 11) $iResult = 0;
            if ($iResult == 10) $iResult = 9;

            if ($iResult == $aCUIT[10])
            {
                $valid = true;
            }
        }
        return $valid;
    }

    public function message()
    {
        return 'Introduzca un C.U.I.T / C.U.I.L válido';
    }
}
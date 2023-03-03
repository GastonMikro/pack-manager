<?php

namespace Database\Seeders;

use bfinlay\SpreadsheetSeeder\SpreadsheetSeeder;
use bfinlay\SpreadsheetSeeder\SpreadsheetSeederSettings;
use Illuminate\Database\Seeder;

class GeneralSistemaSeeder extends SpreadsheetSeeder
{
    public function settings(SpreadsheetSeederSettings $set)
    {
        parent::settings($set);

        $set->file = "/database/seeders/GeneralSistemaSeeder.xlsx";
    }
}

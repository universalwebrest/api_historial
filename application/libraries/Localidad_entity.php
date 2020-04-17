<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Localidad_entity
{
    private $id;
    private $descripcion;
    private $codigo_postal;
    private $departamento_id;
    
    public function __construct()
    {
        $this->id = null;
        $this->descripcion = "";
        $this->codigo_postal = 0;
        $this->departamento_id = 0;
    }
    
}


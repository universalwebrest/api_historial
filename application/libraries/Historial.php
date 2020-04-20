<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Historial
{
    private $id;
    
    private $hospital_id;
        
    private $paciente;
    
    private $diagnosticos;
    
    public function __construct()
    {
        
    }
    
    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getHospital_id()
    {
        return $this->hospital_id;
    }

    /**
     * @param mixed $hospital_id
     */
    public function setHospital_id($hospital_id)
    {
        $this->hospital_id = $hospital_id;
    }

    /**
     * @return paciente
     */
    public function getPaciente()
    {
        return $this->paciente;
    }

    /**
     * @param paciente $paciente
     */
    public function setPaciente(Paciente $paciente)
    {
        $this->paciente = $paciente;
    }

    /**
     * @return diagnosticos
     */
    public function getDiagnosticos()
    {
        return $this->diagnosticos;
    }

    /**
     * @param diagnosticos $diagnosticos
     */
    public function setDiagnosticos(Diagnosticos $diagnosticos)
    {
        $this->diagnosticos = $diagnosticos;
    }
       
}
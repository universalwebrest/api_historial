<?php

class Pacientes_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function get($id = null)
    {   
        $this->db->select('ID
                          ,DNI
                          ,NOMBRE
                          ,FECHA_NACIMIENTO
                          ,DOMICILIO
                          ,TELEFONO
                          ,GENERO_ID
                          ,ESTADO_CIVIL_ID
                          ,OBRA_SOCIAL_ID
                          ,ESTUDIO_ID
                          ,LOCALIDAD_ID
                          ,DEPARTAMENTO_ID                          
                          ');
        
        $this->db->from('PACIENTE');
        
        if (is_null($id))
        {
            $query = $this->db->get();
            
            if ($query->num_rows() > 0)
            {
                return $query->result();
            }
            return null;
        }
        else
        {
            $this->db->where('ID', $id);
            
            $query = $this->db->get();
            
            if ($query->num_rows() == 1)
            {
                $row = $query->row();
                
                return $row;
            }
            
            return null;
        }
        
    }
    
    public function save($paciente)
    {
        $this->db->set($this->_setPaciente($paciente));
        
        $this->db->insert('PACIENTE');
        
        if ($this->db->affected_rows() == 1)
        {
            return $this->db->insert_id();
        }
        
        return FALSE;        
    }
    
    public function update($id, $data)
    {   
        $this->db->where('id', $id);
        
        $this->db->update($data['table'], $data['key_value']);
        
        if ($this->db->affected_rows() == 1)
        {
            return TRUE;
        }
        
        return FALSE;
    }
    
    public function delete($id)
    {
        $this->db->where('ID', $id);
        
        $this->db->delete('PACIENTE');
        
        if ($this->db->affected_rows() == 1)
        {
            return TRUE;
        }
        
        return FALSE;
    }
    
    private function _setPaciente($paciente)
    {
        return array( 
            'DNI' => $paciente['dni'],
            'NOMBRE' => $paciente['nombre'],
            'FECHA_NACIMIENTO' => $paciente['fecha_nacimiento'],
            'DOMICILIO' => $paciente['domicilio'],
            'TELEFONO' => $paciente['telefono'],
            'GENERO_ID' => $paciente['genero_id'],
            'ESTADO_CIVIL_ID' => $paciente['estado_civil_id'],
            'OBRA_SOCIAL_ID' => $paciente['obra_social_id'],
            'ESTUDIO_ID' => $paciente['estudio_id'],
            'LOCALIDAD_ID' => $paciente['localidad_id'],
            'DEPARTAMENTO_ID' => $paciente['departamento_id']
        );
    }
    
}


<?php

class Paciente_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        
    }
    
    public function get($id = null)
    {           
        if (is_null($id))
        {
            $pacientes = $this->db->get('paciente');
            
            if ($pacientes->num_rows() > 0)
            {
                return $pacientes->result();
            }
            return null;
        }
        else
        {            
            $paciente = $this->db->get_where('paciente', array('id'=>$id));
            
            if ($paciente->num_rows() == 1)
            {   
                return $paciente->row();
            }
            
            return null;
        }
        
    }
    
    public function save($paciente)
    {
        $this->db->set($this->_setPaciente($paciente));
        
        $this->db->insert('paciente');
        
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
        $this->db->where('id', $id);
        
        $this->db->delete('paciente');
        
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


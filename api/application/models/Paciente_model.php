<?php

class Paciente_model extends CI_Model
{
    private $mytable;    
    
    public function __construct()
    {
        parent::__construct();
        $this->mytable = 'paciente';
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
        }else{
            return NULL;
        }
                
    }
    
    public function update($id, $data)
    {   
        if ($this->db->field_exists($data['campo'], $this->mytable)) {
            
            $this->db->set($data['campo'], $data['nuevo_valor']);
            
            $this->db->where('id', $id);
            
            $query = $this->db->update($this->mytable);
            
            if ($query && $this->db->affected_rows()==1) {
                return TRUE;
            }
            else{
                return FALSE;
            }
        }
        else{
            
            return FALSE;
        }
        
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
            'dni' => $paciente['dni'],
            'nombre' => $paciente['nombre'],
            'fecha_nacimiento' => $paciente['fecha_nacimiento'],
            'domicilio' => $paciente['domicilio'],
            'telefono' => $paciente['telefono'],
            'genero_id' => $paciente['genero_id'],
            'estado_civil_id' => $paciente['estado_civil_id'],
            'obra_social_id' => $paciente['obra_social_id'],
            'estudio_id' => $paciente['estudio_id'],
            'localidad_id' => $paciente['localidad_id'],
            'departamento_id' => $paciente['departamento_id']
        );
    }
    
}
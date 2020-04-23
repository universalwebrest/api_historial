<?php

class Enfermedades_asociadas_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function get($id) 
    {
        $values = array('id' => $id);
        $enfermedades_asociadas = $this->db->get_where('enfermedades_asociadas', $values);
        
        if (!is_null($enfermedades_asociadas) && $enfermedades_asociadas->num_rows()==1)
        {
            return $enfermedades_asociadas->row();
        }
        else
        {
            return null;
        }
    }
    
    public function save($id)
    {
        $this->db->set('id', $id);
        
        $this->db->insert('enfermedades_asociadas');
        
        if ($this->db->affected_rows() == 1) 
        {
            return TRUE;
        }
        else {
            return FALSE;            
        }
    }
}


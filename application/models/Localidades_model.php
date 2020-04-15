<?php

class Localidades_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function get($id = null)
    {
        if (is_null($id))
        {
            $localidades = $this->db->get('LOCALIDAD');
            
            if ($localidades->num_rows() > 0)
            {
                return $localidades->result();
            }
            else
            {
                return null;
            }
        }
    }
    
    public function save($localidad)
    {
        
    }
    
    public function update($id, $localidad)
    {
        
    }
    
    public function delete($id)
    {
                
    }
}


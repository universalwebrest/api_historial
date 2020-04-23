<?php

class Historial_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();        
    }
    
    public function get($id)
    {                
        $historial = $this->db->get_where('historial', array('id' => $id));
        
        if ($historial->num_rows() == 1)
        {   
            return $historial->row();
        }
        else
        {
            return null;
        }        
    }
    
    public function save($id, $hospital_id)
    {
        $this->db->set(array('id'=>$id, 'hospital_id'=>$hospital_id));
        
        $this->db->insert('historial');
        
        if ($this->db->affected_rows() == 1)
        {
            return TRUE;
        }
        
        return FALSE;     
    }
        
}


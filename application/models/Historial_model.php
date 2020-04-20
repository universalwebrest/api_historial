<?php

class Historial_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        
        $this->load->library('Historial');
    }
    
    public function get($id)
    {        
        $this->db->from('HISTORIAL');
        
        $this->db->select('ID, HOSPITAL_ID');
        
        $this->db->where('ID', $id);
        
        $query = $this->db->get();
        
        if ($query->num_rows() == 1)
        {   
            return $query->result('Historial');
        }
        else
        {
            return null;
        }        
    }
    
    public function save($historial)
    {
        $this->db->set($this->_setHistorial($historial));
        
        $this->db->insert('HISTORIAL');
        
        if ($this->db->affected_rows() == 1)
        {
            return TRUE;
        }
        
        return FALSE;     
    }
    
    public function _setHistorial($historial)
    {
        return array(
            'ID' => $historial['id'],
            'HOSPITAL_ID' => $historial['hospital_id']
        );
    }
}


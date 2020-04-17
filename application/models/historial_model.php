<?php

class historial_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function get($id=null)
    {
        if (is_null($id))
        {
            return null;
        }        
        $array = array('ID' => $id);
        
        $query = $this->db->get_where('HISTORIAL', $array);
        
        if ($query->num_rows() == 1)
        {
            return $query->row();
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


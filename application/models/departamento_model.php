<?php

class departamento_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();        
    }
    
    public function get($id = null)
    {        
        $this->db->select('ID, DESCRIPCION');
        
        if (is_null($id))
        {
            $query = $this->db->get('DEPARTAMENTO');
            
            if ($query->num_rows() > 0)
            {
                return $query->result();
            }
            
            return null;
        }
        else 
        {
            $this->db->where('ID', $id);
            
            $query = $this->db->get('DEPARTAMENTO');
            
            if ($query->num_rows() == 1)
            {
                return $query->row();
            }
            else
            {
                return null;
            }
        }
    }
    
    public function save($departamento)
    {
        $array = array('ID'=>$departamento['id'],
                                      'DESCRIPCION'=>$departamento['descripcion']);
        
        $this->db->set($array);
        
        $this->db->insert('DEPARTAMENTO');
        
        if ($this->db->affected_rows() == 1)
        {
            return $this->db->insert_id();
        }
        
        return FALSE;
    }
    
    public function update($id, $data)
    {
        $this->db->where('ID', $id);
        
        $this->db->update('DEPARTAMENTO', $data['key_value']);
        
        if ($this->db->affected_rows() == 1)
        {
            return TRUE;
        }
        
        return FALSE;
    }
    
    public function delete($id)
    {       
        $this->db->where('ID', $id);
        
        $this->db->delete('DEPARTAMENTO');
        
        if ($this->db->affected_rows() == 1)
        {
            return TRUE;
        }
        
        return FALSE;
    }
    
}

